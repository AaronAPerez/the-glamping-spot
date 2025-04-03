"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "@/firebase/config";

/**
 * Enhanced Instagram-inspired login page for The Glamping Spot
 * Features a split design with imagery on the left and login form on the right
 * Added functionality: remember me, password reset flow, form validation
 */
export default function LoginPage() {
  // State for form fields and validation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [resetMode, setResetMode] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  
  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is already signed in, redirect to intended destination
        router.push(redirectUrl);
      }
    });
    
    // Get remembered email from localStorage if it exists
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
    
    return () => unsubscribe();
  }, [router, redirectUrl]);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    
    if (!resetMode && !password.trim()) {
      setError("Password is required");
      return;
    }
    
    setError(null);
    setSuccess(null);
    setLoading(true);
    
    if (resetMode) {
      // Password reset flow
      try {
        await sendPasswordResetEmail(auth, email);
        setSuccess("Password reset email sent. Please check your inbox.");
        setResetMode(false);
        setLoading(false);
      } catch (err: any) {
        if (err.code === "auth/user-not-found") {
          setError("No account found with this email address");
        } else {
          setError("Failed to send reset email. Please try again.");
          console.error("Password reset error:", err);
        }
        setLoading(false);
      }
      return;
    }
    
    // Regular login flow
    try {
      // Sign in with Firebase auth
      await signInWithEmailAndPassword(auth, email, password);
      
      // If remember me is checked, save email to localStorage
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      
      // Redirect after successful login
      router.push(redirectUrl);
    } catch (err: any) {
      // Handle specific error cases
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many login attempts. Please try again later or reset your password");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format");
      } else {
        setError("Failed to sign in. Please try again.");
        console.error("Login error:", err);
      }
      setLoading(false);
    }
  };
  
  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    
    try {
      const provider = new GoogleAuthProvider();
      // Add scopes if needed
      provider.addScope('profile');
      provider.addScope('email');
      await signInWithPopup(auth, provider);
      router.push(redirectUrl);
    } catch (err: any) {
      if (err.code === "auth/popup-closed-by-user") {
        // User closed the popup, not an error
        setLoading(false);
        return;
      }
      
      setError("Failed to sign in with Google. Please try again.");
      console.error("Google sign-in error:", err);
      setLoading(false);
    }
  };
  
  // Handle Facebook sign-in
  const handleFacebookSignIn = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    
    try {
      const provider = new FacebookAuthProvider();
      // Add permissions if needed
      provider.addScope('email');
      provider.addScope('public_profile');
      await signInWithPopup(auth, provider);
      router.push(redirectUrl);
    } catch (err: any) {
      if (err.code === "auth/popup-closed-by-user") {
        // User closed the popup, not an error
        setLoading(false);
        return;
      }
      
      setError("Failed to sign in with Facebook. Please try again.");
      console.error("Facebook sign-in error:", err);
      setLoading(false);
    }
  };
  
  // Toggle between login and reset password modes
  const toggleResetMode = () => {
    setResetMode(!resetMode);
    setError(null);
    setSuccess(null);
  };
  
  return (
    <div className="min-h-screen flex md:flex-row">
      {/* Left side - Brand imagery */}
      <div className="flex justify-center py-16 w-full md:w-1/2 px-4">
        <div className="w-full max-w-xl">
          <div className="max-w-xl z-10 p-8 rounded-lg shadow-md">
            {/* Tagline with gradient text */}
            <h1 className="text-4xl font-bold mb-2 justify-center">
              Share your perfect 
              <span className="block">getaway with</span>
              <span className="bg-gradient-to-r from-amber-400 via-blue-500 to-orange-500 text-transparent bg-clip-text">
                the people who matter
              </span>
            </h1>
            
            {/* Carousel-style image stack */}
            <div className="relative flex justify-center h-80 mt-6">
              {/* Glamping images stacked with slight rotation */}
              <div className="absolute top-8 left-8 w-full h-full rounded-lg shadow-lg transform rotate-1 overflow-hidden">
                <Image
                  src="/images/instagram/post3atv.jpg"
                  alt="ATV adventure at our glamping site"
                  className="object-cover"
                  fill
                  aria-hidden="true"
                  priority
                />
              </div>
              <div className="absolute top-4 left-4 w-full h-full rounded-lg shadow-lg transform -rotate-2 overflow-hidden">
                <Image
                  src="/images/instagram/post6firepit.jpg"
                  alt="Cozy firepit at our glamping site"
                  className="object-cover"
                  fill
                  aria-hidden="true"
                  priority
                />
              </div>
              <div className="absolute top-8 left-8 w-full h-full rounded-lg shadow-lg transform rotate-1 overflow-hidden">
                <Image
                  src="/images/projector.jpg"
                  alt="Outdoor movie projector setup"
                  className="object-cover"
                  fill
                  aria-hidden="true"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Login form */}
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 px-4 py-12">
        <div className="w-full max-w-xl">
          {/* Mobile logo (only shown on small screens) */}
          <div className="md:hidden flex justify-center mb-8">
            <Image 
              src="/images/TheGlampingSpot.png" 
              alt="The Glamping Spot" 
              width={200} 
              height={50}
              className="object-contain"
            />
          </div>
          
          <div className="bg-gray-100 p-8 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              {resetMode ? "Reset Your Password" : "Log into your account"}
            </h2>
            
            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded" role="alert">
                <p>{error}</p>
              </div>
            )}
            
            {/* Success message */}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded" role="alert">
                <p>{success}</p>
              </div>
            )}
            
            {!resetMode && (
              /* Social login buttons - only show in login mode, not in reset mode */
              <div className="mb-6 space-y-3">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full py-3 px-4 bg-white border border-gray-800 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Continue with Google"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="text-gray-700 font-medium">Continue with Google</span>
                </button>
                
                <button
                  type="button"
                  onClick={handleFacebookSignIn}
                  disabled={loading}
                  className="w-full py-3 px-4 bg-white border border-gray-800 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Continue with Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-gray-700 font-medium">Continue with Facebook</span>
                </button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-800"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-50 text-gray-700">Or</span>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  aria-required="true"
                  disabled={loading}
                />
              </div>
              
              {!resetMode && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    aria-required="true"
                    disabled={loading}
                  />
                </div>
              )}
              
              {!resetMode && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-busy={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {resetMode ? "Sending..." : "Signing in..."}
                  </span>
                ) : (
                  resetMode ? "Send Reset Link" : "Log in"
                )}
              </button>
            </form>
            
            {/* Toggle between login and reset */}
            <div className="mt-4 text-center">
              <button 
                type="button" 
                onClick={toggleResetMode}
                className="text-emerald-600 hover:text-emerald-800 text-sm font-medium focus:outline-none focus:underline"
              >
                {resetMode ? "Back to login" : "Forgot password?"}
              </button>
            </div>

            {/* Sign up CTA */}
            <div className="mt-6 pt-4 border-t border-gray-200 bg-white p-4 rounded-lg text-center">
              <p className="text-gray-700">
                Don't have an account?{" "}
                <Link href="/register" className="text-emerald-600 hover:text-emerald-800 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} The Glamping Spot. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}