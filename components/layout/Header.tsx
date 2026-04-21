"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useResponsiveLogoSize } from "@/hooks/useResponsiveLogoSize";

/**
 * Main site header component with enhanced accessibility and performance optimizations
 * Includes responsive design, proper ARIA implementation, and optimized interactions
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const logoSize = useResponsiveLogoSize();
  
  // Calculate height based on the width to maintain aspect ratio
  const logoHeight = Math.round(logoSize * 0.25); // 4:1 ratio

  // Handle scroll and banner visibility
  useEffect(() => {
    // Check initial banner state from localStorage
    const bannerDismissed = localStorage.getItem('maintenanceBannerDismissed') === 'true';
    setIsBannerVisible(!bannerDismissed);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // Listen for banner dismissal
    const handleBannerDismiss = () => {
      setIsBannerVisible(false);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('maintenanceBannerDismissed', handleBannerDismiss);
    
    // Set initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('maintenanceBannerDismissed', handleBannerDismiss);
    };
  }, []);

  // Enhanced navigation items with better accessibility
  const navItems = [
    { label: "Home", href: "/", description: "Go to homepage" },
    { label: "Our Dome", href: "/properties", description: "View our geodesic dome accommodation" },
    { label: "Activities", href: "/experiences", description: "Discover local activities" },
    { label: "About", href: "/about", description: "Learn about our story" },
    { label: "Contact", href: "/contact", description: "Get in touch with us" },
  ];

  // Handle mobile menu toggle with accessibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  // Cleanup body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <>
      <header 
        className={`nav-header fixed left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-sm h-16' 
            : 'bg-black/80 h-16'
        } ${isBannerVisible ? 'top-[0px]' : 'top-0'}`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-full">
            {/* Logo with enhanced accessibility */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 focus:ring-offset-black rounded-lg"
                aria-label="The Glamping Spot - Return to homepage"
              >
                <div className="relative group">
                  {/* Enhanced gradient background */}
                  <div 
                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-700 via-orange-500 to-sky-600 opacity-80 blur-sm group-hover:opacity-100 transition-opacity duration-200"
                    aria-hidden="true"
                  />
                  
                  {/* Logo with optimized loading */}
                  <div className="relative py-1 mt-2 px-0 rounded-full bg-black/60">
                    <Image
                      src="/images/TheGlampingSpot_W.png"
                      alt="The Glamping Spot logo"
                      width={110}
                      height={logoHeight}
                      priority
                      className="transition-all duration-300 rounded-full"
                      sizes="(max-width: 768px) 120px, 160px"
                    />
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Desktop Navigation with enhanced accessibility */}
            <nav 
              className="hidden md:flex items-center space-x-6 lg:space-x-8 mb-10"
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-base lg:text-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 focus:ring-offset-black rounded px-2 ${
                    pathname === item.href
                      ? "text-emerald-700"
                      : "text-gray-100 hover:text-emerald-800"
                  }`}
                  aria-current={pathname === item.href ? "page" : undefined}
                  aria-label={item.description}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            {/* Right side - Book now & mobile menu */}
            <div className="flex items-center space-x-4 mb-10">
              {/* Book on Airbnb — Desktop */}
              <a
                href="https://www.airbnb.com/rooms/1461278647776104058"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-[#FF385C] hover:bg-[#e0314f] text-white font-semibold rounded-lg shadow-lg transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Book The Glamping Spot on Airbnb — opens in a new tab"
              >
                <svg className="w-4 h-4" viewBox="0 0 1000 1000" fill="currentColor" aria-hidden="true">
                  <path d="M499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-10 48-40 104.1-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128.1-64-111 0-172.1 94-148.1 203.1 14 59 51 124.1 107 192.1-37 41-77.1 72-116.1 93-41 19-81 23-117 8-49-18-81-61-83-111-3-50 21-102 68-140.1l16-12s24-18 72.1-44c16-8 33-17 51-26-9-12-18-24-27-35-46-59-76-117.1-88-171.1C92 270.1 176 176 279 176c55 0 97 20 138.1 63l10 11 10-11c41-43 83-63 138.1-63 103 0 187.1 94.1 160.1 228.1-12 54-41 112.1-88 171.1-9 11-18 23-27 35 18 9 35 18 51 26 48.1 26 72.1 44 72.1 44l16 12c47 38.1 71 90.1 68 140.1z" />
                </svg>
                Book on Airbnb
              </a>

              {/* Mobile Menu Toggle with proper accessibility */}
              <button
                type="button"
                className="md:hidden text-gray-100 hover:text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 focus:ring-offset-black rounded-lg p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={toggleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
              >
                {isMobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleMobileMenu}
            aria-hidden="true"
          />
          
          {/* Mobile Menu Panel */}
          <div 
            id="mobile-menu"
            className="fixed top-0 right-0 h-full w-80 max-w-sm bg-black/95 backdrop-blur-sm z-50 md:hidden transform transition-transform duration-300 ease-in-out"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            <div className="flex flex-col h-full">
              {/* Mobile menu header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 id="mobile-menu-title" className="text-lg font-semibold text-white">
                  Menu
                </h2>
                <button
                  type="button"
                  className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-700 rounded-lg p-2"
                  onClick={toggleMobileMenu}
                  aria-label="Close menu"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile navigation links */}
              <nav className="flex-1 px-4 py-6" aria-label="Mobile navigation">
                <ul className="space-y-4">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-700 ${
                          pathname === item.href
                            ? "bg-emerald-700 text-white"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }`}
                        onClick={toggleMobileMenu}
                        aria-current={pathname === item.href ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Book on Airbnb — Mobile */}
              <div className="p-4 border-t border-gray-700">
                <a
                  href="https://www.airbnb.com/rooms/1461278647776104058"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#FF385C] hover:bg-[#e0314f] text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:ring-offset-2 focus:ring-offset-black"
                  aria-label="Book The Glamping Spot on Airbnb — opens in a new tab"
                  onClick={toggleMobileMenu}
                >
                  <svg className="w-5 h-5" viewBox="0 0 1000 1000" fill="currentColor" aria-hidden="true">
                    <path d="M499.3 736.7c-51-64-81-120.1-91-168.1-10-39-6-70 11-93 18-27 45-40 80-40s62 13 80 40c17 23 21 54 11 93-10 48-40 104.1-91 168.1zm362.2 43c-7 47-39 86-83 105-85 37-169.1-22-241.1-102 119.1-149.1 141.1-265.1 90-340.2-30-43-73-64-128.1-64-111 0-172.1 94-148.1 203.1 14 59 51 124.1 107 192.1-37 41-77.1 72-116.1 93-41 19-81 23-117 8-49-18-81-61-83-111-3-50 21-102 68-140.1l16-12s24-18 72.1-44c16-8 33-17 51-26-9-12-18-24-27-35-46-59-76-117.1-88-171.1C92 270.1 176 176 279 176c55 0 97 20 138.1 63l10 11 10-11c41-43 83-63 138.1-63 103 0 187.1 94.1 160.1 228.1-12 54-41 112.1-88 171.1-9 11-18 23-27 35 18 9 35 18 51 26 48.1 26 72.1 44 72.1 44l16 12c47 38.1 71 90.1 68 140.1z" />
                  </svg>
                  Book on Airbnb
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}