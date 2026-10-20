/** @type {import('next').NextConfig} */

// Guard: In production builds (OLI_PRODUCTION=1), fail early if NEXT_PUBLIC_WEB3FORMS_KEY is missing
if (process.env.OLI_PRODUCTION === '1') {
  if (
    !process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
    process.env.NEXT_PUBLIC_WEB3FORMS_KEY.trim() === ''
  ) {
    throw new Error(
      '[Production Build Guard] Missing NEXT_PUBLIC_WEB3FORMS_KEY in environment during production build (OLI_PRODUCTION=1). An active Web3Forms Access Key is required for production builds.'
    );
  }
}

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
