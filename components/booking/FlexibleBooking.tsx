'use client';

import React, { useState } from 'react';

/**
 * Interface for cancellation policy details
 */
interface CancellationPolicy {
  /**
   * When a full refund is available (e.g., "48 hours before check-in")
   */
  fullRefund: string;
  
  /**
   * When a partial refund is available, or null if not applicable
   */
  partialRefund: string | null;
  
  /**
   * When no refund is available (e.g., "Less than 24 hours before check-in")
   */
  noRefund: string;
}

/**
 * Interface representing a booking policy option
 */
interface BookingPolicy {
  /**
   * Unique identifier for the policy
   */
  id: string;
  
  /**
   * Display name of the policy
   */
  name: string;
  
  /**
   * Short description of the policy
   */
  description: string;
  
  /**
   * Cancellation policy details
   */
  cancellationPolicy: CancellationPolicy;
  
  /**
   * Fee charged for changing booking dates, or null if free changes
   */
  changeFee: number | null;
  
  /**
   * Price modifier as a decimal (e.g., 0.10 for 10% more, -0.15 for 15% less)
   */
  priceModifier: number;
}

/**
 * Props for the FlexibleBooking component
 */
interface FlexibleBookingProps {
  /**
   * Base price in cents or dollars, depending on your application's pricing model
   */
  basePrice: number;
  
  /**
   * Callback function when policy changes
   */
  onPolicyChange: (policy: BookingPolicy) => void;
  
  /**
   * Default selected policy ID
   * @default "flex-standard"
   */
  defaultPolicyId?: string;
  
  /**
   * Whether to show full policy details by default
   * @default false
   */
  expandedByDefault?: boolean;
  
  /**
   * Additional CSS class names
   */
  className?: string;
  
  /**
   * Whether prices are in cents (multiply by 100 for display)
   * @default false
   */
  pricesInCents?: boolean;
}

/**
 * Component that allows users to select a booking flexibility policy
 * Shows different options for cancellation policies and pricing
 */
export default function FlexibleBooking({ 
  basePrice,
  onPolicyChange,
  defaultPolicyId = 'flex-standard',
  expandedByDefault = false,
  className = '',
  pricesInCents = false
}: FlexibleBookingProps) {
  // Booking policy options
  const policies: BookingPolicy[] = [
    {
      id: 'flex-standard',
      name: 'Standard',
      description: 'Our standard booking option with reasonable flexibility.',
      cancellationPolicy: {
        fullRefund: '48 hours before check-in',
        partialRefund: '50% refund up to 24 hours before check-in',
        noRefund: 'Less than 24 hours before check-in',
      },
      changeFee: null,
      priceModifier: 0, // Standard policy, no price change
    },
    {
      id: 'flex-flexible',
      name: 'Flexible',
      description: 'Ideal for travelers who need extra flexibility.',
      cancellationPolicy: {
        fullRefund: '24 hours before check-in',
        partialRefund: null,
        noRefund: 'Less than 24 hours before check-in',
      },
      changeFee: null,
      priceModifier: 0.10, // 10% more expensive than standard
    },
    {
      id: 'flex-nonrefundable',
      name: 'Non-refundable',
      description: 'Best value for travelers with fixed plans.',
      cancellationPolicy: {
        fullRefund: 'Not available',
        partialRefund: null,
        noRefund: 'Immediately after booking',
      },
      changeFee: 25,
      priceModifier: -0.15, // 15% cheaper than standard
    },
  ];

  // State for selected policy and expanded details
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>(defaultPolicyId);
  const [showPolicyDetails, setShowPolicyDetails] = useState<string | null>(expandedByDefault ? 'all' : null);
  
  // Find selected policy
  const selectedPolicy = policies.find(policy => policy.id === selectedPolicyId) || policies[0];
  
  // Generate unique ID for accessibility
  const componentId = React.useId();
  
  // Calculate price with policy modifier
  const calculatePrice = (policy: BookingPolicy): string => {
    const displayPrice = pricesInCents ? basePrice / 100 : basePrice;
    const modifiedPrice = displayPrice * (1 + policy.priceModifier);
    return modifiedPrice.toFixed(2);
  };
  
  // Handle policy selection
  const handlePolicyChange = (policyId: string) => {
    setSelectedPolicyId(policyId);
    const policy = policies.find(p => p.id === policyId);
    if (policy) {
      onPolicyChange(policy);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Booking Flexibility</h3>
        <button
          type="button"
          onClick={() => setShowPolicyDetails(showPolicyDetails ? null : 'all')}
          className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center"
          aria-expanded={showPolicyDetails === 'all'}
          aria-controls={`${componentId}-policy-details`}
        >
          {showPolicyDetails ? 'Hide details' : 'Compare options'}
          <svg 
            className={`ml-1 h-4 w-4 transform transition-transform ${showPolicyDetails ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {showPolicyDetails === 'all' && (
        <div 
          id={`${componentId}-policy-details`}
          className="mb-6 overflow-x-auto"
          role="region"
          aria-label="Policy comparison table"
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Option
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cancellation Policy
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change Fee
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {policies.map((policy) => (
                <tr key={policy.id} className={selectedPolicyId === policy.id ? 'bg-emerald-50' : ''}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{policy.name}</div>
                    <div className="text-xs text-gray-500">{policy.description}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs text-gray-900">
                      {policy.cancellationPolicy.fullRefund !== 'Not available' ? (
                        <p>Full refund until {policy.cancellationPolicy.fullRefund}</p>
                      ) : (
                        <p>No refunds available</p>
                      )}
                      {policy.cancellationPolicy.partialRefund && (
                        <p className="mt-1">{policy.cancellationPolicy.partialRefund}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-900">
                    {policy.changeFee === null ? 'No fee' : `$${policy.changeFee}`}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${calculatePrice(policy)}</div>
                    <div className="text-xs text-gray-500">
                      {policy.priceModifier > 0 
                        ? `+${policy.priceModifier * 100}%` 
                        : policy.priceModifier < 0 
                          ? `${policy.priceModifier * 100}%` 
                          : 'Standard'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div 
        className="space-y-3" 
        role="radiogroup" 
        aria-labelledby={`${componentId}-options-heading`}
      >
        <div id={`${componentId}-options-heading`} className="sr-only">Select a booking flexibility option</div>
        
        {policies.map((policy) => (
          <label 
            key={policy.id} 
            className={`block relative border rounded-lg p-4 cursor-pointer transition-all ${
              selectedPolicyId === policy.id 
                ? 'border-emerald-500 bg-emerald-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="bookingPolicy"
              value={policy.id}
              checked={selectedPolicyId === policy.id}
              onChange={() => handlePolicyChange(policy.id)}
              className="sr-only"
              aria-labelledby={`${policy.id}-label`}
              aria-describedby={`${policy.id}-description`}
            />
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center">
                  <div className={`h-5 w-5 border rounded-full flex items-center justify-center ${
                    selectedPolicyId === policy.id ? 'border-emerald-500' : 'border-gray-300'
                  }`}>
                    {selectedPolicyId === policy.id && (
                      <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                    )}
                  </div>
                  <span id={`${policy.id}-label`} className="ml-2 text-base font-medium text-gray-900">{policy.name}</span>
                </div>
                <p id={`${policy.id}-description`} className="mt-1 ml-7 text-sm text-gray-500">{policy.description}</p>
                
                {showPolicyDetails === policy.id && (
                  <div className="ml-7 mt-2 text-sm text-gray-700">
                    <h4 className="font-medium mb-1">Cancellation Policy</h4>
                    <ul className="list-disc pl-5 space-y-1 text-xs">
                      {policy.cancellationPolicy.fullRefund !== 'Not available' && (
                        <li>Full refund if cancelled {policy.cancellationPolicy.fullRefund}</li>
                      )}
                      {policy.cancellationPolicy.partialRefund && (
                        <li>{policy.cancellationPolicy.partialRefund}</li>
                      )}
                      <li>No refund {policy.cancellationPolicy.noRefund}</li>
                    </ul>
                    
                    <h4 className="font-medium mt-3 mb-1">Changes</h4>
                    <p className="text-xs">
                      {policy.changeFee === null 
                        ? 'Free date changes up to 48 hours before check-in'
                        : `Date changes allowed with a $${policy.changeFee} fee`
                      }
                    </p>
                  </div>
                )}
              </div>
              
              <div className="text-right">
                <div className="text-base font-medium text-gray-900">${calculatePrice(policy)}</div>
                {policy.priceModifier !== 0 && (
                  <div className={`text-xs ${
                    policy.priceModifier < 0 ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {policy.priceModifier < 0 
                      ? `Save ${Math.abs(policy.priceModifier) * 100}%` 
                      : `+${policy.priceModifier * 100}%`
                    }
                  </div>
                )}
                
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPolicyDetails(showPolicyDetails === policy.id ? null : policy.id);
                  }}
                  className="mt-2 text-xs text-emerald-600 hover:text-emerald-700"
                  aria-expanded={showPolicyDetails === policy.id}
                  aria-controls={`${policy.id}-details`}
                >
                  {showPolicyDetails === policy.id ? 'Hide details' : 'View details'}
                </button>
              </div>
            </div>
          </label>
        ))}
      </div>
      
      <div className="mt-4 border-t border-gray-200 pt-4">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Your selected option:</span> {selectedPolicy.name}
        </div>
      </div>
    </div>
  );
}