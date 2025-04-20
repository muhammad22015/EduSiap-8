'use client';

import React from 'react';
import SocialButton from './SocialSignIn';

type LoginFormProps = {
  onSubmit: (email: string, password: string) => Promise<{ status: string }>;  // Mengubah tipe onSubmit agar mengembalikan objek dengan status
  onForgotPassword: () => void;
  onSignUp: () => void;
  onGoToGallery: () => void;
  onAddVideo: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onForgotPassword,
  onSignUp,
  onGoToGallery,
  onAddVideo,
}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const loginResponse = await onSubmit(email, password); // Ini akan menerima objek dengan status
      if (loginResponse.status === "Login Berhasil") {
        // Navigate to the gallery after successful login
        onGoToGallery();
      } else {
        setErrorMessage(loginResponse.status); // Menampilkan pesan error dari response
      }
    } catch (error) {
      setErrorMessage('An error occurred during login. Please try again.'); // Catch unexpected errors
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
                className="w-full p-2 border border-black rounded text-black"
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
                className="w-full p-2 border border-black rounded text-black"
                required
              />
            </div>

            {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>}

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
              className="p-2.5 mb-5 w-full text-sm font-bold text-white bg-lime-900 rounded-xl cursor-pointer"
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

          <p className="text-center text-sm text-black mt-2">
            ➕{' '}
            <button
              type="button"
              onClick={onAddVideo}
              className="text-blue-600 hover:underline"
            >
              Add New Video
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
