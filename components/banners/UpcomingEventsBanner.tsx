"use client";

import { useState, useEffect } from "react";
import { X, Calendar, AlertCircle } from "lucide-react";
import Link from "next/link";

// Types for different banner messages and styles
type BannerType = "promotion" | "event" | "announcement" | "maintenance";

interface BannerContent {
  type: BannerType;
  title: string;
  message: string;
  linkText?: string;
  linkUrl?: string;
  expiryDate?: Date;
}

interface UpcomingEventsBannerProps {
  id?: string; // Unique identifier for the banner
  content?: BannerContent; // Content to display in the banner
  isDismissible?: boolean; // Can the user close the banner?
  storeDismissState?: boolean; // Remember if the banner was dismissed
  className?: string; // Additional styling classes
}

/**
 * Banner component for displaying limited-time offers, upcoming events, or announcements
 * Can be dismissed by users, with option to store dismissal state in localStorage
 */
export default function UpcomingEventsBanner({
  id = "event-banner",
  content,
  isDismissible = true,
  storeDismissState = true,
  className = "",
}: UpcomingEventsBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [activeContent, setActiveContent] = useState<BannerContent | null>(null);

  // Default content if none provided
  const defaultContent: BannerContent = {
    type: "promotion",
    title: "Limited Time Offer!",
    message: "Book any dome for 3+ nights and get 20% off your stay.",
    linkText: "Book Now",
    linkUrl: "/properties",
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  };

  useEffect(() => {
    // Check if the banner was previously dismissed
    if (storeDismissState) {
      const isDismissed = localStorage.getItem(`${id}-dismissed`) === "true";
      setIsVisible(!isDismissed);
    }

    // Use provided content or default
    setActiveContent(content || defaultContent);

    // Check if content has expired
    if (content?.expiryDate && new Date() > content.expiryDate) {
      setIsVisible(false);
    }
  }, [id, content, storeDismissState]);

  // Handle banner dismissal
  const handleDismiss = () => {
    setIsVisible(false);
    
    // Store dismissal state if enabled
    if (storeDismissState) {
      localStorage.setItem(`${id}-dismissed`, "true");
    }
    
    // Dispatch event for other components to react to banner dismissal
    window.dispatchEvent(new CustomEvent(`${id}Dismissed`));
  };

  // Don't render if not visible or no content
  if (!isVisible || !activeContent) {
    return null;
  }

  // Get background and text colors based on banner type
  const getBannerStyles = (type: BannerType) => {
    switch (type) {
      case "promotion":
        return "bg-gradient-to-r from-purple-600 to-indigo-600 text-white";
      case "event":
        return "bg-gradient-to-r from-amber-500 to-orange-600 text-white";
      case "announcement":
        return "bg-gradient-to-r from-blue-500 to-cyan-600 text-white";
      case "maintenance":
        return "bg-gradient-to-r from-red-500 to-rose-600 text-white";
      default:
        return "bg-gradient-to-r from-emerald-500 to-teal-600 text-white";
    }
  };

  // Get appropriate icon based on banner type
  const getBannerIcon = (type: BannerType) => {
    switch (type) {
      case "event":
        return <Calendar className="h-5 w-5" aria-hidden="true" />;
      case "maintenance":
        return <AlertCircle className="h-5 w-5" aria-hidden="true" />;
      default:
        return null;
    }
  };

  // Format expiry date
  const formatExpiryDate = (date?: Date) => {
    if (!date) return "";
    
    return new Intl.DateTimeFormat("en-US", {
      month: "short", 
      day: "numeric"
    }).format(date);
  };

  return (
    <div 
      id={id}
      role="region" 
      aria-label="Announcement" 
      className={`${getBannerStyles(activeContent.type)} ${className}`}
    >
      <div className="max-w-7xl mx-auto py-2 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex-1 flex items-center">
            {getBannerIcon(activeContent.type) && (
              <span className="flex p-1 mr-3">{getBannerIcon(activeContent.type)}</span>
            )}
            
            <div className="truncate">
              <span className="font-bold mr-1">{activeContent.title}</span>
              <span className="hidden sm:inline">{activeContent.message}</span>
              
              {activeContent.expiryDate && (
                <span className="ml-1 font-semibold">
                  Ends {formatExpiryDate(activeContent.expiryDate)}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex-shrink-0 flex items-center">
            {activeContent.linkText && activeContent.linkUrl && (
              <Link 
                href={activeContent.linkUrl} 
                className="ml-3 whitespace-nowrap font-medium px-4 py-1 border border-transparent rounded-md shadow-sm bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
              >
                {activeContent.linkText}
                <span className="sr-only">: {activeContent.message}</span>
              </Link>
            )}
            
            {isDismissible && (
              <button
                type="button"
                className="ml-3 flex-shrink-0 p-1 rounded-md hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-white"
                onClick={handleDismiss}
                aria-label="Dismiss"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}