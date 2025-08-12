"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "./ContactForm";

/**
 * Props for Contact Section component
 */
interface ContactSectionProps {
  /**
   * Section title
   */
  title?: string;
  
  /**
   * Section subtitle/description
   */
  subtitle?: string;
  
  /**
   * Contact information
   */
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
    hours?: string;
  };
  
  /**
   * Optional additional CSS classes
   */
  className?: string;
}

/**
 * Contact Section Component
 * 
 * A full contact section with contact form and contact information.
 */
export default function ContactSection({
  title = "Get in Touch",
  subtitle = "Have a question or want to book a stay? Send us a message and we'll get back to you soon.",
  contactInfo = {
    email: "info@theglampingspot.com",
    phone: "(123) 456-7890",
    address: "123 Glamping Way, Wilderness, TX 78701",
    hours: "Monday-Friday: 9am-5pm, Saturday: 10am-4pm"
  },
  className = ""
}: ContactSectionProps) {
  return (
    <section id="contact" className={`py-16 bg-gray-400 ${className}`} aria-labelledby="contact-heading">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="bg-gray-100 rounded-lg shadow-md p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-6 text-black">Send us a Message</h3>
              <ContactForm 
                recipientEmail={contactInfo.email}
                submitButtonText="Send Message"
              />
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="flex flex-col justify-between">
            <div className="bg-gray-100 rounded-lg shadow-md p-6 md:p-8 mb-8">
              <h3 className="text-xl font-semibold mb-6 text-black">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.email && (
                  <div className="flex items-start">
                    <div className="bg-emerald-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-emerald-600" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
                      <a 
                        href={`mailto:${contactInfo.email}`} 
                        className="text-lg text-emerald-600 hover:text-emerald-800 hover:underline"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                )}
                
                {contactInfo.phone && (
                  <div className="flex items-start">
                    <div className="bg-emerald-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-emerald-600" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Phone</h4>
                      <a 
                        href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} 
                        className="text-lg text-emerald-600 hover:text-emerald-800 hover:underline"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                {contactInfo.address && (
                  <div className="flex items-start">
                    <div className="bg-emerald-100 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-emerald-600" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Location</h4>
                      <p className="text-lg text-emerald-600">{contactInfo.address}</p>
                    </div>
                  </div>
                )}
                
                {contactInfo.hours && (
                  <div className="flex items-start">
                    <div className="bg-emerald-100 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-emerald-600" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Business Hours</h4>
                      <p className="text-lg text-emerald-600">{contactInfo.hours}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Embedded Map */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-64 md:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13780.53615430168!2d-97.75!3d30.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644b599a0cc032f%3A0x5d9b464bd469d57a!2sAustin%2C%20TX!5e0!3m2!1sen!2sus!4v1674760001886!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Glamping Spot Location"
                aria-label="Map showing the location of The Glamping Spot"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}