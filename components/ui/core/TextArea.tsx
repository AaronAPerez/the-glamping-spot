import React, { forwardRef } from "react";


/**
 * Enhanced Textarea component
 */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'error' | 'success';
  resize?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className = '', 
    variant = 'default', 
    resize = true,
    ...props 
  }, ref) => {
    const baseClasses = `
      w-full px-4 py-3 
      border-2 rounded-xl 
      font-medium text-gray-900 
      placeholder-gray-500
      transition-all duration-200 
      min-h-[120px]
      focus:outline-none 
      focus:ring-4 focus:ring-emerald-500/20
      disabled:opacity-50 disabled:cursor-not-allowed
      ${resize ? 'resize-y' : 'resize-none'}
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
      <textarea
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

