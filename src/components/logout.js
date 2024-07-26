"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useAuth } from '@/context';


export default function Logout() {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
      try {
        const response = await fetch('./api/logout', {
          method: 'GET'
        });
  
        const data = await response.json();
        setMessage(data.message);
        logout()
      } catch (error) {
        setError('An unexpected error occurred');
      }
  };

  return (
    <>
      {isLoggedIn ? (
        <Button onClick={handleLogout}
         variant="secondary">Log out
        </Button>
      ) : (
        <Button variant="secondary">Sign in</Button>
      )}
    </>
  )
}