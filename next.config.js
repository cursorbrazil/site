/** @type {import('next').NextConfig} */
const securityHeaders = [
	{ key: 'X-Content-Type-Options', value: 'nosniff' },
	// Kept alongside CSP frame-ancestors for backward compatibility with older browsers
	{ key: 'X-Frame-Options', value: 'DENY' },
	{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
	{
		key: 'Permissions-Policy',
		value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=()',
	},
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=63072000; includeSubDomains; preload',
	},
	// unsafe-none allows third-party iframes (e.g. LumaCalendar embed) to load
	{ key: 'Cross-Origin-Opener-Policy', value: 'unsafe-none' },
	{ key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
	{ key: 'Cross-Origin-Embedder-Policy', value: 'unsafe-none' },
];

const nextConfig = {
	async headers() {
		// HSTS only in production: over plain-HTTP dev servers Safari may still
		// honor it and pin localhost to HTTPS, breaking every local asset load
		const headers =
			process.env.NODE_ENV === 'production'
				? securityHeaders
				: securityHeaders.filter((h) => h.key !== 'Strict-Transport-Security');
		return [
			{
				source: '/(.*)',
				headers,
			},
		];
	},
	async redirects() {
		return [
			{
				source: '/slides/1',
				destination: '/slides',
				permanent: true,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'images.lumacdn.com',
			},
			{
				protocol: 'https',
				hostname: 'pbs.twimg.com',
			},
			{
				protocol: 'https',
				hostname: 'abs.twimg.com',
			},
		],
	},
};

module.exports = nextConfig;
