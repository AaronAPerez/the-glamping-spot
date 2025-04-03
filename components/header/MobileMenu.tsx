
import { Fragment, JSX } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { X, LogOut, LogIn, UserPlus, ChevronRight } from "lucide-react";
import Image from "next/image";

/**
 * Mobile navigation menu component with conditional content based on auth state
 * Slides in from the right side on small screens
 */
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { label: string; href: string; icon?: JSX.Element }[];
  adminItems?: { label: string; href: string; icon?: JSX.Element }[];
  isLoggedIn: boolean;
  onLogout: () => void;
  isAdmin?: boolean;
}

export default function MobileMenu({ 
  isOpen, 
  onClose, 
  navItems, 
  adminItems = [],
  isLoggedIn,
  onLogout,
  isAdmin = false
}: MobileMenuProps) {
  const pathname = usePathname();
  
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>
        
        {/* Slide-in menu panel */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  {/* Close button */}
                  <div className="absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      onClick={onClose}
                      aria-label="Close menu"
                    >
                      <span className="sr-only">Close panel</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  
                  {/* Menu content */}
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        <Image 
                          src="/images/TheGlampingSpot.png" 
                          alt="The Glamping Spot" 
                          width={180} 
                          height={50}
                          className="h-10 w-auto"
                        />
                      </Dialog.Title>
                    </div>
                    
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* Navigation links */}
                      <div className="mb-6">
                        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Navigation
                        </h3>
                        <nav className="mt-2 flex flex-col space-y-1">
                          {navItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${
                                pathname === item.href
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "text-gray-900 hover:bg-gray-50"
                              }`}
                              onClick={onClose}
                              aria-current={pathname === item.href ? "page" : undefined}
                            >
                              {item.icon && <span className="mr-3">{item.icon}</span>}
                              {item.label}
                            </Link>
                          ))}
                        </nav>
                      </div>
                      
                      {/* Admin section */}
                      {isAdmin && adminItems.length > 0 && (
                        <div className="mb-6 border-t border-gray-200 pt-6">
                          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Admin
                          </h3>
                          <nav className="mt-2 flex flex-col space-y-1">
                            {adminItems.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center px-3 py-3 rounded-md text-base font-medium ${
                                  pathname === item.href || pathname?.startsWith(`${item.href}/`)
                                    ? "bg-amber-100 text-amber-800"
                                    : "text-gray-900 hover:bg-gray-50"
                                }`}
                                onClick={onClose}
                                aria-current={pathname === item.href ? "page" : undefined}
                              >
                                {item.icon && <span className="mr-3">{item.icon}</span>}
                                {item.label}
                                <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
                              </Link>
                            ))}
                          </nav>
                        </div>
                      )}
                      
                      {/* Book Now button */}
                      <div className="mt-4">
                        <Link
                          href="/properties"
                          className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700"
                          onClick={onClose}
                        >
                          Book Now
                        </Link>
                      </div>
                      
                      {/* Auth links */}
                      <div className="mt-10 pt-6 border-t border-gray-200">
                        {isLoggedIn ? (
                          <button
                            onClick={() => {
                              onLogout();
                              onClose();
                            }}
                            className="w-full flex items-center px-3 py-3 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                          >
                            <LogOut className="mr-3 h-5 w-5" />
                            <span>Log out</span>
                          </button>
                        ) : (
                          <div className="space-y-1">
                            <Link
                              href="/login"
                              className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                              onClick={onClose}
                            >
                              <LogIn className="mr-3 h-5 w-5 text-gray-500" />
                              <span>Log in</span>
                            </Link>
                            <Link
                              href="/register"
                              className="flex items-center px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                              onClick={onClose}
                            >
                              <UserPlus className="mr-3 h-5 w-5 text-gray-500" />
                              <span>Register</span>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}