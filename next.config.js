/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'angelnextjsdemo.s3.us-west-1.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};
module.exports = nextConfig
