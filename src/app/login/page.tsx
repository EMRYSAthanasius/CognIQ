"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
      if (error) {
        setErrorMsg(error.message);
      } else {
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred during sign up.');
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setErrorMsg(error.message);
      } else {
        router.push('/test');
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred during sign in.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', background: '#fff', borderRadius: '16px', boxShadow: 'var(--shx)', border: '1px solid var(--cr3)' }}>
      <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '20px', textAlign: 'center', color: '#0F2C5A' }}>Login</h2>
      {errorMsg && <div style={{ color: '#B83232', backgroundColor: '#FEF5F5', border: '1px solid #F5A8A8', padding: '10px', borderRadius: '8px', marginBottom: '15px', textAlign: 'center', fontSize: '14px', fontWeight: 500 }}>{errorMsg}</div>}
      <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label className="fl" style={{ color: '#1F2937' }}>Email</label>
          <input
            className="fi"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="fl" style={{ color: '#1F2937' }}>Password</label>
          <input
            className="fi"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
          />
        </div>
        <button type="button" className="btn btl bfw" onClick={handleSignIn}>Sign In</button>
        <button type="button" className="btn bout bfw" onClick={handleSignUp}>Sign Up</button>
      </form>
    </div>
  );
}
