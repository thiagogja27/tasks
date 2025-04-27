import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com', // Para autenticação social
      'images.unsplash.com',      // Se usar imagens externas
      'your-supabase-project.supabase.co', // Para imagens do Storage
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
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

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
              default-src 'self' https://${supabaseUrl}; 
              script-src 'self' 'https://cdn.jsdelivr.net' 'https://unpkg.com' 'https://www.googletagmanager.com'; 
              style-src 'self' 'https://fonts.googleapis.com'; 
              font-src 'self' 'https://fonts.gstatic.com';
              connect-src 'self' 'https://your-supabase-project.supabase.co';
              img-src 'self' data: 'https://images.unsplash.com' 'https://lh3.googleusercontent.com';
            `,
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
