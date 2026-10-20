'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Stamp } from '@/components/ui/Stamp';

const PROJECT_TYPE_OPTIONS = [
  'Architecture',
  'Interior',
  'Landscape',
  'Product',
  'Not sure yet',
];

const PHONE_REGEX = /^[\d\s+\-()]{7,20}$/;

export function EnquiryForm() {
  const searchParams = useSearchParams();

  // Form input state — preserved throughout submission attempts
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    projectType: 'Architecture',
    message: '',
    botcheck: '',
  });

  // Errors state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  // Pre-select project type from URL query parameter (e.g. /contact?type=interior)
  useEffect(() => {
    const typeParam = searchParams?.get('type')?.toLowerCase();
    if (typeParam) {
      const matched = PROJECT_TYPE_OPTIONS.find(
        (opt) => opt.toLowerCase() === typeParam
      );
      if (matched) {
        setFormData((prev) => ({ ...prev, projectType: matched }));
      }
    }
  }, [searchParams]);

  // Field validation logic
  const validateField = (field: string, value: string): string | null => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required.';
        return null;
      case 'phone':
        if (!value.trim()) return 'Phone or WhatsApp number is required.';
        if (!PHONE_REGEX.test(value.trim())) {
          return 'Please enter a valid phone number (digits, +, -, spaces).';
        }
        return null;
      case 'message':
        if (!value.trim()) return 'Please describe your project or enquiry.';
        return null;
      default:
        return null;
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors((prev) => ({
      ...prev,
      [field]: error || '',
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Revalidate if touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error || '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setDemoNotice(null);

    // Validate all fields
    const nameErr = validateField('name', formData.name);
    const phoneErr = validateField('phone', formData.phone);
    const msgErr = validateField('message', formData.message);

    const newErrors = {
      name: nameErr || '',
      phone: phoneErr || '',
      message: msgErr || '',
    };
    setErrors(newErrors);
    setTouched({ name: true, phone: true, message: true, projectType: true });

    if (nameErr || phoneErr || msgErr) {
      return;
    }

    // Botcheck honeypot: silent reject if filled
    if (formData.botcheck) {
      console.warn('Bot submission prevented.');
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    // Check for demo mode (missing key in development/preview)
    if (!accessKey || accessKey.trim() === '') {
      setDemoNotice(
        'Demo mode — this was NOT sent. NEXT_PUBLIC_WEB3FORMS_KEY is not configured. Your input has been preserved.'
      );
      return;
    }

    setIsSubmitting(true);

    // 10-second timeout controller
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          phone: formData.phone,
          projectType: formData.projectType,
          message: formData.message,
          botcheck: formData.botcheck,
          subject: `New Enquiry (${formData.projectType}) — OLI Design Studio`,
          from_name: 'OLI Website Enquiry Form',
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const data = await res.json();

      if (data.success === true) {
        setIsSubmitted(true);
      } else {
        setSubmitError(
          data.message ||
            'Submission was not accepted by the form provider. Your message is preserved below.'
        );
      }
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      if (err instanceof DOMException && err.name === 'AbortError') {
        setSubmitError(
          'Request timed out after 10 seconds. Your message is preserved below. Please try again or email olidesignstudio06@gmail.com directly.'
        );
      } else {
        setSubmitError(
          'That didn\'t send. Your message is still here. Try again, or email us at olidesignstudio06@gmail.com.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success State View
  if (isSubmitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          border: '1.5px solid var(--ink)',
          backgroundColor: 'var(--paper)',
          padding: 'clamp(var(--space-6), 4vw, var(--space-12))',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 'var(--space-6)',
          boxSizing: 'border-box',
        }}
      >
        <Stamp text="RECEIVED" animate={true} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontSize: 'clamp(24px, 3.5vw, 36px)',
              fontWeight: 400,
              margin: 0,
            }}
          >
            Thank you.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '13px',
              lineHeight: 1.6,
              opacity: 0.85,
              margin: 0,
            }}
          >
            We&apos;ve received your enquiry and will reply within [NEEDED] working day(s). [DRAFT]
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-8)',
        border: '1.5px solid var(--ink)',
        backgroundColor: 'var(--paper)',
        padding: 'clamp(var(--space-6), 4vw, var(--space-10))',
        boxSizing: 'border-box',
      }}
    >
      {/* Demo Mode Notice Banner */}
      {demoNotice && (
        <div
          role="status"
          className="oli-form-demo-banner"
          aria-live="polite"
        >
          <strong>{demoNotice}</strong>
        </div>
      )}

      {/* Submission Error Banner */}
      {submitError && (
        <div
          role="alert"
          className="oli-form-alert"
          aria-live="assertive"
        >
          <strong>Notice:</strong> {submitError}
        </div>
      )}

      {/* Honeypot field (hidden from assistive tech and visual users) */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        checked={!!formData.botcheck}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            botcheck: e.target.checked ? 'true' : '',
          }))
        }
        aria-hidden="true"
      />

      {/* Field 1: Name */}
      <div className="oli-form-group">
        <label htmlFor="form-name" className="oli-form-label">
          <span>
            01 // YOUR NAME <span className="oli-form-label-required">*</span>
          </span>
        </label>
        <input
          id="form-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          disabled={isSubmitting}
          value={formData.name}
          onChange={handleChange}
          onBlur={() => handleBlur('name')}
          className={`oli-form-input ${errors.name ? 'has-error' : ''}`}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <span id="name-error" className="oli-form-error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      {/* Field 2: Phone / WhatsApp */}
      <div className="oli-form-group">
        <label htmlFor="form-phone" className="oli-form-label">
          <span>
            02 // PHONE / WHATSAPP <span className="oli-form-label-required">*</span>
          </span>
        </label>
        <input
          id="form-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          disabled={isSubmitting}
          value={formData.phone}
          onChange={handleChange}
          onBlur={() => handleBlur('phone')}
          className={`oli-form-input ${errors.phone ? 'has-error' : ''}`}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && (
          <span id="phone-error" className="oli-form-error" role="alert">
            {errors.phone}
          </span>
        )}
      </div>

      {/* Field 3: Project Type */}
      <div className="oli-form-group">
        <label htmlFor="form-project-type" className="oli-form-label">
          <span>03 // PROJECT TYPE</span>
        </label>
        <select
          id="form-project-type"
          name="projectType"
          disabled={isSubmitting}
          value={formData.projectType}
          onChange={handleChange}
          className="oli-form-select"
        >
          {PROJECT_TYPE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Field 4: Message */}
      <div className="oli-form-group">
        <label htmlFor="form-message" className="oli-form-label">
          <span>
            04 // PROJECT DETAILS / MESSAGE <span className="oli-form-label-required">*</span>
          </span>
        </label>
        <textarea
          id="form-message"
          name="message"
          required
          rows={4}
          disabled={isSubmitting}
          value={formData.message}
          onChange={handleChange}
          onBlur={() => handleBlur('message')}
          className={`oli-form-textarea ${errors.message ? 'has-error' : ''}`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <span id="message-error" className="oli-form-error" role="alert">
            {errors.message}
          </span>
        )}
      </div>

      {/* Submit Button & Lockout */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '8px' }}>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Enquiry →'}
        </Button>
      </div>
    </form>
  );
}
