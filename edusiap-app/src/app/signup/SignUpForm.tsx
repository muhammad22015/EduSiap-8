'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import InputField from './InputField';
import SocialButton from './SocialButton';

interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi pendaftaran berhasil, langsung redirect ke login
    router.push('/');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/gambarBG2.jpeg')" }}
    >
      <div className="p-8 w-full bg-white bg-opacity-80 max-w-[465px] rounded-[30px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:max-w-[400px] max-sm:p-5 max-sm:rounded-3xl">
        <div className="mx-auto my-0 w-full max-w-[404px]">
          <h1 className="mb-2.5 text-3xl text-black">Welcome!</h1>
          <p className="mb-8 text-base text-black">
            Please Create Your Account!
          </p>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Name"
              type="text"
              placeholder="Enter your Name"
              id="name"
            />
            <InputField
              label="Email address"
              type="email"
              placeholder="Enter your email"
              id="email"
            />
            <div className="relative mb-5">
              <InputField
                label="Password"
                type="password"
                placeholder="Enter your Password"
                id="password"
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
