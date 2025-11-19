import React, { forwardRef } from "react";


/**
 * Enhanced Select component with proper labeling and accessibility
 */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
  variant?: 'default' | 'error' | 'success';
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    options, 
    placeholder, 
    className = '', 
    variant = 'default',
    children,
    ...props 
  }, ref) => {
    const baseClasses = `
      w-full px-4 py-3 
      border-2 rounded-xl 
      font-medium text-gray-900 
      bg-white
      transition-all duration-200 
      min-h-[44px]
      focus:outline-none 
      focus:ring-4 focus:ring-emerald-500/20
      disabled:opacity-50 disabled:cursor-not-allowed
      appearance-none
      bg-no-repeat bg-right
      pr-12
    `;

    const variantClasses = {
      default: `
        border-gray-300 
        focus:border-emerald-600 
        hover:border-gray-400
      `,
      error: `
        border-red-500 
        focus:border-red-600 
        bg-red-50
      `,
      success: `
        border-emerald-500 
        focus:border-emerald-600 
        bg-emerald-50
      `,
    };

    return (
      <div className="relative">
        <select
          ref={ref}
          className={`${baseClasses} ${variantClasses[variant]} ${className}`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 12px center',
            backgroundSize: '16px',
          }}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
          {children}
        </select>
        
        {/* Screen reader only instructions */}
        <span className="sr-only">
          Use arrow keys to navigate options, Enter to select
        </span>
      </div>
    );
  }
);

Select.displayName = 'Select';
