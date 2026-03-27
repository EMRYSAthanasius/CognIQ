"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.push('/test');
    router.refresh();
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', background: '#fff', borderRadius: '16px', boxShadow: 'var(--shx)', border: '1px solid var(--cr3)' }}>
      <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '20px', textAlign: 'center' }}>Login</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label className="fl">Email</label>
          <input
            className="fi"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="fl">Password</label>
          <input
            className="fi"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
          />
        </div>
        <button className="btn btl bfw" onClick={handleSignIn}>Sign In</button>
        <button className="btn bout bfw" onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
}
