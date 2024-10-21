/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any specific configurations here if needed
  images: {
    domains: ['localhost'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
