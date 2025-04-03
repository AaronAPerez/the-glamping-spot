// components/header/UserMenu.tsx
"use client";

import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import { 
  User, 
  LogOut, 
  Settings, 
  CreditCard, 
  Calendar, 
  Heart, 
  Layers,
  Users,
  BarChart,
  Home
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

/**
 * User account menu in the header
 * Shows login/register buttons if not logged in, or account dropdown if logged in
 * Also shows admin options if the user is an admin
 */
interface UserMenuProps {
  isScrolled: boolean;
  isAdmin?: boolean;
}

export default function UserMenu({ isScrolled, isAdmin = false }: UserMenuProps) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  
  // If still loading auth state, show loading state
  if (loading) {
    return (
      <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
    );
  }
  
  // If not logged in, show login/register buttons
  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <Link
          href="/login"
          className={`text-sm font-medium transition-colors ${
            isScrolled ? "text-gray-700 hover:text-emerald-700" : "text-white hover:text-white"
          }`}
        >
          <span className="sm:hidden">
            <LogOut className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Log in</span>
          </span>
          <span className="hidden sm:block">Log in</span>
        </Link>
        <span className={`${isScrolled ? "text-gray-300" : "text-white opacity-50"} hidden sm:inline`}>|</span>
        <Link
          href="/register"
          className={`text-sm font-medium transition-colors ${
            isScrolled ? "text-gray-700 hover:text-emerald-700" : "text-white hover:text-white"
          }`}
        >
          <span className="hidden sm:block">Register</span>
          <span className="sm:hidden">
            <User className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Register</span>
          </span>
        </Link>
      </div>
    );
  }
  
  // If logged in, show user dropdown menu
  return (
    <Menu as="div" className="relative">
      {/* Menu Button */}
      <Menu.Button
        className={`flex rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
          isScrolled ? "text-gray-700" : "text-white"
        }`}
        aria-label="User menu"
      >
        <div className="relative">
          {/* Avatar or initials */}
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt=""
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <div className={`h-8 w-8 rounded-full ${isAdmin ? 'bg-amber-600' : 'bg-emerald-600'} flex items-center justify-center text-white`}>
              {user.displayName 
                ? user.displayName.charAt(0).toUpperCase() 
                : user.email?.charAt(0).toUpperCase() || 'G'}
            </div>
          )}
          
          {/* Admin badge */}
          {isAdmin && (
            <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-amber-500 ring-2 ring-white" 
                  aria-label="Admin" />
          )}
          
          {/* Online indicator */}
          <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white" />
        </div>
      </Menu.Button>
      
      {/* Dropdown Menu */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {/* User info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {user.displayName || 'Guest'}
              {isAdmin && <span className="ml-2 px-1.5 py-0.5 text-xs bg-amber-100 text-amber-800 rounded">Admin</span>}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user.email}
            </p>
          </div>
          
          {/* Admin Items - Only shown if isAdmin is true */}
          {isAdmin && (
            <div className="border-b border-gray-100">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/admin"
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } flex items-center px-4 py-2 text-sm text-gray-700`}
                  >
                    <Layers className="mr-3 h-5 w-5 text-amber-600" aria-hidden="true" />
                    Admin Dashboard
                  </Link>
                )}
              </Menu.Item>
              
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/admin/bookings"
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } flex items-center px-4 py-2 text-sm text-gray-700`}
                  >
                    <Calendar className="mr-3 h-5 w-5 text-amber-600" aria-hidden="true" />
                    Manage Bookings
                  </Link>
                )}
              </Menu.Item>
              
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/admin/customers"
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } flex items-center px-4 py-2 text-sm text-gray-700`}
                  >
                    <Users className="mr-3 h-5 w-5 text-amber-600" aria-hidden="true" />
                    Customers
                  </Link>
                )}
              </Menu.Item>
              
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/admin/analytics"
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } flex items-center px-4 py-2 text-sm text-gray-700`}
                  >
                    <BarChart className="mr-3 h-5 w-5 text-amber-600" aria-hidden="true" />
                    Analytics
                  </Link>
                )}
              </Menu.Item>
            </div>
          )}
          
          {/* Normal user menu items */}
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/account"
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex items-center px-4 py-2 text-sm text-gray-700`}
              >
                <User className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                My Account
              </Link>
            )}
          </Menu.Item>
          
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/account/bookings"
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex items-center px-4 py-2 text-sm text-gray-700`}
              >
                <Calendar className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                My Bookings
              </Link>
            )}
          </Menu.Item>
          
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/account/favorites"
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex items-center px-4 py-2 text-sm text-gray-700`}
              >
                <Heart className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                Favorites
              </Link>
            )}
          </Menu.Item>
          
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/account/payment-methods"
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex items-center px-4 py-2 text-sm text-gray-700`}
              >
                <CreditCard className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                Payment Methods
              </Link>
            )}
          </Menu.Item>
          
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/account/settings"
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex items-center px-4 py-2 text-sm text-gray-700`}
              >
                <Settings className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                Settings
              </Link>
            )}
          </Menu.Item>
          
          <div className="border-t border-gray-100">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                >
                  <LogOut className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}