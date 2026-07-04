import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BaseProps {
  label: string;
  error?: string;
  hint?: string;
}

type TextFieldProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & { as?: 'input' };

type TextAreaFieldProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { as: 'textarea' };

const fieldClasses = (hasError?: string) =>
  cn(
    'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400',
    'focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600',
    hasError ? 'border-red-400' : 'border-gray-300'
  );

export const TextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextFieldProps | TextAreaFieldProps>(
  function TextField({ label, error, hint, id, as = 'input', ...rest }, ref) {
    const fieldId = id ?? `field-${label.replace(/\s+/g, '-').toLowerCase()}`;
    const errorId = error ? `${fieldId}-error` : undefined;

    return (
      <div className="space-y-1.5">
        <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {as === 'textarea' ? (
          <textarea
            id={fieldId}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            aria-invalid={!!error}
            aria-describedby={errorId}
            className={cn(fieldClasses(error), 'min-h-[80px] resize-y')}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={fieldId}
            ref={ref as React.Ref<HTMLInputElement>}
            aria-invalid={!!error}
            aria-describedby={errorId}
            className={fieldClasses(error)}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
        {error && (
          <p id={errorId} className="text-xs text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
