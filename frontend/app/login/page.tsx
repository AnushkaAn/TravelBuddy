'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Logging in...');
    setIsLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setStatus(`❌ ${errorData.detail || 'Login failed'}`);
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      localStorage.setItem('token', data.access_token);
      setStatus('✅ Login successful! Redirecting...');
      
      setTimeout(() => {
        router.push('/trip');
      }, 800);
    } catch (err) {
      console.error(err);
      setStatus('❌ Login failed. Try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900/30 via-black/70 to-blue-900/30 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-900/20 backdrop-blur-md border border-blue-800/50 rounded-xl shadow-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-300">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-blue-900/30 border-blue-800/50 text-white placeholder-blue-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-blue-100 mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-blue-900/30 border-blue-800/50 text-white placeholder-blue-400"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full btn-primary mt-4"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        {status && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-sm text-center"
          >
            {status}
          </motion.p>
        )}
        <div className="mt-6 text-center text-blue-200">
          Don't have an account?{' '}
          <a 
            href="/register" 
            className="text-blue-300 hover:text-blue-400 font-medium transition-colors"
          >
            Register here
          </a>
        </div>
      </motion.div>
    </div>
  );
}