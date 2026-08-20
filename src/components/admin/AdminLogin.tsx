import { useState, FormEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) onSuccess();
    });
  }, [onSuccess]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setError('Account created. You can now sign in.');
        setMode('signin');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center p-6">
      <div className="blueprint-grid-fine absolute inset-0 opacity-20" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-cream-300/50 hover:text-gold-400 transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Back to Website
        </a>

        <div className="glass rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 mx-auto mb-4">
              <Lock size={24} />
            </div>
            <h1 className="font-serif text-2xl text-cream-100">
              Admin Access
            </h1>
            <p className="text-sm text-cream-300/50 mt-2">
              Design Square &amp; Associates
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs tracking-[0.1em] text-cream-300/60 uppercase mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="admin@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.1em] text-cream-300/60 uppercase mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {error && (
              <p className="text-sm text-gold-400 bg-gold-500/10 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-ink-950 font-medium text-sm tracking-[0.12em] uppercase py-3.5 rounded-lg transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : mode === 'signin' ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="w-full text-center text-xs text-cream-300/40 hover:text-cream-300/70 mt-4 transition-colors"
          >
            {mode === 'signin'
              ? "Don't have an account? Sign up"
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
