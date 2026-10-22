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
  'Complete Integrated (All Disciplines)',
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
      const matched = PROJECT_TYPE_OPTIONS.find((opt) =>
        opt.toLowerCase().includes(typeParam)
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
        if (value.trim().length < 2) return 'Please enter your full name.';
        return null;
      case 'phone':
        if (!value.trim()) return 'Phone or WhatsApp number is required.';
        if (!PHONE_REGEX.test(value.trim())) {
          return 'Please enter a valid phone number (digits, +, -, spaces).';
        }
        return null;
      case 'message':
        if (!value.trim()) return 'Please describe your project, site location, or aspirations.';
        if (value.trim().length < 10) return 'Please provide a few more details so we can understand your brief.';
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

    setIsSubmitting(true);

    // Development / Demo Simulation Mode when key is not configured
    if (!accessKey || accessKey.trim() === '') {
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setDemoNotice('Demo mode: Web3Forms submission simulated successfully for review.');
      }, 700);
      return;
    }

    // 10-second timeout controller for real live submissions
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
          "That didn't send. Your message is still here. Try again, or email us at olidesignstudio06@gmail.com."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      projectType: 'Architecture',
      message: '',
      botcheck: '',
    });
    setErrors({});
    setTouched({});
    setDemoNotice(null);
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
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Stamp text="RECEIVED" animate={true} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontSize: 'clamp(26px, 3.5vw, 40px)',
              fontWeight: 400,
              margin: 0,
              color: 'var(--ink)',
            }}
          >
            Thank you, {formData.name || 'Client'}.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '13px',
              lineHeight: 1.6,
              opacity: 0.85,
              margin: 0,
              maxWidth: '560px',
            }}
          >
            We have received your enquiry for <strong>{formData.projectType}</strong>. Our lead design team will review your project brief and reply within <strong>24–48 business hours</strong>.
          </p>

          <div
            style={{
              marginTop: '16px',
              padding: '16px',
              border: '1px dashed var(--ink)',
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              maxWidth: '520px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--red)',
                fontWeight: 600,
              }}
            >
              NEED TO DISCUSS URGENT SITE TIMELINES?
            </span>
            <p
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '12px',
                lineHeight: 1.5,
                margin: 0,
                opacity: 0.8,
              }}
            >
              You can message our studio directly on WhatsApp at any time with reference photos or sketches.
            </p>
            <a
              href={`https://wa.me/?text=Hello%20OLI%20Design%20Studio%2C%20I%20just%20submitted%20an%20enquiry%20for%20${encodeURIComponent(
                formData.name
              )}%20(${encodeURIComponent(formData.projectType)}).`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--red)',
                textDecoration: 'underline',
                marginTop: '4px',
              }}
            >
              Message Us on WhatsApp ↗
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={resetForm}
          className="oli-btn oli-btn-secondary"
          style={{ marginTop: '12px' }}
        >
          ← Submit another enquiry
        </button>
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
          <span style={{ fontSize: '10px', opacity: 0.6 }}>CLIENT OR PRACTICE</span>
        </label>
        <input
          id="form-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          disabled={isSubmitting}
          placeholder="e.g. Rahul Sharma / Ananya Verma"
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
          <span style={{ fontSize: '10px', opacity: 0.6 }}>FOR DIRECT CONSULTATION</span>
        </label>
        <input
          id="form-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          disabled={isSubmitting}
          placeholder="e.g. +91 98765 43210"
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
          <span>03 // PROJECT DISCIPLINE</span>
          <span style={{ fontSize: '10px', opacity: 0.6 }}>SELECT RELEVANT SCOPE</span>
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
            04 // PROJECT DETAILS / SITE BRIEF <span className="oli-form-label-required">*</span>
          </span>
          <span style={{ fontSize: '10px', opacity: 0.6 }}>LOCATION, SCALE &amp; TIMELINE</span>
        </label>
        <textarea
          id="form-message"
          name="message"
          required
          rows={4}
          disabled={isSubmitting}
          placeholder="Briefly describe your site location, intended scale, target completion timeframe, and whether you are planning new construction or a renovation..."
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

      {/* Privacy and Trust Assurance */}
      <p
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '11px',
          letterSpacing: '0.04em',
          opacity: 0.7,
          margin: '-8px 0 0 0',
          lineHeight: 1.5,
        }}
      >
        Confidentiality guaranteed. Your information is used exclusively to evaluate your architectural brief and is never shared.
      </p>

      {/* Submit Button & Lockout */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          paddingTop: '8px',
        }}
      >
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Transmitting Brief...' : 'Send Project Enquiry →'}
        </Button>

        <span
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '11px',
            letterSpacing: '0.08em',
            opacity: 0.65,
          }}
        >
          Expected Response: 24–48 Hours
        </span>
      </div>
    </form>
  );
}
