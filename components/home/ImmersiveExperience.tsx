import Image from 'next/image'
import React from 'react'
import { CardBody, CardContainer } from '../ui/3d-card'
import { BackgroundGradient } from '../ui/background-gradient'
import { TextGenerateEffect } from '../ui/TextGenerateEffect'

const ImmersiveExperience = () => {
  return (
    <section className="bg-emerald-900 text-white py-16 relative" aria-labelledby="immersive-experience-heading">
      {/* Gradient Background */}
      <BackgroundGradient 
        className="absolute inset-0 opacity-30"
        // gradientColor="from-emerald-700 via-emerald-900 to-emerald-800" 
        children={undefined} 
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Section Title - Centered for mobile, left-aligned for desktop */}
        <h2 id="immersive-experience-heading" className="text-4xl font-bold mb-10 text-center md:text-left">
          <TextGenerateEffect words="Immerse Yourself in Nature" />
        </h2>
        
        <div className="md:flex md:items-start md:gap-16 lg:gap-20">
          {/* Text Content */}
          <div className="md:w-1/2 mb-12 md:mb-0">
            <p className="text-lg mb-8 text-emerald-100 leading-relaxed">
              Our glamping experiences offer the perfect balance of adventure and comfort. 
              Wake up to stunning sunrises, fall asleep under star-filled skies, and connect 
              with nature without sacrificing modern luxuries.
            </p>
            
            <ul className="space-y-5" aria-label="The Glamping Spot features">
              <li className="flex items-start">
                <span className="text-emerald-300 mr-4 mt-1 flex-shrink-0" aria-hidden="true">✓</span>
                <span className="text-emerald-50">Breathtaking locations away from crowds</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-300 mr-4 mt-1 flex-shrink-0" aria-hidden="true">✓</span>
                <span className="text-emerald-50">Luxury amenities including premium bedding and climate control</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-300 mr-4 mt-1 flex-shrink-0" aria-hidden="true">✓</span>
                <span className="text-emerald-50">Thoughtfully designed spaces that connect with the environment</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-300 mr-4 mt-1 flex-shrink-0" aria-hidden="true">✓</span>
                <span className="text-emerald-50">Sustainable practices that minimize environmental impact</span>
              </li>
            </ul>
          </div>
          
          {/* Image Gallery */}
          <div className="md:w-1/2">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-5">
                <CardContainer className="w-full">
                  <CardBody className="relative h-56 md:h-64 rounded-xl overflow-hidden shadow-lg">
                    <Image 
                      src="/images/MorningCoffee.jpg" 
                      alt="Person enjoying morning coffee with a scenic view" 
                      fill 
                      style={{ objectFit: 'cover' }} 
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
                    />
                  </CardBody>
                </CardContainer>
                
                <CardContainer className="w-full">
                  <CardBody className="relative h-56 md:h-64 rounded-xl overflow-hidden shadow-lg">
                    <Image 
                      src="/images/dining.jpg" 
                      alt="Outdoor dining setup in nature" 
                      fill 
                      style={{ objectFit: 'cover' }} 
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
                    />
                  </CardBody>
                </CardContainer>
              </div>
              
              <div className="space-y-5 mt-7">
                <CardContainer className="w-full">
                  <CardBody className="relative h-56 md:h-64 rounded-xl overflow-hidden shadow-lg">
                    <Image 
                      src="/images/stars1.jpg" 
                      alt="Night sky view through a dome ceiling" 
                      fill 
                      style={{ objectFit: 'cover' }} 
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
                    />
                  </CardBody>
                </CardContainer>
                
                <CardContainer className="w-full">
                  <CardBody className="relative h-56 md:h-64 rounded-xl overflow-hidden shadow-lg">
                    <Image 
                      src="/images/bathroom.jpg" 
                      alt="Luxury bathroom with outdoor view" 
                      fill 
                      style={{ objectFit: 'cover' }} 
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
                    />
                  </CardBody>
                </CardContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImmersiveExperience