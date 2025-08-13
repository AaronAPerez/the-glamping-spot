'use client';

import React, { useState } from 'react';
import { useAnnouncements } from '@/lib/accessibility-utils';

interface FormData {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

/**
 * Accessible contact form component with comprehensive validation and user experience features
 */
export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    checkIn: '',
    checkOut: '',
    guests: '2',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const announce = useAnnouncements();

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    // Phone validation (optional but if provided, must be valid)
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Date validation for reservations
    if (formData.inquiryType === 'reservation') {
      if (!formData.checkIn) {
        newErrors.checkIn = 'Check-in date is required for reservations';
      }
      if (!formData.checkOut) {
        newErrors.checkOut = 'Check-out date is required for reservations';
      }
      if (formData.checkIn && formData.checkOut && new Date(formData.checkIn) >= new Date(formData.checkOut)) {
        newErrors.checkOut = 'Check-out date must be after check-in date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      announce('Please correct the errors in the form', 'assertive');
      // Focus on first error field
      const firstErrorField = Object.keys(errors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would send the data to your backend
      console.log('Form submitted:', formData);
      
      setIsSubmitted(true);
      announce('Your message has been sent successfully. We will respond within 24 hours.', 'polite');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'general',
        checkIn: '',
        checkOut: '',
        guests: '2',
        message: ''
      });
      
    } catch (error) {
      announce('There was an error sending your message. Please try again or call us directly.', 'assertive');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Input component with accessibility features
  const InputField = ({ 
    id, 
    label, 
    type = 'text', 
    required = false, 
    helpText,
    ...props 
  }: any) => {
    const error = errors[id];
    const helpId = helpText ? `${id}-help` : undefined;
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div className="space-y-2">
        <label 
          htmlFor={id} 
          className="block text-sm font-semibold text-gray-900"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="required">*</span>
          )}
        </label>
        
        <input
          id={id}
          name={id}
          type={type}
          value={formData[id as keyof FormData]}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors min-h-[44px] ${
            error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
              : 'border-gray-300'
          }`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={[errorId, helpId].filter(Boolean).join(' ')}
          {...props}
        />
        
        {helpText && (
          <p id={helpId} className="text-sm text-gray-600">
            {helpText}
          </p>
        )}
        
        {error && (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  };

  // Success message component
  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for contacting The Glamping Spot. We've received your message and will respond within 24 hours.
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              <strong>Need immediate assistance?</strong><br />
              Call us at <a href="tel:+1234567890" className="text-emerald-600 hover:underline">(123) 456-7890</a>
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="inline-flex items-center px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 id="contact-form-heading" className="text-2xl font-bold text-gray-900 mb-6">
        Send Us a Message
      </h2>
      
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-6">
          {/* Personal Information */}
          <fieldset>
            <legend className="text-lg font-semibold text-gray-900 mb-4">Personal Information</legend>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="name"
                label="Full Name"
                required
                placeholder="Enter your full name"
                autoComplete="name"
              />
              
              <InputField
                id="email"
                label="Email Address"
                type="email"
                required
                placeholder="your.email@example.com"
                autoComplete="email"
              />
            </div>
            
            <div className="mt-4">
              <InputField
                id="phone"
                label="Phone Number"
                type="tel"
                placeholder="(123) 456-7890 (optional)"
                helpText="Optional - for urgent inquiries or booking confirmations"
                autoComplete="tel"
              />
            </div>
          </fieldset>

          {/* Inquiry Type */}
          <fieldset>
            <legend className="text-lg font-semibold text-gray-900 mb-4">Type of Inquiry</legend>
            
            <div className="space-y-2">
              <label htmlFor="inquiryType" className="block text-sm font-semibold text-gray-900">
                What can we help you with? *
              </label>
              <select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[44px]"
                required
              >
                <option value="general">General Information</option>
                <option value="reservation">Make a Reservation</option>
                <option value="existing">Existing Reservation</option>
                <option value="activities">Activities & Amenities</option>
                <option value="special">Special Events & Groups</option>
                <option value="accessibility">Accessibility Needs</option>
                <option value="feedback">Feedback & Reviews</option>
                <option value="other">Other</option>
              </select>
            </div>
          </fieldset>

          {/* Reservation Details (conditional) */}
          {formData.inquiryType === 'reservation' && (
            <fieldset>
              <legend className="text-lg font-semibold text-gray-900 mb-4">Reservation Details</legend>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField
                  id="checkIn"
                  label="Check-in Date"
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
                
                <InputField
                  id="checkOut"
                  label="Check-out Date"
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
                
                <div className="space-y-2">
                  <label htmlFor="guests" className="block text-sm font-semibold text-gray-900">
                    Number of Guests *
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 min-h-[44px]"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} Guest{num !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>
          )}

          {/* Message */}
          <fieldset>
            <legend className="text-lg font-semibold text-gray-900 mb-4">Your Message</legend>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-semibold text-gray-900">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-vertical ${
                  errors.message 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300'
                }`}
                placeholder="Tell us about your planned visit, any special requirements, questions about our accommodations, or anything else we should know..."
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
                required
              />
              
              {errors.message && (
                <p id="message-error" className="text-sm text-red-600" role="alert">
                  {errors.message}
                </p>
              )}
              
              <p className="text-sm text-gray-600">
                Minimum 10 characters. Include any special requests, dietary restrictions, or accessibility needs.
              </p>
            </div>
          </fieldset>

          {/* Privacy Notice */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              <strong>Privacy Notice:</strong> Your information will only be used to respond to your inquiry and provide you with information about The Glamping Spot. We never share your personal information with third parties. 
              <a href="/privacy" className="text-emerald-600 hover:underline ml-1">Read our Privacy Policy</a>
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              <span className="text-red-500">*</span> Required fields
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all min-h-[44px]"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Message...
                </>
              ) : (
                <>
                  Send Message
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}