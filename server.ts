import 'dotenv/config';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';
import {
  buildGmailComposeHref,
  buildMailtoHref,
  formatInquiryPlainText,
  validateContactForm,
  type ContactFormInput,
} from './src/utils/portfolioLogic.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3000);
const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || 'rohitjangra2782@gmail.com';

interface StoredInquiry {
  id: string;
  receivedAt: string;
  input: ContactFormInput;
  deliveredVia: 'resend' | 'smtp' | 'client_dispatch';
}

const recentInquiries: StoredInquiry[] = [];

async function dispatchEmailViaConfiguredProvider(
  input: ContactFormInput
): Promise<'resend' | 'smtp' | 'client_dispatch'> {
  const subject = `[Portfolio Inquiry: ${input.inquiryType}] from ${input.fullName.trim()}`;
  const textBody = formatInquiryPlainText(input);

  // 1. Resend API if configured
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
        to: [RECIPIENT_EMAIL],
        reply_to: input.email.trim(),
        subject,
        text: textBody,
      }),
    });
    if (res.ok) {
      return 'resend';
    }
  }

  // 2. Gmail / SMTP if configured
  const smtpUser = process.env.GMAIL_USER?.trim() || process.env.SMTP_USER?.trim();
  const smtpPass = process.env.GMAIL_APP_PASSWORD?.trim() || process.env.SMTP_PASS?.trim();
  if (smtpUser && smtpPass) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"${input.fullName.trim()} (Portfolio)" <${smtpUser}>`,
      to: RECIPIENT_EMAIL,
      replyTo: input.email.trim(),
      subject,
      text: textBody,
    });

    return 'smtp';
  }

  return 'client_dispatch';
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '100kb' }));

  app.post('/api/contact', async (req, res) => {
    const body = req.body as Partial<ContactFormInput> | undefined;
    const input: ContactFormInput = {
      fullName: String(body?.fullName ?? ''),
      email: String(body?.email ?? ''),
      inquiryType: (body?.inquiryType ?? 'Internship') as ContactFormInput['inquiryType'],
      projectDetails: String(body?.projectDetails ?? ''),
    };

    const validation = validateContactForm(input);
    if (!validation.isValid) {
      res.status(400).json({
        ok: false,
        errors: validation.errors,
      });
      return;
    }

    let deliveredVia: 'resend' | 'smtp' | 'client_dispatch' = 'client_dispatch';
    try {
      deliveredVia = await dispatchEmailViaConfiguredProvider(input);
    } catch {
      deliveredVia = 'client_dispatch';
    }

    const record: StoredInquiry = {
      id: `inq_${Date.now()}`,
      receivedAt: new Date().toISOString(),
      input,
      deliveredVia,
    };
    recentInquiries.unshift(record);
    if (recentInquiries.length > 50) {
      recentInquiries.length = 50;
    }

    res.json({
      ok: true,
      id: record.id,
      receivedAt: record.receivedAt,
      recipient: RECIPIENT_EMAIL,
      deliveredVia,
      mailtoHref: buildMailtoHref(input, RECIPIENT_EMAIL),
      gmailHref: buildGmailComposeHref(input, RECIPIENT_EMAIL),
      formattedText: formatInquiryPlainText(input),
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
