/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                // pathname: '/my-bucket/**',
            },
            {
                protocol: 'https',
                hostname: 'videos.pexels.com',
                port: '',
                // pathname: '/my-bucket/**',
            },
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                // pathname: '/my-bucket/**',
            },
        ],
    },
};

export default nextConfig;