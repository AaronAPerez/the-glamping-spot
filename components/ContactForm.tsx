"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Send, AlertCircle, CheckCircle, Loader } from "lucide-react";

/**
 * Form data structure for contact form
 */
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Form field validation errors
 */
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

/**
 * Contact form submission status
 */
type SubmissionStatus = "idle" | "submitting" | "success" | "error";

/**
 * Contact Form Component Props
 */
interface ContactFormProps {
  /**
   * Text for the submit button
   */
  submitButtonText?: string;
  
  /**
   * Optional success message override
   */
  successMessage?: string;
  
  /**
   * Optional additional CSS classes
   */
  className?: string;
  
  /**
   * Optional recipient email (defaults to the one in the API)
   */
  recipientEmail?: string;
}

/**
 * Contact Form Component
 * 
 * A reusable, accessible contact form that sends emails via a
 * server API route using Gmail SMTP.
 */
export default function ContactForm({
  submitButtonText = "Send Message",
  successMessage = "Thank you for your message! We'll get back to you soon.",
  className = "",
  recipientEmail
}: ContactFormProps) {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  // Form validation errors
  const [errors, setErrors] = useState<FormErrors>({});
  
  // Form submission status
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  
  // Error message shown when the form submission fails
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  /**
   * Handle input field changes
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  /**
   * Validate form fields
   * @returns Boolean indicating whether form is valid
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Check name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    // Check email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Check subject
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    // Check message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }
    
    // Update errors state
    setErrors(newErrors);
    
    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };
  
  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    try {
      // Set form status to submitting
      setStatus("submitting");
      
      // Create payload
      const payload = {
        ...formData,
        // Include recipient email if provided in props
        recipientEmail
      };
      
      // Send the form data to the API route
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      // Check if the response was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message. Please try again.");
      }
      
      // Set success status
      setStatus("success");
      
      // Reset the form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (error) {
      // Set error status
      setStatus("error");
      
      // Set error message
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred. Please try again.");
      
      // Reset error after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 5000);
    }
  };
  
  return (
    <div className={`contact-form-container ${className}`}>
      {/* Form status notification */}
      {status === "success" && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md mb-6 flex items-center" role="alert">
          <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" aria-hidden="true" />
          <p>{successMessage}</p>
        </div>
      )}
      
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-6 flex items-center" role="alert">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" aria-hidden="true" />
          <p>{errorMessage || "An error occurred. Please try again."}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.name ? "border-red-500" : "border-gray-400"
            }`}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
            disabled={status === "submitting"}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>
        
        {/* Email field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.email ? "border-red-500" : "border-gray-400"
            }`}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
            disabled={status === "submitting"}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>
        
        {/* Subject field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.subject ? "border-red-500" : "border-gray-400"
            }`}
            aria-invalid={errors.subject ? "true" : "false"}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            disabled={status === "submitting"}
          />
          {errors.subject && (
            <p id="subject-error" className="mt-1 text-sm text-red-600">
              {errors.subject}
            </p>
          )}
        </div>
        
        {/* Message field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
              errors.message ? "border-red-500" : "border-gray-400"
            }`}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
            disabled={status === "submitting"}
          ></textarea>
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-600">
              {errors.message}
            </p>
          )}
        </div>
        
        {/* Submit button */}
        <div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? (
              <>
                <Loader className="h-5 w-5 mr-2 animate-spin" aria-hidden="true" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" aria-hidden="true" />
                {submitButtonText}
              </>
            )}
          </button>
        </div>
        
        {/* Required fields note */}
        <p className="text-xs text-gray-500 mt-3">Fields marked with <span className="text-red-500">*</span> are required</p>
      </form>
    </div>
  );
}