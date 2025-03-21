'use client';

import React from "react";



/**
 * Props for the GuestSelector component
 */
interface GuestSelectorProps {
  /**
   * Current number of guests selected
   */
  value: number;
  
  /**
   * Maximum number of guests allowed
   */
  maxGuests: number;
  
  /**
   * Minimum number of guests allowed
   * @default 1
   */
  minGuests?: number;
  
  /**
   * Callback function when guest count changes
   */
  onChange: (guests: number) => void;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Flag to indicate if the component is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Custom label for the guest selector
   * @default "Guests"
   */
  label?: string;
  
  /**
   * Help text to display below the selector
   */
  helpText?: string;
}

/**
 * Guest selector component for selecting number of guests
 * Provides a user-friendly interface with increment/decrement buttons
 */
export default function GuestSelector({
  value,
  maxGuests,
  minGuests = 1,
  onChange,
  className = '',
  disabled = false,
  label = "Guests",
  helpText
}: GuestSelectorProps) {
  // Generate unique ID for accessibility
  const id = React.useId();
  const helpTextId = helpText ? `${id}-help` : undefined;

  // Handle incrementing the guest count
  const incrementGuests = () => {
    if (value < maxGuests && !disabled) {
      onChange(value + 1);
    }
  };

  // Handle decrementing the guest count
  const decrementGuests = () => {
    if (value > minGuests && !disabled) {
      onChange(value - 1);
    }
  };

  // Handle direct input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= minGuests && newValue <= maxGuests && !disabled) {
      onChange(newValue);
    }
  };

  return (
    <div className={`guest-selector ${className}`}>
      <label 
        htmlFor={`guest-input-${id}`} 
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
        <button
          type="button"
          onClick={decrementGuests}
          disabled={value <= minGuests || disabled}
          className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Decrease guest count"
        >
          <span aria-hidden="true">-</span>
        </button>
        
        <input
          id={`guest-input-${id}`}
          type="number"
          min={minGuests}
          max={maxGuests}
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          className="w-full text-center border-0 focus:ring-0 text-gray-900"
          aria-valuemin={minGuests}
          aria-valuemax={maxGuests}
          aria-valuenow={value}
          aria-describedby={helpTextId}
        />
        
        <button
          type="button"
          onClick={incrementGuests}
          disabled={value >= maxGuests || disabled}
          className="px-3 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Increase guest count"
        >
          <span aria-hidden="true">+</span>
        </button>
      </div>
      
      {helpText && (
        <p id={helpTextId} className="mt-1 text-xs text-gray-500">
          {helpText}
        </p>
      )}
      
      <div className="mt-1 text-xs text-gray-500">
        {value === 1 ? '1 guest' : `${value} guests`} {maxGuests && `(maximum ${maxGuests})`}
      </div>
    </div>
  );
}