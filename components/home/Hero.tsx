import React from 'react'
import Link from 'next/link'
import { TextGenerateEffect } from '../ui/TextGenerateEffect'
import Image from 'next/image'
import { BackgroundGradient } from '../ui/background-gradient';
import { SparklesCore } from '../ui/SparklesCore';


const Hero = () => {
    return (
        <div>
            <section className="relative h-[80vh] overflow-hidden" aria-labelledby="hero-heading">
                {/* Background image with overlay */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/GlampingHero.jpg"
                        alt="Glamping dome in a scenic mountain setting"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                {/* Sparkles effect overlay */}
                <div className="absolute inset-0 w-full h-full z-10">
                    <SparklesCore
                        id="hero-sparkles"
                        background="transparent"
                        minSize={0.4}
                        maxSize={1.5}
                        particleDensity={15}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                    />
                </div>

                {/* Hero content */}
                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-10">
                    <div className="text-white max-w-2xl">
                        {/* Animated title with text generation effect */}
                        <h1
                            id="hero-heading"
                            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
                        >
                            <TextGenerateEffect words="Experience Nature in Luxury" />
                        </h1>

                        {/* Animated subtitle */}
                        <p className="text-xl sm:text-2xl mb-8 opacity-90">
                            <TextGenerateEffect words="Discover unique glamping experiences in breathtaking locations." />
                        </p>

                        {/* CTA button */}
                        <BackgroundGradient className="flex justify-center items-center rounded-xl p-[1px]">
                            <Link
                                href="/bookings"
                                className="bg-black max-w-full hover:bg-gray-900 text-white py-2 px-8 rounded-xl text-lg font-medium transition duration-150"
                                aria-label="Browse properties and book your adventure"
                            >
                                Book Your Adventure
                            </Link>
                        </BackgroundGradient>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero;