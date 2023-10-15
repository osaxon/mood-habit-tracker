/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ["utfs.io", "avatars.githubusercontent.com"],
    },
};

module.exports = nextConfig;
