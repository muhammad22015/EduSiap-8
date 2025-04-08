'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './LoginAsli/LoginForm';

export default function Home() {
  const router = useRouter();

  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', email, password);
    // logika autentikasi bisa ditaruh di sini
  };

  const handleForgotPassword = () => {
    console.log('User clicked forgot password');
    // arahkan ke halaman reset password, misalnya
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
