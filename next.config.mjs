/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "flagsapi.com",
      "userprofile-streamfiles.s3.us-east-2.amazonaws.com",
      "streaming-app-media-bucket.s3.eu-north-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
