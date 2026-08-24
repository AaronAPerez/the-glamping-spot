import React, { forwardRef } from "react";

/**
 * Enhanced Input component with improved contrast and accessibility
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'error' | 'success';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const baseClasses = `
      w-full px-4 py-3 
      border-2 rounded-xl 
      font-medium text-gray-900 
      placeholder-gray-500
      transition-all duration-200 
      min-h-[44px]
      focus:outline-none 
      focus:ring-4 focus:ring-brand-500/20
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variantClasses = {
      default: `
        border-gray-300 
        focus:border-brand-600 
        hover:border-gray-400
        bg-white
      `,
      error: `
        border-red-500 
        focus:border-red-600 
        bg-red-50
        text-red-900
      `,
      success: `
        border-brand-500 
        focus:border-brand-600 
        bg-brand-50
        text-brand-900
      `,
    };

    return (
      <input
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
