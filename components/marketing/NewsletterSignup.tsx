'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Props for the NewsletterSignup component
 */
interface NewsletterSignupProps {
  /**
   * Title for the newsletter section
   */
  title: string;
  
  /**
   * Description text explaining the newsletter benefits
   */
  description: string;
  
  /**
   * Special incentive text to encourage signups
   */
  incentive?: string;
  
  /**
   * Text for the submit button
   * @default "Subscribe"
   */
  buttonText?: string;
  
  /**
   * Custom background color or gradient
   * @default "bg-emerald-800"
   */
  backgroundColor?: string;
  
  /**
   * Text color for the section
   * @default "text-white"
   */
  textColor?: string;
  
  /**
   * Custom CSS class for additional styling
   */
  className?: string;
  
  /**
   * Optional callback for form submission
   * Returns the email address submitted
   */
  onSubmit?: (email: string) => Promise<void> | void;
}

/**
 * NewsletterSignup component for collecting visitor email addresses
 * to build a marketing list for promotions and updates
 */
export default function NewsletterSignup({
  title,
  description,
  incentive,
  buttonText = "Subscribe",
  backgroundColor = "bg-emerald-800",
  textColor = "text-white",
  className = "",
  onSubmit
}: NewsletterSignupProps) {
  // State for form fields and submission
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      // Call the onSubmit callback if provided
      if (onSubmit) {
        await onSubmit(email);
      }
      
      // In a real app, you'd make an API call here
      // This simulates a successful signup with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mark as submitted
      setIsSubmitted(true);
      
      // Reset form
      setEmail("");
      setName("");
    } catch (err) {
      // Handle submission error
      setError("Failed to subscribe. Please try again later.");
      console.error("Newsletter signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <section 
      className={`py-16 ${backgroundColor} ${textColor} ${className}`}
      aria-labelledby="newsletter-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 
            id="newsletter-heading"
            className="text-2xl sm:text-3xl font-bold mb-4"
          >
            {title}
          </h2>
          <p className="text-lg opacity-90 mb-6">{description}</p>
          
          {/* Incentive badge */}
          {incentive && (
            <div className="mb-8">
              <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                {incentive}
              </span>
            </div>
          )}
          
          {/* Signup Form */}
          {!isSubmitted ? (
            <form 
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-0 max-w-xl mx-auto"
            >
              <div className="flex-1 min-w-0">
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-0 px-4 py-3 rounded-l-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  disabled={isLoading}
                  aria-describedby={error ? "newsletter-error" : undefined}
                />
              </div>
              <button
                type="submit"
                className="mt-3 sm:mt-0 bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-75 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : buttonText}
              </button>
              
              {/* Error message */}
              {error && (
                <div 
                  id="newsletter-error" 
                  className="mt-2 text-sm text-red-300 text-left absolute -bottom-6 left-0"
                  aria-live="polite"
                >
                  {error}
                </div>
              )}
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-700/50 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto"
            >
              <svg 
                className="h-12 w-12 text-emerald-300 mx-auto mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              <h3 className="text-xl font-medium mb-2">Thank You For Subscribing!</h3>
              <p className="opacity-90">
                We've sent a confirmation email to your inbox. 
                Check your email to complete the signup process.
              </p>
            </motion.div>
          )}
          
          {/* Privacy note */}
          <p className="mt-6 text-xs opacity-75">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from The Glamping Spot.
            We respect your privacy and will never share your information.
          </p>
        </div>
        
        {/* Social proof */}
        <div className="mt-12 text-center">
          <p className="text-sm opacity-75 mb-3">Join over 5,000 glamping enthusiasts</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-white hover:text-emerald-300" aria-label="Facebook">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-emerald-300" aria-label="Instagram">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
              </svg>
            </a>
            <a href="#" className="text-white hover:text-emerald-300" aria-label="Twitter">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}