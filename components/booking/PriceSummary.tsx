'use client';

import React from 'react';

/**
 * Interface for a price line item in the summary
 */
interface PriceLineItem {
  /**
   * Label for the line item
   */
  label: string;
  
  /**
   * Amount for the line item in cents
   */
  amount: number;
  
  /**
   * Optional helper text to explain the line item
   */
  helpText?: string;
  
  /**
   * Flag to indicate if this is a subtotal line (styled differently)
   * @default false
   */
  isSubtotal?: boolean;
  
  /**
   * Flag to indicate if this is the total line (styled as bold)
   * @default false
   */
  isTotal?: boolean;
}

/**
 * Props for the PriceSummary component
 */
interface PriceSummaryProps {
  /**
   * Array of price line items to display
   */
  lineItems: PriceLineItem[];
  
  /**
   * Currency code for formatting prices
   * @default "USD"
   */
  currencyCode?: string;
  
  /**
   * Label for the total line
   * @default "Total"
   */
  totalLabel?: string;
  
  /**
   * Optional title for the summary section
   */
  title?: string;
  
  /**
   * Optional note to display at the bottom of the summary
   */
  note?: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Whether to show a divider before the total
   * @default true
   */
  showTotalDivider?: boolean;
}

/**
 * Formats a price amount in cents to a currency string
 */
function formatPrice(amount: number, currencyCode: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode
  }).format(amount / 100);
}

/**
 * Component to display a summary of prices for a booking
 * Shows line items, subtotals, and a final total
 */
export default function PriceSummary({
  lineItems,
  currencyCode = 'USD',
  totalLabel = 'Total',
  title,
  note,
  className = '',
  showTotalDivider = true
}: PriceSummaryProps) {
  // Find the total item if it exists
  const totalItem = lineItems.find(item => item.isTotal);
  
  // Calculate the total if not provided
  const total = totalItem ? totalItem.amount : lineItems.reduce((sum, item) => sum + item.amount, 0);
  
  // Generate unique ID for accessibility
  const summaryId = React.useId();
  
  return (
    <div 
      className={`price-summary ${className}`} 
      aria-labelledby={title ? `${summaryId}-title` : undefined}
    >
      {title && (
        <h3 id={`${summaryId}-title`} className="text-lg font-semibold mb-4">
          {title}
        </h3>
      )}
      
      <div className="space-y-2">
        {/* Regular line items */}
        {lineItems
          .filter(item => !item.isTotal)
          .map((item, index) => (
            <div 
              key={`${item.label}-${index}`} 
              className={`flex justify-between ${item.isSubtotal ? 'mt-4 pt-2 border-t border-gray-200' : ''}`}
            >
              <div>
                <span className={item.isSubtotal ? 'font-medium' : ''}>
                  {item.label}
                </span>
                {item.helpText && (
                  <p className="text-xs text-gray-500">{item.helpText}</p>
                )}
              </div>
              <span className={item.isSubtotal ? 'font-medium' : ''}>
                {formatPrice(item.amount, currencyCode)}
              </span>
            </div>
          ))
        }
        
        {/* Total line (either the one marked as total or calculated) */}
        <div className={`flex justify-between ${showTotalDivider ? 'pt-4 mt-4 border-t border-gray-200' : 'mt-4'}`}>
          <span className="font-bold">{totalLabel}</span>
          <span className="font-bold">
            {formatPrice(total, currencyCode)}
          </span>
        </div>
      </div>
      
      {/* Optional note */}
      {note && (
        <p className="mt-2 text-sm text-gray-500">
          {note}
        </p>
      )}
    </div>
  );
}