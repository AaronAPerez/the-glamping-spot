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
    { label: "Our Domes", href: "/properties", description: "Browse available accommodations" },
    { label: "Activities", href: "/experiences", description: "Discover local activities" },
    { label: "About", href: "/about", description: "Learn about our story" },
    { label: "Contact Us", href: "/contact", description: "Get in touch with us" },
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
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
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
                className="focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black rounded-lg"
                aria-label="The Glamping Spot - Return to homepage"
              >
                <div className="relative group">
                  {/* Enhanced gradient background */}
                  <div 
                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 via-orange-500 to-sky-600 opacity-80 blur-sm group-hover:opacity-100 transition-opacity duration-200"
                    aria-hidden="true"
                  />
                  
                  {/* Logo with optimized loading */}
                  <div className="relative py-1 px-0 rounded-full bg-black/60">
                    <Image
                      src="/images/TheGlampingSpot_W.png"
                      alt="The Glamping Spot logo"
                      width={106}
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
              className="hidden md:flex items-center space-x-6 lg:space-x-8 pb-8"
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-base lg:text-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black rounded px-2 ${
                    pathname === item.href
                      ? "text-emerald-400"
                      : "text-gray-100 hover:text-emerald-300"
                  }`}
                  aria-current={pathname === item.href ? "page" : undefined}
                  aria-label={item.description}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            {/* Right side - Book now & mobile menu */}
            <div className="flex items-center space-x-4 pb-8">
              {/* Book Now Button - Desktop */}
              <Link
                href="/booking"
                className="hidden md:inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Book your glamping experience"
              >
                Book Now
                <svg 
                  className="ml-2 h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
              </Link>

              {/* Mobile Menu Toggle with proper accessibility */}
              <button
                type="button"
                className="md:hidden text-gray-100 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black rounded-lg p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
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
                  className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-lg p-2"
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
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                          pathname === item.href
                            ? "bg-emerald-600 text-white"
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

              {/* Mobile Book Now Button */}
              <div className="p-4 border-t border-gray-700">
                <Link
                  href="/booking"
                  className="block w-full px-4 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-200 text-center focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-black"
                  onClick={toggleMobileMenu}
                  aria-label="Book your glamping experience"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}