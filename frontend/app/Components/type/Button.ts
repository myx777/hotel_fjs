import type { ButtonHTMLAttributes, ReactNode } from 'react';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}
