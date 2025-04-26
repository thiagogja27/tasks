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
            value: `default-src 'self' https://${process.env.NEXT_PUBLIC_SUPABASE_URL}; script-src 'self' 'sha256-LcsuUMiDkprrt6ZKeiLP4iYNhWo8NqaSbAgtoZxVK3s='`, // Adicionado o hash do script
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
