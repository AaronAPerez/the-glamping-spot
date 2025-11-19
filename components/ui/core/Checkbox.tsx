import React, { forwardRef, useId } from "react";

/**
 * Enhanced Checkbox component with improved accessibility
 */
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    label,
    description,
    error,
    className = '',
    id: providedId,
    ...props 
  }, ref) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const descriptionId = description ? `${id}-description` : undefined;
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className={`flex items-start gap-3 ${className}`}>
        <div className="flex items-center h-6">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            className="
              w-5 h-5 
              text-emerald-700 
              bg-white 
              border-2 border-gray-400 
              rounded 
              focus:ring-4 focus:ring-emerald-500/20 
              focus:ring-offset-0
              checked:bg-emerald-700 
              checked:border-emerald-700
              transition-colors duration-200
            "
            aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
            aria-invalid={error ? 'true' : 'false'}
            {...props}
          />
        </div>
        
        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <label 
                htmlFor={id}
                className="block text-sm font-medium text-gray-900 cursor-pointer"
              >
                {label}
              </label>
            )}
            {description && (
              <p 
                id={descriptionId}
                className="text-sm text-gray-600 mt-1"
              >
                {description}
              </p>
            )}
            {error && (
              <p 
                id={errorId}
                className="text-sm text-red-600 mt-1 font-medium"
                role="alert"
              >
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

