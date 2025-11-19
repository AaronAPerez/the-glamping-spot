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
      focus:ring-4 focus:ring-emerald-500/20
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variantClasses = {
      default: `
        border-gray-300 
        focus:border-emerald-600 
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
        border-emerald-500 
        focus:border-emerald-600 
        bg-emerald-50
        text-emerald-900
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
