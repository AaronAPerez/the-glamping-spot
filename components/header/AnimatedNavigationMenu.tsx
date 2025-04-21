'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Tent,
  Compass,
  Info,
  Phone,
  User,
  LogOut,
  Menu,
  X,
  Calendar,
  ChevronDown
} from "lucide-react";
import { useResponsiveLogoSize } from "@/hooks/useResponsiveLogoSize";

interface AnimatedNavigationMenuProps {
  user: any | null;
  isAdmin?: boolean;
  onLogout: () => Promise<void>;
  logo: {
    light: string;
    dark: string;
  };
}

/**
 * AnimatedNavigationMenu - A modern navigation menu with animations and effects
 * Features adaptive design with scroll effects and mobile responsiveness
 */
export default function AnimatedNavigationMenu({
  user,
  isAdmin = false,
  onLogout,
  logo
}: AnimatedNavigationMenuProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const logoSize = useResponsiveLogoSize();



  const [isBannerVisible, setIsBannerVisible] = useState(true);
  // Calculate height based on the width to maintain aspect ratio
  const logoHeight = Math.round(logoSize * 0.25); // 4:1 ratio


  // Handle scroll effect
  useEffect(() => {
    // Check initial banner state from localStorage
    const bannerDismissed = localStorage.getItem('maintenanceBannerDismissed') === 'true';
    setIsBannerVisible(!bannerDismissed);

    const handleScroll = () => {
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
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    }
  }, []);

  // Navigation items
  const navigationItems = [
    {
      label: "Home",
      href: "/",
      icon: <Home className="h-6 w-6" />,
    },
    {
      label: "Properties",
      href: "/properties",
      icon: <Tent className="h-6 w-6" />,
    },
    {
      label: "Experiences",
      href: "/experiences",
      icon: <Compass className="h-6 w-6" />,
    },
    {
      label: "About",
      href: "/about",
      icon: <Info className="h-6 w-6" />,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: <Phone className="h-6 w-6" />,
    },
  ];

  // User menu items
  const userNavigationItems = user ? [
    {
      label: "My Bookings",
      href: "/account/bookings",
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      label: "Profile",
      href: "/account/profile",
      icon: <User className="h-6 w-6" />,
    },
  ] : [];

  // Admin menu item
  if (user && isAdmin) {
    userNavigationItems.push({
      label: "Admin Dashboard",
      href: "/admin",
      icon: <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3V21M3 12H21M5.5 5.5L18.5 18.5M18.5 5.5L5.5 18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>,
    });
  }

  // Animation variants
  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%", transition: { duration: 0.3 } },
    open: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const userMenuVariants = {
    closed: { opacity: 0, scale: 0.95, y: -10 },
    open: { opacity: 1, scale: 1, y: 0 },
  };

  // Handle mouse enter for menu items
  const handleMouseEnter = (label: string) => {
    setActiveMenuItem(label);
  };

  // Handle mouse leave for menu items
  const handleMouseLeave = () => {
    setActiveMenuItem(null);
  };

  // Handle navigation item click on mobile
  const handleMobileItemClick = () => {
    setMobileMenuOpen(false);
  };

  // Handle logout
  const handleLogout = async () => {
    setUserMenuOpen(false);
    await onLogout();
  };

  // Navigation items - different based on authentication state
  const getNavItems = () => {
    // Make sure isAdmin is defined before using it
    const userIsAdmin = isAdmin || false;

    const baseItems = [
      { label: "Home", href: "/" },
      { label: "Properties", href: "/properties" },
      { label: "Experiences", href: "/experiences" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Book Now", href: "/booking" },
      { label: "Login", href: "/login" },
    ];

    // If user is logged in, add user-specific items
    if (user) {
      baseItems.push({ label: "My Bookings", href: "/account/bookings" });

      // Only add Admin Dashboard for admin users
      if (userIsAdmin) {
        baseItems.push({ label: "Admin Dashboard", href: "/admin" });
      }
    }

    return baseItems;
  };

  const navItems = getNavItems();



  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-black h-18'
          : 'bg-black h-18'
        } ${isBannerVisible ? 'top-[41px]' : 'top-0'}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">

          {/* Logo with circular gradient */}
          <div className="flex-shrink-0 pt-12">
            <Link href="/" aria-label="The Glamping Spot - Home">
              <div className="relative">
                {/* Circular gradient background */}
                <div
                  className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 via-orange-500 to-sky-600 opacity-80 blur-sm"
                  aria-hidden="true"
                ></div>

                {/* Logo with black circular background */}
                <div className="relative py-2 rounded-full bg-black">
                  <Image
                    src="/images/TheGlampingSpot.png"
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
          <nav className="hidden md:flex items-start space-x-1 h-full">
            {navigationItems.map((item, i) => (
              <motion.div
                key={item.href}
                custom={i}
                 variants={menuItemVariants || {}}
                initial="hidden"
                animate="visible"
                 transition={{ duration: 0.3 }} // Provide a default transition
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
                className="h-full flex items-center"
              >
                <Link
                  href={item.href}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${pathname === item.href
                      ? (scrolled ? "text-emerald-600" : "text-white")
                      : (scrolled ? "text-gray-700 hover:text-emerald-600" : "text-white/90 hover:text-white")
                    }`}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  <span className="mr-1.5">{item.icon}</span>
                  <span>{item.label}</span>

                  {/* Active indicator line */}
                  {(pathname === item.href || activeMenuItem === item.label) && (
                    <motion.div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 ${scrolled ? "bg-emerald-600" : "bg-white"}`}
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center">
            {/* Book Now Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/properties"
                className={`hidden md:flex items-center px-4 py-2 rounded-full text-sm font-medium ${scrolled
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-emerald-600 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
                  } transition-colors`}
              >
                Book Now
              </Link>
            </motion.div>

            {/* User Menu (if logged in) */}
            {user ? (
              <div className="ml-4 relative" ref={userMenuRef}>
                <motion.button
                  className={`flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${scrolled ? "focus:ring-emerald-500" : "focus:ring-white"
                    }`}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-emerald-500">
                      {user.profilePicture ? (
                        <Image
                          src={user.profilePicture}
                          alt=""
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className={`h-full w-full flex items-center justify-center font-medium ${scrolled ? "bg-emerald-100 text-emerald-800" : "bg-emerald-900 text-white"
                          }`}>
                          {user.firstName?.charAt(0) || user.email?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                    </div>
                    <ChevronDown className={`ml-1 h-4 w-4 ${userMenuOpen ? "transform rotate-180" : ""
                      } transition-transform`} />
                  </div>
                </motion.button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={userMenuVariants}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="py-1 divide-y divide-gray-100">
                        <div className="px-4 py-2">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>

                        <div>
                          {userNavigationItems.map((item, index) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <span className="mr-2 text-gray-500">{item.icon}</span>
                              {item.label}
                            </Link>
                          ))}
                        </div>

                        <div>
                          <button
                            onClick={handleLogout}
                            className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                          >
                            <LogOut className="mr-2 h-6 w-6 text-red-500" />
                            Log out
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center ml-4 space-x-4">
                <Link
                  href="/login"
                  className={`text-sm font-medium hover:underline ${scrolled ? "text-gray-700" : "text-white"
                    }`}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className={`text-sm font-medium px-4 py-2 rounded-full ${
                    scrolled 
                      ? "bg-gray-100 hover:bg-gray-200 text-gray-800" 
                      : "bg-white/20 backdrop-blur-sm hover:bg-white/20 text-white"
                  }`}
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <motion.button
              className={`md:hidden ml-4 p-2 rounded-md ${scrolled
                  ? "text-white hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
                }`}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {/* <motion.button
              className={`md:hidden ml-4 p-2 rounded-md ${
                scrolled 
                  ? "text-gray-800 hover:bg-gray-100" 
                  : "text-white hover:bg-white/10"
              }`}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            > */}
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden bg-gray-900 bg-opacity-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl flex flex-col"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              {/* Mobile menu header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="h-8 w-32 relative">
                    <Image
                      src={logo.dark}
                      alt="The Glamping Spot"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <button
                  className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation items */}
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {navigationItems.map((item, i) => (
                    <motion.div
                      key={item.href}
                      custom={i}
                       variants={menuItemVariants || {}}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${pathname === item.href
                            ? "bg-emerald-50 text-emerald-600"
                            : "text-gray-700 hover:bg-gray-50"
                          }`}
                        onClick={handleMobileItemClick}
                        aria-current={pathname === item.href ? "page" : undefined}
                      >
                        <span className="mr-3 text-emerald-500">{item.icon}</span>
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* User specific menu items */}
                {user && userNavigationItems.length > 0 && (
                  <div className="mt-8">
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Your Account
                    </h3>
                    <div className="mt-1 space-y-1">
                      {userNavigationItems.map((item, i) => (
                        <motion.div
                          key={item.href}
                          custom={i + navigationItems.length}
                           variants={menuItemVariants || {}}
                          initial="hidden"
                          animate="visible"
                           transition={{ duration: 0.3 }} // Provide a default transition
                        >
                          <Link
                            href={item.href}
                            className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${pathname === item.href
                                ? "bg-emerald-50 text-emerald-600"
                                : "text-gray-700 hover:bg-gray-50"
                              }`}
                            onClick={handleMobileItemClick}
                          >
                            <span className="mr-3 text-emerald-500">{item.icon}</span>
                            {item.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </nav>

              {/* Mobile menu footer */}
              <div className="p-4 border-t border-gray-200">
                {user ? (
                  <motion.div
                     variants={menuItemVariants || {}}
                    initial="hidden"
                    animate="visible"
                     transition={{ duration: 0.3 }} // Provide a default transition
                    custom={navigationItems.length + userNavigationItems.length}
                  >
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-3 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-6 w-6 mr-3 text-red-500" />
                      Log out
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    <motion.div
                       variants={menuItemVariants || {}}
                      initial="hidden"
                      animate="visible"
                       transition={{ duration: 0.3 }} // Provide a default transition
                      custom={navigationItems.length}
                    >
                      <Link
                        href="/login"
                        className="flex w-full items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
                        onClick={handleMobileItemClick}
                      >
                        Log in
                      </Link>
                    </motion.div>
                    <motion.div
                       variants={menuItemVariants || {}}
                      initial="hidden"
                      animate="visible"
                       transition={{ duration: 0.3 }} // Provide a default transition
                      custom={navigationItems.length + 1}
                    >
                      <Link
                        href="/register"
                        className="flex w-full items-center justify-center px-4 py-3 rounded-md shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700"
                        onClick={handleMobileItemClick}
                      >
                        Register
                      </Link>
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
