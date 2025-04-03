"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { User } from "lucide-react";
import MobileMenu from "../header/MobileMenu";
import UserMenu from "../header/UserMenu";
import BookNowButton from "../header/BookNowButton";
import { useResponsiveLogoSize } from "@/hooks/useResponsiveLogoSize";

/**
 * Main site header component with navigation and booking button
 * Includes responsive design and user authentication state
 * Shows different links and options when user is logged in
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout, isAdmin } = useAuth();
  const logoSize = useResponsiveLogoSize();
   
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
      setScrolled(window.scrollY > 10);
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
  
  // Navigation items - different based on authentication state
  const getNavItems = () => {
    const baseItems = [
      { label: "Home", href: "/" },
      { label: "Properties", href: "/properties" },
      { label: "Experiences", href: "/experiences" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ];
    
    // If user is logged in, add user-specific items
    if (user) {
      baseItems.push({ label: "My Bookings", href: "/account/bookings" });
      
      // Only add Admin Dashboard for admin users
      if (isAdmin) {
        baseItems.push({ label: "Admin Dashboard", href: "/admin" });
      }
    }
    
    return baseItems;
  };
  
  const navItems = getNavItems();
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  return (
    <header 
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black h-18' 
          : 'bg-black h-18'
      } ${isBannerVisible ? 'top-[41px]' : 'top-0'}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          {/* Logo with circular gradient */}
          <div className="flex-shrink-0 py-2">
            <Link href="/" aria-label="The Glamping Spot - Home">
              <div className="relative">
                {/* Circular gradient background */}
                <div 
                  className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 via-orange-500 to-sky-600 opacity-80 blur-sm"
                  aria-hidden="true"
                ></div>
                
                {/* Logo with black circular background */}
                <div className="relative p-1 rounded-full bg-black">
                  <Image
                    src="/images/TheGlampingSpot_W.png"
                    alt=""
                    width={logoSize}
                    height={logoHeight}
                    priority
                    className="transition-all duration-300 rounded-full"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-start space-x-4 lg:space-x-6 py-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg transition-colors ${
                  pathname === item.href
                    ? (scrolled ? "text-emerald-600" : "text-gray-100 text-opacity-100")
                    : (scrolled ? "text-gray-100 hover:text-emerald-700" : "text-white text-opacity-80 hover:text-opacity-100")
                } ${item.label === "Admin Dashboard" ? "bg-amber-100 text-amber-800 px-3 py-1 rounded-md" : ""}`}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Right side - Book now & user actions */}
          <div className="flex items-start space-x-4 cursor-pointer py-4">
            {/* Book Now Button */}
            <BookNowButton isScrolled={scrolled} />
            
            {/* User Menu or Login/Logout Button */}
            {!loading && (
              user ? (
                <div className="flex items-start space-x-4">
                  {/* User Menu (profile picture/dropdown) */}
                  <UserMenu isScrolled={scrolled} />
                  
                  {/* Direct logout button */}
                  {/* <button
                    onClick={handleLogout}
                    className={`hidden md:flex items-center space-x-1 text-sm font-medium transition-colors ${
                      scrolled ? "hover:text-red-600" : "text-white text-opacity-80 hover:text-opacity-100"
                    }`}
                    aria-label="Log out"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden lg:inline">Logout</span>
                  </button> */}
                </div>
              ) : (
                /* Login/Register Links */
                <div className="hidden md:flex items-center space-x-2 py-2">
                  <Link
                    href="/login"
                    className={`flex items-center text-sm font-medium transition-colors ${
                      scrolled ? "text-white hover:text-emerald-700" : "text-white hover:text-emerald-400"
                    }`}
                  >
                    <User className="mr-1 h-4 w-4" aria-hidden="true" />
                    <span>Login</span>
                  </Link>
                  <span className={`${scrolled ? "text-gray-300" : "text-white opacity-50"}`}>|</span>
                  <Link
                    href="/register"
                    className={`text-sm font-medium transition-colors ${
                      scrolled ? "text-white hover:text-emerald-700" : "text-white hover:text-emerald-400"
                    }`}
                  >
                    Register
                  </Link>
                </div>
              )
            )}
            
            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="md:hidden text-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Open main menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navItems={navItems}
        isLoggedIn={!!user}
        onLogout={handleLogout}
        isAdmin={isAdmin}
      />
    </header>
  );
}