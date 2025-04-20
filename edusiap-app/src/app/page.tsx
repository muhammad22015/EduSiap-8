'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './LoginAsli/LoginForm';

export default function Home() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Simpan token JWT jika diberikan
        if (result.token) {
          localStorage.setItem('token', result.token);
        }
        return { status: 'Login Berhasil' };
      } else {
        return { status: result.status || 'Login Gagal' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { status: 'Terjadi kesalahan saat login.' };
    }
  };

  const handleForgotPassword = () => {
    console.log('User clicked forgot password');
  };

  const handleSignUp = () => {
    console.log('User clicked Sign Up');
    router.push('/signup');
  };

  const handleGoToGallery = () => {
    router.push('/HomePage');
  };

  const handleAddVideo = () => {
    router.push('/AddVideo');
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      onForgotPassword={handleForgotPassword}
      onSignUp={handleSignUp}
      onGoToGallery={handleGoToGallery}
      onAddVideo={handleAddVideo}
    />
  );
}
