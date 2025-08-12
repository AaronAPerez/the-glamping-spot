// 'use client';

// import React, { useState, useEffect } from 'react';
// import { BackgroundGradient } from '../ui/BackgroundGradient';
// import Link from 'next/link';
// import { TextGenerateEffect } from '../ui/TextGenerateEffect';
// import { SparklesCore } from '../ui/SparklesCore';
// import Image from 'next/image';
// import { motion } from 'framer-motion';

// /**
//  * Hero component with responsive design, performance optimizations, and enhanced accessibility
//  */
// const Hero = () => {
//   // State to track if maintenance banner is visible
//   const [isBannerVisible, setIsBannerVisible] = useState(false);

//   // Effect to check banner visibility from localStorage
//   useEffect(() => {
//     const bannerDismissed = localStorage.getItem('maintenanceBannerDismissed') === 'true';
//     setIsBannerVisible(!bannerDismissed);

//     // Listen for banner dismissal event
//     const handleBannerDismiss = () => {
//       setIsBannerVisible(false);
//     };

//     window.addEventListener('maintenanceBannerDismissed', handleBannerDismiss);

//     return () => {
//       window.removeEventListener('maintenanceBannerDismissed', handleBannerDismiss);
//     };
//   }, []);

//   return (
//     <section 
//       className={`relative h-[100vh] overflow-hidden `} 
//       aria-labelledby="hero-heading"
 
//     >
//       {/* Optimized background image with proper loading */}
//       <div className="absolute inset-0">
//         <Image
//           src="/images/GlampingHero.jpg" 
//           alt="Luxury geodesic dome glamping experience at The Glamping Spot near Houston, Texas, featuring transparent dome ceiling for stargazing"
//           fill
//           style={{ objectFit: 'cover' }}
//           priority
//           sizes="100vw"
//           quality={85}
//           placeholder="blur"
//           blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
//         />
//         <div className="absolute inset-0 bg-black/20"></div>
//       </div>
      
//       {/* Sparkles effect overlay - optimized for performance */}
//       <div className="absolute inset-0 w-full h-5/12 z-10">
//         <SparklesCore
//           id="hero-sparkles"
//           background="transparent"
//           minSize={0.4}
//           maxSize={1.5}
//           particleDensity={12} // Reduced for better performance
//           className="w-full h-full"
//           particleColor="#FFFFFF"
//         />
//       </div>
      
//       {/* Hero content with improved accessibility */}
//       <div className="relative z-20 mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
//         <div className="">
//           {/* Optimized title with proper heading hierarchy */}
//           <h1 
//             id="hero-heading" 
//             className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 text-white"
//           >
//             <TextGenerateEffect words="Experience Luxury Glamping" />
//           </h1>
          
//           {/* Enhanced subtitle with location keywords */}
//           <div className="text-xl sm:text-2xl mb-8 md:mb-14 opacity-90 text-white pt-4">
//             <h4>Discover unique geodesic dome glamping experiences near Houston in the heart of East Texas.</h4>
            
//             {/* <TextGenerateEffect 
//               words="Discover unique geodesic dome glamping experiences near Houston in the heart of East Texas."
//               speed={30}
//             /> */}
//           </div>
          
//           {/* Optimized CTA buttons with better accessibility */}
//           <div className="flex flex-col sm:flex-row gap-4 items-start">
//             <BackgroundGradient 
//               className="inline-block rounded-xl"
//               gradientColor="from-emerald-400 via-orange-500 to-sky-600"
//             >
//               <Link 
//                 href="/booking" 
//                 className="bg-transparent hover:bg-black/20 text-white py-3 px-8 rounded-xl text-lg font-medium transition duration-150 w-full sm:w-auto text-center focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
//                 aria-label="Book your luxury geodesic dome glamping experience at The Glamping Spot"
//               >
//                 Book Your Adventure
//               </Link>
//             </BackgroundGradient>
            
//             {/* Secondary CTA for desktop */}
//             <div className="hidden sm:flex mt-4 sm:mt-0">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 1.5, duration: 0.5 }}
//               >
//                 <Link 
//                   href="/properties" 
//                   className="ml-4 text-white hover:text-emerald-300 transition-colors underline decoration-emerald-400 underline-offset-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
//                   aria-label="Browse all geodesic dome accommodations"
//                 >
//                   Explore Our Domes
//                 </Link>
//               </motion.div>
//             </div>
//           </div>
          
//           {/* Mobile navigation with proper touch targets */}
//           {/* <div className="w-full mt-12 flex justify-center sm:hidden">
//             <motion.nav
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 1.5, duration: 0.5 }}
//               className="flex gap-6 bg-black/40 backdrop-blur-sm rounded-full px-6 py-3"
//               aria-label="Quick navigation"
//               role="navigation"
//             >
//               <Link 
//                 href="/properties" 
//                 className="text-white hover:text-emerald-300 transition-colors p-2 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center"
//                 aria-label="Browse geodesic dome properties"
//               >
//                 <svg 
//                   xmlns="http://www.w3.org/2000/svg" 
//                   className="h-6 w-6 mx-auto mb-1" 
//                   fill="none" 
//                   viewBox="0 0 24 24" 
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path 
//                     strokeLinecap="round" 
//                     strokeLinejoin="round" 
//                     strokeWidth={2} 
//                     d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
//                   />
//                 </svg>
//                 <span className="text-xs block">Domes</span>
//               </Link>
              
//               <Link 
//                 href="/memories" 
//                 className="text-white hover:text-emerald-300 transition-colors p-2 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center"
//                 aria-label="View guest photo gallery"
//               >
//                 <svg 
//                   xmlns="http://www.w3.org/2000/svg" 
//                   className="h-6 w-6 mx-auto mb-1" 
//                   fill="none" 
//                   viewBox="0 0 24 24" 
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path 
//                     strokeLinecap="round" 
//                     strokeLinejoin="round" 
//                     strokeWidth={2} 
//                     d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
//                   />
//                 </svg>
//                 <span className="text-xs block">Gallery</span>
//               </Link>
              
//               <Link 
//                 href="/about" 
//                 className="text-white hover:text-emerald-300 transition-colors p-2 min-w-[44px] min-h-[44px] flex flex-col items-center justify-center"
//                 aria-label="Learn about The Glamping Spot"
//               >
//                 <svg 
//                   xmlns="http://www.w3.org/2000/svg" 
//                   className="h-6 w-6 mx-auto mb-1" 
//                   fill="none" 
//                   viewBox="0 0 24 24" 
//                   stroke="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path 
//                     strokeLinecap="round" 
//                     strokeLinejoin="round" 
//                     strokeWidth={2} 
//                     d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
//                   />
//                 </svg>
//                 <span className="text-xs block">About</span>
//               </Link>
//             </motion.nav>
//           </div> */}
//         </div>
//       </div>
      
//       {/* Accessible scroll indicator */}
//       <motion.div 
//         className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ 
//           delay: 2,
//           duration: 0.5,
//           repeat: Infinity,
//           repeatType: "reverse",
//           repeatDelay: 0.5
//         }}
//         role="button"
//         aria-label="Scroll down to see more content"
//         tabIndex={0}
//         onKeyDown={(e) => {
//           if (e.key === 'Enter' || e.key === ' ') {
//             document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
//           }
//         }}
//         onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
//         // className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-full p-2"
//       >
//         <svg 
//           className="h-8 w-8 text-white" 
//           fill="none" 
//           viewBox="0 0 24 24" 
//           stroke="currentColor"
//           aria-hidden="true"
//         >
//           <path 
//             strokeLinecap="round" 
//             strokeLinejoin="round" 
//             strokeWidth={2} 
//             d="M19 14l-7 7m0 0l-7-7m7 7V3" 
//           />
//         </svg>
//       </motion.div>
//     </section>
//   );
// };

// export default Hero;