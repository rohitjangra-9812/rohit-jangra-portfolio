import type { ProjectCategory, ProjectItem } from '../data/portfolioData';

export type InquiryType =
  | 'Internship'
  | 'Freelance Project'
  | 'Fintech Collaboration'
  | 'Other';

export const INQUIRY_TYPES: InquiryType[] = [
  'Internship',
  'Freelance Project',
  'Fintech Collaboration',
  'Other',
];

export interface ContactFormInput {
  fullName: string;
  email: string;
  inquiryType: InquiryType;
  projectDetails: string;
}

export interface ContactValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactForm(input: ContactFormInput): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};

  const trimmedName = input.fullName.trim();
  const trimmedEmail = input.email.trim();
  const trimmedDetails = input.projectDetails.trim();

  if (trimmedName.length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!INQUIRY_TYPES.includes(input.inquiryType)) {
    errors.inquiryType = 'Please select an inquiry type.';
  }

  if (trimmedDetails.length < 10) {
    errors.projectDetails = 'Please share a brief overview of your project or inquiry (at least 10 characters).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatInquiryPlainText(input: ContactFormInput): string {
  const cleanName = input.fullName.trim();
  const cleanEmail = input.email.trim();
  const cleanDetails = input.projectDetails.trim();

  return [
    `Hello Rohit,`,
    '',
    `You have a new portfolio inquiry:`,
    `Name: ${cleanName}`,
    `Reply Email: ${cleanEmail}`,
    `Inquiry Type: ${input.inquiryType}`,
    '',
    `Project / Work Details:`,
    cleanDetails,
    '',
    `— Sent via Rohit Jangra Developer Portfolio`,
  ].join('\n');
}

export function buildMailtoHref(
  input: ContactFormInput,
  recipient = 'rohitjangra2782@gmail.com'
): string {
  const cleanName = input.fullName.trim();
  const subject = `[Portfolio Inquiry: ${input.inquiryType}] from ${cleanName}`;
  const body = formatInquiryPlainText(input);

  const params = new URLSearchParams({
    subject,
    body,
  });

  // URLSearchParams encodes spaces as '+', while mailto clients expect '%20'
  const query = params.toString().replace(/\+/g, '%20');
  return `mailto:${recipient}?${query}`;
}

export function buildGmailComposeHref(
  input: ContactFormInput,
  recipient = 'rohitjangra2782@gmail.com'
): string {
  const cleanName = input.fullName.trim();
  const subject = `[Portfolio Inquiry: ${input.inquiryType}] from ${cleanName}`;
  const body = formatInquiryPlainText(input);

  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: recipient,
    su: subject,
    body,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function filterProjects(
  projects: ProjectItem[],
  category: ProjectCategory
): ProjectItem[] {
  if (category === 'All') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}

export interface TiltTransform {
  rotateX: number;
  rotateY: number;
  glareX: number;
  glareY: number;
}

/**
 * Computes deterministic 3D tilt angles and specular highlight coordinates
 * from normalized pointer coordinates (0..1 within card bounds).
 */
export function computeTiltTransform(
  relX: number,
  relY: number,
  maxDeg = 7
): TiltTransform {
  const clampedX = Math.max(0, Math.min(1, relX));
  const clampedY = Math.max(0, Math.min(1, relY));

  const rotateY = Number(((clampedX - 0.5) * 2 * maxDeg).toFixed(2));
  const rotateX = Number(((0.5 - clampedY) * 2 * maxDeg).toFixed(2));

  return {
    rotateX,
    rotateY,
    glareX: Number((clampedX * 100).toFixed(1)),
    glareY: Number((clampedY * 100).toFixed(1)),
  };
}
