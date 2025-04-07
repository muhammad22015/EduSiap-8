import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import InputField from './InputField';

describe('InputField', () => {
  it('renders the input field correctly', () => {
    const props = {
      label: 'Test Label',
      type: 'text',
      placeholder: 'Test Placeholder',
      id: 'test-id',
    };

    render(<InputField {...props} />);

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test-id');
  });
});