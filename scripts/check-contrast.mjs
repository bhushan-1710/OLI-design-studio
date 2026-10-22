function srgbToLin(c) {
  c = c / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function lum(hex) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return 0.2126 * srgbToLin(r) + 0.7152 * srgbToLin(g) + 0.0722 * srgbToLin(b);
}
function ratio(h1, h2) {
  const l1 = lum(h1);
  const l2 = lum(h2);
  const max = Math.max(l1, l2);
  const min = Math.min(l1, l2);
  return ((max + 0.05) / (min + 0.05)).toFixed(2);
}
function blend(fgHex, bgHex, alpha) {
  const fg = [parseInt(fgHex.slice(1,3),16), parseInt(fgHex.slice(3,5),16), parseInt(fgHex.slice(5,7),16)];
  const bg = [parseInt(bgHex.slice(1,3),16), parseInt(bgHex.slice(3,5),16), parseInt(bgHex.slice(5,7),16)];
  const r = Math.round(fg[0]*alpha + bg[0]*(1-alpha));
  const g = Math.round(fg[1]*alpha + bg[1]*(1-alpha));
  const b = Math.round(fg[2]*alpha + bg[2]*(1-alpha));
  return '#' + [r,g,b].map(x => x.toString(16).padStart(2,'0')).join('');
}

console.log('--- RED ON PAPER ---');
console.log('Light Red (#C8412B) on Paper (#F2EEE4):', ratio('#C8412B', '#F2EEE4') + ':1');
console.log('Dark Red (#E5694F) on Dark Paper (#1C1B19):', ratio('#E5694F', '#1C1B19') + ':1');

// Also check white text on Red (#C8412B) for buttons:
console.log('White (#FFFFFF) on Light Red (#C8412B):', ratio('#FFFFFF', '#C8412B') + ':1');
console.log('Paper (#F2EEE4) on Light Red (#C8412B):', ratio('#F2EEE4', '#C8412B') + ':1');
console.log('White (#FFFFFF) on Dark Red (#E5694F):', ratio('#FFFFFF', '#E5694F') + ':1');
console.log('Dark Paper (#1C1B19) on Dark Red (#E5694F):', ratio('#1C1B19', '#E5694F') + ':1');

const darkWashes = {
  sand: '#3A3428',
  concrete: '#343330',
  glass: '#223538',
  timber: '#3C2417',
  sage: '#263420',
  shrub: '#1F2B18',
  slab: '#2E2B27',
  ground: '#2E2B25'
};
const inkDark = '#ECE6D9';

console.log('\n--- CREAM LINEWORK (#ECE6D9) ON DARK WASHES (PURE) ---');
for (const [k, v] of Object.entries(darkWashes)) {
  console.log(`  ${k} (${v}): ${ratio(inkDark, v)}:1`);
}

console.log('\n--- CREAM LINEWORK (#ECE6D9) ON DARK WASHES (88% OVER #1C1B19) ---');
for (const [k, v] of Object.entries(darkWashes)) {
  const blended = blend(v, '#1C1B19', 0.88);
  console.log(`  ${k} blended (${blended}): ${ratio(inkDark, blended)}:1`);
}
