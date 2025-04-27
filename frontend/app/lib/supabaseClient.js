// app/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// Adicione esta verificação rigorosa
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

if (!supabaseUrl || !supabaseKey) {
  throw new Error(`
    Variáveis de ambiente não configuradas corretamente!
    URL: ${supabaseUrl}
    KEY: ${supabaseKey ? '*****' + supabaseKey.slice(-5) : 'não definida'}
  `)
}

// Verificação adicional da URL
try {
  new URL(supabaseUrl)
} catch (error) {
  throw new Error(`URL do Supabase inválida: ${supabaseUrl}`)
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})