'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Sample data structure for locations with weather
interface LocationWeather {
  id: string;
  name: string;
  region: string;
  currentWeather: {
    condition: string;
    temperature: number;
    icon: string;
  };
  forecast: {
    day: string;
    condition: string;
    high: number;
    low: number;
    icon: string;
  }[];
  idealFor: string[];
  propertyId: string;
}

// Define a fallback theme to use if useSeasonalTheme fails
const defaultTheme = {
  primary: 'emerald-600',
  secondary: 'emerald-700',
  accent: 'emerald-500',
  background: 'from-emerald-50 to-white',
  textPrimary: 'gray-900',
  textSecondary: 'gray-700'
};

/**
 * WeatherHighlights component displays weather information for different locations
 * with seasonal activity recommendations
 */
export default function WeatherHighlights() {
  const [locations, setLocations] = useState<LocationWeather[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  
  // Define season and theme directly as fallback
  const [currentSeason, setCurrentSeason] = useState('summer');
  const theme = defaultTheme;

  // Determine current season based on date
  useEffect(() => {
    const date = new Date();
    const month = date.getMonth();
    
    if (month >= 2 && month <= 4) setCurrentSeason('spring');
    else if (month >= 5 && month <= 7) setCurrentSeason('summer');
    else if (month >= 8 && month <= 10) setCurrentSeason('fall');
    else setCurrentSeason('winter');
  }, []);

  // In a real app, this would fetch from your API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Sample data - in production this would come from an API
      setLocations([
        {
          id: 'loc1',
          name: 'Mountain Retreat',
          region: 'Colorado Rockies',
          currentWeather: {
            condition: 'Sunny',
            temperature: 72,
            icon: '/images/weather/sunny.svg'
          },
          forecast: [
            { day: 'Today', condition: 'Sunny', high: 72, low: 55, icon: '/images/weather/sunny.svg' },
            { day: 'Tomorrow', condition: 'Partly Cloudy', high: 70, low: 54, icon: '/images/weather/partly-cloudy.svg' },
            { day: 'Wed', condition: 'Sunny', high: 74, low: 56, icon: '/images/weather/sunny.svg' }
          ],
          idealFor: ['Hiking', 'Stargazing', 'Photography'],
          propertyId: 'prop1'
        },
        {
          id: 'loc2',
          name: 'Lakeside Glamping',
          region: 'Lake Tahoe',
          currentWeather: {
            condition: 'Clear',
            temperature: 68,
            icon: '/images/weather/sunny.svg'
          },
          forecast: [
            { day: 'Today', condition: 'Clear', high: 68, low: 50, icon: '/images/weather/sunny.svg' },
            { day: 'Tomorrow', condition: 'Sunny', high: 70, low: 52, icon: '/images/weather/sunny.svg' },
            { day: 'Wed', condition: 'Partly Cloudy', high: 67, low: 51, icon: '/images/weather/partly-cloudy.svg' }
          ],
          idealFor: ['Kayaking', 'Swimming', 'Fishing'],
          propertyId: 'prop2'
        },
        {
          id: 'loc3',
          name: 'Forest Dome',
          region: 'Pacific Northwest',
          currentWeather: {
            condition: 'Light Rain',
            temperature: 62,
            icon: '/images/weather/rain.svg'
          },
          forecast: [
            { day: 'Today', condition: 'Light Rain', high: 62, low: 48, icon: '/images/weather/rain.svg' },
            { day: 'Tomorrow', condition: 'Cloudy', high: 60, low: 47, icon: '/images/weather/cloudy.svg' },
            { day: 'Wed', condition: 'Partly Cloudy', high: 64, low: 46, icon: '/images/weather/partly-cloudy.svg' }
          ],
          idealFor: ['Cozy Reading', 'Forest Bathing', 'Relaxation'],
          propertyId: 'prop3'
        }
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  // Function to get weather-based recommendations
  const getWeatherRecommendation = (weather: LocationWeather) => {
    const temp = weather.currentWeather.temperature;
    const condition = weather.currentWeather.condition.toLowerCase();
    
    if (condition.includes('rain') || condition.includes('storm')) {
      return 'Perfect for enjoying our indoor amenities and watching nature from your cozy accommodation.';
    } else if (temp > 80) {
      return 'Great time to enjoy water activities and our shaded relaxation spots.';
    } else if (temp < 50) {
      return 'Ideal for enjoying our heated accommodations and stargazing by the fire pit.';
    } else {
      return 'Perfect weather for all outdoor activities and exploring nature.';
    }
  };

  // Generate seasonal activity recommendations
  const getSeasonalActivities = () => {
    switch (currentSeason) {
      case 'spring':
        return ['Wildflower Watching', 'Nature Hikes', 'Bird Watching'];
      case 'summer':
        return ['Swimming', 'Kayaking', 'Sunset Picnics'];
      case 'fall':
        return ['Leaf Peeping', 'Apple Picking', 'Campfire Stories'];
      case 'winter':
        return ['Snowshoeing', 'Hot Cocoa by the Fire', 'Stargazing'];
      default:
        return ['Hiking', 'Photography', 'Relaxation'];
    }
  };

  // Animation variants for weather cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReducedMotion ? 0 : i * 0.1,
        duration: prefersReducedMotion ? 0 : 0.5
      }
    })
  };

  return (
    <section className={`py-16 bg-gradient-to-b from-emerald-50 to-white`} aria-labelledby="weather-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            id="weather-heading" 
            className="text-3xl font-bold text-gray-900"
          >
            Perfect Weather Awaits
          </h2>
          <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
            Discover locations with ideal conditions for your next glamping adventure
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Weather cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {locations.map((location, index) => (
                <motion.div
                  key={location.id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={cardVariants}
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="p-6 bg-emerald-600 bg-opacity-10">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-bold text-lg">{location.name}</h3>
                        <p className="text-sm">{location.region}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="relative w-10 h-10 mr-2">
                          <Image 
                            src={location.currentWeather.icon} 
                            alt={location.currentWeather.condition} 
                            fill
                            style={{ objectFit: 'contain' }}
                          />
                        </div>
                        <span className="text-2xl font-bold">{location.currentWeather.temperature}°</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mb-4">
                      {location.forecast.map((day) => (
                        <div key={day.day} className="text-center">
                          <p className="text-xs font-medium">{day.day}</p>
                          <div className="relative w-8 h-8 mx-auto my-1">
                            <Image 
                              src={day.icon} 
                              alt={day.condition} 
                              fill
                              style={{ objectFit: 'contain' }}
                            />
                          </div>
                          <p className="text-xs">
                            {day.high}° <span className="text-sky-100">{day.low}°</span>
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-3 rounded bg-emerald-600 bg-opacity-5 text-sm mb-4">
                      <p>{getWeatherRecommendation(location)}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs font-semibold uppercase text-sky-100 mb-2">Perfect for</p>
                      <div className="flex flex-wrap gap-2">
                        {location.idealFor.map((activity) => (
                          <span 
                            key={activity} 
                            className="inline-block px-2 py-1 text-xs rounded-full bg-emerald-500 bg-opacity-20 text-gray-700"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 flex justify-between items-center">
                    <Link 
                      href={`/properties/${location.propertyId}`} 
                      className="text-emerald-600 hover:underline font-medium text-sm"
                    >
                      View Property
                    </Link>
                    <Link 
                      href={`/properties/${location.propertyId}/book`} 
                      className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Seasonal activities */}
            <div className="bg-emerald-700 bg-opacity-10 rounded-lg p-6 max-w-3xl mx-auto text-center">
              <h3 className="font-bold text-xl mb-3 text-gray-700">
                {currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)} Activities
              </h3>
              <p className="mb-4">Here are some perfect activities for this time of year:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {getSeasonalActivities().map((activity) => (
                  <span 
                    key={activity} 
                    className="inline-block px-3 py-2 text-sm rounded-md bg-emerald-600 bg-opacity-20 text-gray-700"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}