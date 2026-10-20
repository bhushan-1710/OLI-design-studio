// Automated verification for Contact page & EnquiryForm
async function verify() {
  const res = await fetch('http://localhost:3005/contact');
  if (!res.ok) {
    throw new Error(`Failed to fetch /contact: HTTP ${res.status}`);
  }
  const html = await res.text();

  const checks = {
    hasA05: html.includes('SHEET A-05'),
    hasMailto: html.includes('mailto:olidesignstudio06@gmail.com'),
    hasNoPlaceholderAttr: !/<(input|textarea)[^>]+placeholder=/i.test(html),
    hasNoLinkWA: html.includes('[NEEDED: WhatsApp number]') && !html.includes('wa.me'),
    hasNoLinkPhone: html.includes('[NEEDED: Phone number]') && !html.includes('href="tel:'),
    hasBotcheck: html.includes('name="botcheck"'),
    hasLabels: html.includes('01 // YOUR NAME') && html.includes('02 // PHONE / WHATSAPP') && html.includes('03 // PROJECT TYPE') && html.includes('04 // PROJECT DETAILS / MESSAGE'),
  };

  console.log('Contact Verification Results:');
  console.log(JSON.stringify(checks, null, 2));

  for (const [k, v] of Object.entries(checks)) {
    if (!v) {
      console.error(`FAILED CHECK: ${k}`);
      process.exit(1);
    }
  }

  console.log('\nAll Contact automated script checks PASSED.');
}

verify().catch((err) => {
  console.error(err);
  process.exit(1);
});
