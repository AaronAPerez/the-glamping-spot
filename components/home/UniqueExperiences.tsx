import React from 'react'
import { TextGenerateEffect } from '../ui/TextGenerateEffect'

const UniqueExperiences = () => {
    return (
        <div>
            {/* Unique Experiences Section */}
            <section className="py-16" aria-labelledby="unique-experiences-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">

                        <h2 id="unique-experiences-heading" className="text-3xl font-bold">
                            <TextGenerateEffect words="Unique Experiences" />
                        </h2>
                        <p className="mt-4 text-xl max-w-3xl mx-auto">
                            Beyond just a place to stay, we offer memorable activities that connect you with nature
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Experience 1 */}
                        <div className="flex">
                            <div className="flex-shrink-0 h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center">
                                <svg className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="ml-6">
                                <h3 className="text-xl font-bold mb-2">Private Stargazing Sessions</h3>
                                <p>
                                    Many of our locations offer minimal light pollution, perfect for stargazing.
                                    Book a private session with our astronomy experts who bring telescopes and
                                    knowledge of constellations for an unforgettable night under the stars.
                                </p>
                            </div>
                        </div>

                        {/* Experience 2 */}
                        <div className="flex">
                            <div className="flex-shrink-0 h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center">
                                <svg className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <div className="ml-6">
                                <h3 className="text-xl font-bold mb-2">Forest Bathing Experiences</h3>
                                <p>
                                    Immerse yourself in the healing practice of shinrin-yoku (forest bathing).
                                    Our certified guides lead mindful walks through pristine forests, helping
                                    you connect deeply with nature through all your senses.
                                </p>
                            </div>
                        </div>

                        {/* Experience 3 */}
                        <div className="flex">
                            <div className="flex-shrink-0 h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center">
                                <svg className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div className="ml-6">
                                <h3 className="text-xl font-bold mb-2">Farm-to-Fire Dining</h3>
                                <p>
                                    Experience the magic of outdoor cooking with our farm-to-fire dining experiences.
                                    Local chefs prepare multi-course meals using ingredients sourced from nearby farms,
                                    all cooked over an open flame right at your glamping site.
                                </p>
                            </div>
                        </div>

                        {/* Experience 4 */}
                        <div className="flex">
                            <div className="flex-shrink-0 h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center">
                                <svg className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <div className="ml-6">
                                <h3 className="text-xl font-bold mb-2">Sunrise Yoga & Meditation</h3>
                                <p>
                                    Start your day with purpose through our sunrise yoga and meditation sessions.
                                    Our instructors guide practices suitable for all levels, held on private decks
                                    or in serene meadows with breathtaking morning views.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default UniqueExperiences;