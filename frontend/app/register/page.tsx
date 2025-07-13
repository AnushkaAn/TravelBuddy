'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Registering...");
    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setStatus(`❌ Error: ${errorData.detail}`);
        setIsLoading(false);
      } else {
        const data = await res.json();
        setStatus(`✅ Welcome, ${data.username}! Registration successful.`);
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Failed to register. Try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900/30 via-black/70 to-blue-900/30 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-900/20 backdrop-blur-md border border-blue-800/50 rounded-xl shadow-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-300">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-blue-100 mb-1">
              Username
            </label>
            <Input
              id="username"
              name="username"
              placeholder="Choose a username"
              value={form.username}
              onChange={handleChange}
              className="w-full bg-blue-900/30 border-blue-800/50 text-white placeholder-blue-400"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              placeholder="Your email address"
              type="email"
              value={form.email}
              onChange={handleChange}
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
              name="password"
              placeholder="Create a password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-blue-900/30 border-blue-800/50 text-white placeholder-blue-400"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full btn-primary mt-4"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
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
          Already have an account?{' '}
          <a 
            href="/login" 
            className="text-blue-300 hover:text-blue-400 font-medium transition-colors"
          >
            Login here
          </a>
        </div>
      </motion.div>
    </div>
  );
}