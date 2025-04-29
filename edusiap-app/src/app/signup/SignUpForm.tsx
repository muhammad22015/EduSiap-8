'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputField from './InputField';
import SocialButton from './SocialButton';

interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLoginRedirect = () => {
    router.push('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.status || 'Something went wrong');
      } else {
        setSuccess(data.status || 'Registrasi berhasil! Silakan verifikasi email.');
        setName('');
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setError('Gagal terhubung ke server');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#F6E9DA]">
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/c0d52516637309c6a7d9f01766fd46c0a52b6a06?placeholderIfAbsent=true&apiKey=600b45a3b00b44838808f9741fb53917"
      alt="Login Background"
      className="object-cover absolute inset-0 w-full h-full z-0"
    />
      <div className="relative z-10 p-8 w-full bg-white bg-opacity-80 max-w-[465px] rounded-[30px] shadow-lg backdrop-blur-sm max-md:max-w-[400px] max-sm:p-5 max-sm:rounded-3xl">
      <div className="mx-auto w-full max-w-[404px]">
          <h1 className="mb-2.5 text-3xl text-black">Welcome!</h1>
          <p className="mb-4 text-base text-black">Please Create Your Account!</p>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-700 text-sm mb-4">{success}</p>}

          <form onSubmit={handleSubmit}>
            <InputField
              label="Name"
              type="text"
              placeholder="Enter your Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputField
              label="Email address"
              type="email"
              placeholder="Enter your email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative mb-5">
              <InputField
                label="Password"
                type="password"
                placeholder="Enter your Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-0 right-0 text-xs text-blue-900 cursor-pointer"
              >
                forgot password
              </button>
            </div>

            <div className="flex gap-1.5 items-center mb-5">
              <input
                type="checkbox"
                id="remember"
                className="rounded-sm border border-black border-solid h-[9px] w-[9px]"
              />
              <label htmlFor="remember" className="text-xs text-black">
                Remember for 30 days
              </label>
            </div>

            <button
              type="submit"
              className="p-2.5 mb-5 w-full text-sm font-bold text-white bg-lime-900 rounded-xl cursor-pointer border-[none]"
            >
              Sign Up
            </button>
          </form>

          <div className="flex gap-6 justify-between mb-5 max-sm:flex-col max-sm:gap-2.5">
            <SocialButton icon="google" text="Sign in with Google" />
            <SocialButton icon="apple" text="Sign in with Apple" />
          </div>

          <div className="text-sm text-center text-black">
            <span>Already have an account? </span>
            <button
              type="button"
              onClick={handleLoginRedirect}
              className="text-blue-700 cursor-pointer hover:underline"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
