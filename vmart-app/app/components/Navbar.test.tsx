import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Testing Navbar', () => {
  it('content inside the navbar', () => {
    render(<Navbar />);

    // const navbarContent = screen.getByTestId('navbar');
    const companyName = screen.getByTestId('companyName');
    expect(companyName).toBeDefined();
  });
});
