"use client"
import { useState } from 'react'
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from '@/context'

export default function Form() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
  
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            let response;
            if (isRegistering) {
                response = await fetch('./api/sign-up', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formData),
                });
            } else {
                response = await fetch('./api/sign-in', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                  }),
                });
            }

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'An error occurred');
            } else {
                setMessage(data.message);
                login();
            }
        } catch (error) {
            setError('An unexpected error occurred');
        }  
    };

    const handleLogout = async () => {
      try {
        const response = await fetch('./api/logout', {
          method: 'GET'
        });
  
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        setError('An unexpected error occurred');
      }
    };

    return (
        <section id="form" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                {isRegistering ? 'Get Started with Transcript AI' : 'Log in to Transcript AI'}
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {isRegistering ? 'Sign up today and start transcribing your videos with our powerful tools.' : 'Log in to access your account.'}
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                {isRegistering ? 
                    <Input
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="max-w-lg flex-1"
                      required
                    /> : ''}
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="max-w-lg flex-1"
                  required
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="max-w-lg flex-1"
                  required
                />
                <Button type="submit">{isRegistering ? 'Sign Up' : 'Log In'}</Button>
                {error && <p className="text-red-500">{error}</p>}
                {message && <p className="text-green-500">{message}</p>}
              </form>
              <p className="text-xs text-muted-foreground">
                {isRegistering ? 'Sign up to get started.' : 'Log in to continue.'} By signing up, you agree to our{' '}
                <Link href="#" className="underline underline-offset-2" prefetch={false}>
                  Terms & Conditions
                </Link>
              </p>
              <button onClick={() => setIsRegistering(!isRegistering)} className="text-sm text-blue-500 underline">
                {isRegistering ? 'Already have an account? Log in' : 'Don\'t have an account? Sign up'}
              </button>
            </div>
          </div>
        </section>
    )
}