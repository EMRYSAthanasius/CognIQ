import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (process.env.NODE_ENV === 'development') {
    console.log('[DEBUG] Supabase URL:', supabaseUrl ? 'Set' : 'Missing');
    console.log('[DEBUG] Supabase Anon Key:', supabaseAnonKey ? 'Set' : 'Missing');
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables are missing. Using dummy values for development. Authentication will fail.');
  }

  return createBrowserClient(
    supabaseUrl || 'https://dummy_url.supabase.co',
    supabaseAnonKey || 'dummy_key'
  )
}
