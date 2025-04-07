import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SocialButton from './SocialButton';

describe('SocialButton', () => {
  it('renders Google button correctly', () => {
    render(<SocialButton icon="google" text="Sign in with Google" />);

    expect(screen.getByRole('button', { name: 'Sign in with Google' })).toBeInTheDocument();
    expect(screen.getByText('Sign in with Google')).toBeInTheDocument();
  });

  it('renders Apple button correctly', () => {
    render(<SocialButton icon="apple" text="Sign in with Apple" />);

    expect(screen.getByRole('button', { name: 'Sign in with Apple' })).toBeInTheDocument();
    expect(screen.getByText('Sign in with Apple')).toBeInTheDocument();
  });
});