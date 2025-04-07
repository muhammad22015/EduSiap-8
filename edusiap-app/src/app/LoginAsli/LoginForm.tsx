'use client';

import React from 'react';
import SocialButton from './SocialSignIn';

type LoginFormProps = {
  onSubmit: (email: string, password: string) => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onForgotPassword,
  onSignUp,
}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/gambarBG2.jpeg')" }}
    >
      <div className="p-8 w-full bg-white bg-opacity-80 max-w-[465px] rounded-[30px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:max-w-[400px] max-sm:p-5 max-sm:rounded-3xl">
        <div className="mx-auto my-0 w-full max-w-[404px]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-black">Welcome back!</h2>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-black">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-black rounded"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 font-medium text-black">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-black rounded"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-black text-sm">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2"
                />
                Remember for 30 days
              </label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password
              </button>
            </div>

            <button
              type="submit"
              className="p-2.5 mb-5 w-full text-sm font-bold text-white bg-lime-900 rounded-xl cursor-pointer border-[none]"
            >
              Login
            </button>
          </form>

          <div className="flex gap-6 justify-between mb-5 max-sm:flex-col max-sm:gap-2.5">
            <SocialButton icon="google" text="Sign in with Google" />
            <SocialButton icon="apple" text="Sign in with Apple" />
          </div>

          <p className="text-center text-sm text-black">
            Don’t have an account?{' '}
            <button
              type="button"
              onClick={onSignUp}
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
