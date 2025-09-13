import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95',
        {
          'bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md': variant === 'primary',
          'bg-surface text-text-primary border-2 border-border hover:bg-secondary/50 hover:border-primary/50': variant === 'secondary',
          'border-2 border-primary text-primary hover:bg-primary hover:text-white hover:shadow-md': variant === 'outline',
          'bg-error text-white hover:bg-error/90 shadow-sm hover:shadow-md': variant === 'destructive',
          'h-8 px-3 text-sm': size === 'sm',
          'h-10 px-4 py-2': size === 'md',
          'h-12 px-6 py-3 text-base': size === 'lg',
        },
        loading && 'cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}
