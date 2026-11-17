import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGmailComposeHref,
  buildMailtoHref,
  computeTiltTransform,
  filterProjects,
  formatInquiryPlainText,
  validateContactForm,
} from './portfolioLogic';
import { PROJECTS } from '../data/portfolioData';

test('validateContactForm rejects empty or invalid inputs', () => {
  const result = validateContactForm({
    fullName: 'A',
    email: 'not-an-email',
    inquiryType: 'Internship',
    projectDetails: 'Too short',
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.projectDetails);
  assert.equal(result.errors.inquiryType, undefined);
});

test('validateContactForm accepts valid inquiry details', () => {
  const result = validateContactForm({
    fullName: 'Ananya Verma',
    email: 'ananya@fintech.io',
    inquiryType: 'Fintech Collaboration',
    projectDetails: 'We would love to collaborate on SwiftPay checkout webhook verification.',
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('buildMailtoHref encodes recipient, inquiry type, sender name, and details cleanly', () => {
  const href = buildMailtoHref({
    fullName: 'Vikram Singh',
    email: 'vikram@example.com',
    inquiryType: 'Freelance Project',
    projectDetails: 'Need a full-stack AI dashboard built in React and Python.',
  });

  assert.ok(href.startsWith('mailto:rohitjangra2782@gmail.com?'));
  assert.ok(!href.includes('+'), 'Mailto query should encode spaces as %20 instead of +');

  const decoded = decodeURIComponent(href);
  assert.ok(decoded.includes('Freelance Project'));
  assert.ok(decoded.includes('Vikram Singh'));
  assert.ok(decoded.includes('vikram@example.com'));
  assert.ok(decoded.includes('Need a full-stack AI dashboard built in React and Python.'));
});

test('buildGmailComposeHref generates pre-filled Gmail compose URL', () => {
  const input = {
    fullName: 'Priya Nair',
    email: 'priya@studio.dev',
    inquiryType: 'Internship' as const,
    projectDetails: 'Full-stack AI engineering internship for Summer 2026.',
  };

  const gmailUrl = buildGmailComposeHref(input);
  const parsed = new URL(gmailUrl);

  assert.equal(parsed.origin, 'https://mail.google.com');
  assert.equal(parsed.searchParams.get('to'), 'rohitjangra2782@gmail.com');
  assert.ok(parsed.searchParams.get('su')?.includes('Priya Nair'));
  assert.ok(parsed.searchParams.get('body')?.includes('priya@studio.dev'));
  assert.ok(formatInquiryPlainText(input).includes('Full-stack AI engineering internship'));
});

test('filterProjects filters accurately by category', () => {
  assert.equal(filterProjects(PROJECTS, 'All').length, 4);
  const fintech = filterProjects(PROJECTS, 'Fintech');
  assert.equal(fintech.length, 1);
  assert.equal(fintech[0].id, 'swiftpay-gateway');

  const aiml = filterProjects(PROJECTS, 'AI & ML');
  assert.equal(aiml.length, 2);
});

test('computeTiltTransform computes bounded tilt angles and glare positions', () => {
  const center = computeTiltTransform(0.5, 0.5, 8);
  assert.equal(center.rotateX, 0);
  assert.equal(center.rotateY, 0);
  assert.equal(center.glareX, 50);
  assert.equal(center.glareY, 50);

  const topLeft = computeTiltTransform(0, 0, 8);
  assert.equal(topLeft.rotateX, 8);
  assert.equal(topLeft.rotateY, -8);

  const clamped = computeTiltTransform(2, -1, 6);
  assert.equal(clamped.rotateX, 6);
  assert.equal(clamped.rotateY, 6);
  assert.equal(clamped.glareX, 100);
  assert.equal(clamped.glareY, 0);
});
