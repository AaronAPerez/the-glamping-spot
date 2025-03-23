'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useResponsiveLogoSize } from '@/hooks/useResponsiveLogoSize';
import { usePathname } from 'next/navigation';

/**
 * Floating header component with responsive behavior and accessibility features
 */
  export default function Header() {
    const logoSize = useResponsiveLogoSize();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // State to track if banner is showing
    const [isBannerVisible, setIsBannerVisible] = useState(true);
    
    // Calculate height based on the width to maintain aspect ratio
    const logoHeight = Math.round(logoSize * 0.25); // 4:1 ratio
  
    // Handle both scroll and banner visibility together
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
      
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('maintenanceBannerDismissed', handleBannerDismiss);
      
      // Set initial state
      handleScroll();
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('maintenanceBannerDismissed', handleBannerDismiss);
      };
    }, []);

  return (
    <header 
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/40 shadow-md h-24' 
          : 'bg-transparent pb-2'
      } ${isBannerVisible ? 'top-[41px]' : 'top-0'}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" aria-label="The Glamping Spot - Home">
              <Image
                src="/images/TheGlampingSpot_W.png"
                alt=""
                width={logoSize}
                height={logoHeight}
                priority
                className="transition-all duration-300"
                aria-hidden="true"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            <Link 
              href="/" 
              className={`font-medium transition-colors ${
                pathname === '/' 
                  ? 'text-emerald-600' 
                  : isScrolled ? 'text-gray-800 hover:text-emerald-600' : 'text-white hover:text-emerald-300'
              }`}
              aria-current={pathname === '/' ? 'page' : undefined}
            >
              Home
            </Link>
            <Link 
              href="/properties" 
              className={`font-medium transition-colors ${
                pathname?.startsWith('/properties') 
                  ? 'text-emerald-600' 
                  : isScrolled ? 'text-gray-800 hover:text-emerald-600' : 'text-white hover:text-emerald-300'
              }`}
              aria-current={pathname?.startsWith('/properties') ? 'page' : undefined}
            >
              Properties
            </Link>
            <Link 
              href="/memories" 
              className={`font-medium transition-colors ${
                pathname?.startsWith('/memories') 
                  ? 'text-emerald-600' 
                  : isScrolled ? 'text-gray-800 hover:text-emerald-600' : 'text-white hover:text-emerald-300'
              }`}
              aria-current={pathname?.startsWith('/memories') ? 'page' : undefined}
            >
              Memories
            </Link>
            <Link 
              href="/about" 
              className={`font-medium transition-colors ${
                pathname === '/about' 
                  ? 'text-emerald-600' 
                  : isScrolled ? 'text-gray-800 hover:text-emerald-600' : 'text-white hover:text-emerald-300'
              }`}
              aria-current={pathname === '/about' ? 'page' : undefined}
            >
              About
            </Link>
            <Link 
              href="/login" 
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                isScrolled
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white'
              }`}
            >
              Login
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden rounded-md p-2 inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
            {isMobileMenuOpen ? (
              <svg 
                className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg 
                className={`h-6 w-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        id="mobile-menu"
      >
        <div className={`px-2 pt-2 pb-3 space-y-1 ${isScrolled ? 'bg-white' : 'bg-gray-900'}`}>
          <Link 
            href="/" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/' 
                ? 'bg-emerald-500 text-white' 
                : isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-current={pathname === '/' ? 'page' : undefined}
          >
            Home
          </Link>
          <Link 
            href="/properties" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname?.startsWith('/properties') 
                ? 'bg-emerald-500 text-white' 
                : isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-current={pathname?.startsWith('/properties') ? 'page' : undefined}
          >
            Properties
          </Link>
          <Link 
            href="/memories" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname?.startsWith('/memories') 
                ? 'bg-emerald-500 text-white' 
                : isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-current={pathname?.startsWith('/memories') ? 'page' : undefined}
          >
            Memories
          </Link>
          <Link 
            href="/about" 
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/about' 
                ? 'bg-emerald-500 text-white' 
                : isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-current={pathname === '/about' ? 'page' : undefined}
          >
            About
          </Link>
          <Link 
            href="/login" 
            className="block px-3 py-2 rounded-md text-base font-medium bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}