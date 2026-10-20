export type AnalyticsEvent =
  | 'enquiry_form_submit'
  | 'whatsapp_click'
  | 'email_click'
  | 'filter_click'
  | 'theme_toggle';

export interface AnalyticsPayload {
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Lightweight typed analytics event dispatcher.
 * Dispatches a custom DOM event for future analytics scripts (GA4, Plausible, etc.)
 * without bundling external analytics libraries upfront.
 */
export function trackEvent(event: AnalyticsEvent, payload?: AnalyticsPayload): void {
  if (typeof window === 'undefined') return;

  if (process.env.NODE_ENV === 'development') {
    // Development visibility
    console.debug(`[Analytics] ${event}`, payload || {});
  }

  try {
    const customEvent = new CustomEvent('oli-analytics', {
      detail: {
        event,
        payload: payload || {},
        timestamp: Date.now(),
      },
    });
    window.dispatchEvent(customEvent);
  } catch (err) {
    // Non-blocking
  }
}
