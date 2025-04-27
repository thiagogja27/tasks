import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurações essenciais para Supabase
  images: {
    domains: [
      'lh3.googleusercontent.com', // Para autenticação social
      'images.unsplash.com',      // Se usar imagens externas
      'your-supabase-project.supabase.co' // Para imagens do Storage
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },

  // Variáveis de ambiente públicas (para frontend)
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self' ${process.env.NEXT_PUBLIC_SUPABASE_URL};
              script-src 'self' 'unsafe-inline' ${process.env.NEXT_PUBLIC_SUPABASE_URL};
              connect-src 'self' ${process.env.NEXT_PUBLIC_SUPABASE_URL} ws://localhost:3000;
              img-src 'self' ${process.env.NEXT_PUBLIC_SUPABASE_URL} data:;
              style-src 'self' 'unsafe-inline';
              font-src 'self';
            `.replace(/\s+/g, ' ').trim(),
          },
        ],
      },
    ];
  },

  // Configurações de compilação
  compiler: {
    reactRemoveProperties: true,
  },
};

export default nextConfig;
