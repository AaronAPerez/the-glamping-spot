import React, { forwardRef } from "react";

/**
 * Enhanced Button component with improved contrast and accessibility
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children,
    className = '',
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    leftIcon,
    rightIcon,
    type = 'button',
    ...props 
  }, ref) => {
    const baseClasses = `
      inline-flex items-center justify-center
      font-semibold rounded-xl
      transition-all duration-200
      focus:outline-none focus:ring-4 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      min-h-[44px] px-6
      relative overflow-hidden
    `;

    const sizeClasses = {
      sm: 'text-sm px-4 py-2 min-h-[36px]',
      md: 'text-base px-6 py-3 min-h-[44px]',
      lg: 'text-lg px-8 py-4 min-h-[52px]',
    };

    // High contrast colors for accessibility compliance
    const variantClasses = {
      primary: `
        bg-emerald-700 text-white 
        hover:bg-emerald-800 
        focus:ring-emerald-500 focus:ring-offset-white
        active:bg-emerald-900
        shadow-lg hover:shadow-xl
      `,
      secondary: `
        bg-gray-600 text-white 
        hover:bg-gray-700 
        focus:ring-gray-500 focus:ring-offset-white
        active:bg-gray-800
        shadow-lg hover:shadow-xl
      `,
      success: `
        bg-green-700 text-white 
        hover:bg-green-800 
        focus:ring-green-500 focus:ring-offset-white
        active:bg-green-900
        shadow-lg hover:shadow-xl
      `,
      danger: `
        bg-red-700 text-white 
        hover:bg-red-800 
        focus:ring-red-500 focus:ring-offset-white
        active:bg-red-900
        shadow-lg hover:shadow-xl
      `,
      outline: `
        bg-transparent text-emerald-700 
        border-2 border-emerald-700
        hover:bg-emerald-700 hover:text-white
        focus:ring-emerald-500 focus:ring-offset-white
        active:bg-emerald-800
      `,
    };

    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={`
          ${baseClasses} 
          ${sizeClasses[size]} 
          ${variantClasses[variant]} 
          ${className}
        `}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        <div className={`flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </div>
      </button>
    );
  }
);

Button.displayName = 'Button';


