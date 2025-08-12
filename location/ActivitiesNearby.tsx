"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ExternalLink, ChevronRight, Filter } from "lucide-react";

/**
 * Activity type definition with enhanced accessibility
 */
interface Activity {
  id: string;
  name: string;
  description: string;
  category: string;
  distance: string;
  imageUrl: string;
  linkUrl?: string;
  tags: string[];
  accessibility?: string; // New field for accessibility info
}

// Enhanced categories for filtering
const CATEGORIES = [
  "All",
  "Nature",
  "Parks", 
  "Recreation",
  "Culture",
  "Food & Drink",
  "Shopping"
] as const;

/**
 * Activities and attractions near Kountze, Texas with comprehensive accessibility features
 */
export default function ActivitiesNearby() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);
  
  // Enhanced activities data for Kountze, Texas area
  const activities: Activity[] = useMemo(() => [
    {
      id: "big-thicket-preserve",
      name: "Big Thicket National Preserve",
      description: "Explore diverse ecosystems in this 'Biological Crossroads of North America' with over 40 miles of hiking trails, exceptional bird watching, and scenic canoeing opportunities through pristine East Texas wilderness.",
      category: "Nature",
      distance: "5 min drive",
      imageUrl: "/images/activities/big-thicket.jpg",
      linkUrl: "https://www.nps.gov/bith/",
      tags: ["hiking", "wildlife", "canoeing", "bird watching"],
      accessibility: "Wheelchair accessible visitor center and some trails"
    },
    {
      id: "village-creek-state-park",
      name: "Village Creek State Park",
      description: "Paddle, fish, hike, or camp along scenic Village Creek with sandy beaches, cypress-lined shores, and excellent facilities for water recreation and nature exploration.",
      category: "Parks",
      distance: "15 min drive",
      imageUrl: "/images/activities/village-creek.jpg",
      linkUrl: "https://tpwd.texas.gov/state-parks/village-creek",
      tags: ["swimming", "paddling", "camping", "fishing"],
      accessibility: "ADA accessible facilities and campsites available"
    },
    {
      id: "kirby-nature-trail",
      name: "Kirby Nature Trail",
      description: "An easy 1.7-mile loop trail featuring diverse plant life, excellent bird watching opportunities, and educational interpretive signs about East Texas ecosystems.",
      category: "Nature",
      distance: "10 min drive",
      imageUrl: "/images/activities/kirby-trail.jpg",
      tags: ["hiking", "bird watching", "photography", "education"],
      accessibility: "Boardwalk sections suitable for wheelchairs"
    },
    {
      id: "big-thicket-information-center",
      name: "Big Thicket Information Center",
      description: "Learn about the natural and cultural history of the Big Thicket region through engaging exhibits, interactive displays, and knowledgeable park rangers.",
      category: "Culture",
      distance: "5 min drive",
      imageUrl: "/images/activities/big-thicket-museum.jpg",
      linkUrl: "https://www.nps.gov/bith/planyourvisit/visitor-centers.htm",
      tags: ["history", "education", "indoor", "family-friendly"],
      accessibility: "Fully wheelchair accessible with accessible parking"
    },
    {
      id: "neches-river-adventures",
      name: "Neches River Adventures",
      description: "Take a guided boat tour through cypress-lined waterways and spot native wildlife including alligators, birds, and fish in their natural East Texas habitat.",
      category: "Recreation",
      distance: "25 min drive",
      imageUrl: "/images/activities/neches-river.jpg",
      linkUrl: "https://www.nechesriveradventures.org/",
      tags: ["boat tours", "wildlife", "river", "guided tours"],
      accessibility: "Assistance available for boarding boats"
    },
    {
      id: "pitcher-plant-trail",
      name: "Pitcher Plant Trail",
      description: "A short, accessible 0.5-mile trail featuring rare carnivorous plants and unique bog ecosystems found nowhere else in Texas.",
      category: "Nature",
      distance: "15 min drive",
      imageUrl: "/images/activities/pitcher-plant.jpg",
      tags: ["unique plants", "short hike", "photography", "rare species"],
      accessibility: "Boardwalk trail suitable for wheelchairs and mobility aids"
    },
    {
      id: "pine-island-bayou-paddling",
      name: "Pine Island Bayou Paddling Trail",
      description: "Paddle through beautiful cypress-lined waterways in this Texas Parks & Wildlife designated paddling trail, perfect for kayakers of all skill levels.",
      category: "Recreation", 
      distance: "20 min drive",
      imageUrl: "/images/activities/pine-island-bayou.jpg",
      linkUrl: "https://tpwd.texas.gov/fishboat/boat/paddlingtrails/inland/pine_island/",
      tags: ["kayaking", "canoeing", "water", "cypress trees"],
      accessibility: "Boat ramp with accessible parking available"
    },
    {
      id: "kountze-farmers-market",
      name: "Kountze Farmers Market",
      description: "Shop for fresh local produce, handmade crafts, and artisanal foods from local vendors. Open seasonally with rotating local artisans and farmers.",
      category: "Shopping",
      distance: "5 min drive",
      imageUrl: "/images/activities/farmers-market.jpg",
      tags: ["local food", "crafts", "shopping", "community"],
      accessibility: "Level paved area with accessible parking"
    },
    {
      id: "alabama-coushatta-cultural-center",
      name: "Alabama-Coushatta Cultural Center",
      description: "Experience Native American culture and history at Texas' oldest reservation, featuring a museum, cultural center, and seasonal powwows and cultural demonstrations.",
      category: "Culture",
      distance: "25 min drive",
      imageUrl: "/images/activities/alabama-coushatta.jpg",
      linkUrl: "https://www.alabama-coushatta.com/",
      tags: ["cultural", "history", "educational", "native american"],
      accessibility: "Wheelchair accessible museum and cultural center"
    },
    {
      id: "east-texas-cuisine",
      name: "East Texas BBQ & Local Cuisine",
      description: "Savor authentic East Texas barbecue, Cajun influences, and fresh seafood at family-owned restaurants throughout Kountze and surrounding areas.",
      category: "Food & Drink",
      distance: "5-15 min drive",
      imageUrl: "/images/activities/texas-bbq.jpg",
      tags: ["dining", "bbq", "local cuisine", "family restaurants"],
      accessibility: "Most restaurants offer accessible entrances and seating"
    }
  ], []);
  
  // Optimized filtering with useMemo
  const filteredActivities = useMemo(() => {
    return activeCategory === "All" 
      ? activities 
      : activities.filter(activity => activity.category === activeCategory);
  }, [activities, activeCategory]);
  
  return (
    <section 
      className="py-16 bg-gradient-to-b from-slate-900 to-slate-800" 
      aria-labelledby="activities-heading"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Enhanced header */}
        <div className="text-center mb-12">
          <h2 
            id="activities-heading" 
            className="text-4xl font-bold text-emerald-400 mb-4"
          >
            Explore Kountze & East Texas
          </h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Discover the natural wonders, cultural attractions, and outdoor adventures surrounding 
            our geodesic dome glamping site in the heart of the Big Thicket region.
          </p>
        </div>
        
        {/* Enhanced desktop category filter */}
        <div className="hidden md:block mb-8">
          <div className="flex justify-center">
            <div 
              className="inline-flex flex-wrap justify-center gap-2 bg-gray-800/50 p-2 rounded-xl backdrop-blur-sm"
              role="tablist"
              aria-label="Filter activities by category"
            >
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-800 ${
                    activeCategory === category
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  }`}
                  role="tab"
                  aria-selected={activeCategory === category}
                  aria-controls="activities-grid"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile category filter */}
        <div className="md:hidden mb-6">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors"
            aria-expanded={showFilters}
            aria-controls="mobile-filters"
          >
            <span className="flex items-center">
              <Filter className="mr-2 h-5 w-5 text-emerald-400" />
              Filter: {activeCategory}
            </span>
            <ChevronRight 
              className={`h-5 w-5 text-gray-400 transition-transform ${showFilters ? "rotate-90" : ""}`} 
            />
          </button>
          
          {/* Mobile filters dropdown */}
          {showFilters && (
            <div 
              id="mobile-filters"
              className="mt-2 p-2 bg-gray-800 rounded-lg shadow-lg border border-gray-600"
            >
              <div className="space-y-1" role="menu">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setShowFilters(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                      activeCategory === category
                        ? "bg-emerald-600 text-white font-medium"
                        : "text-gray-200 hover:bg-gray-700"
                    }`}
                    role="menuitem"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Enhanced activities grid */}
        <div 
          id="activities-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="tabpanel"
          aria-labelledby="activities-heading"
        >
          {filteredActivities.map((activity) => (
            <article 
              key={activity.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Optimized activity image */}
              <div className="relative h-48">
                <Image
                  src={activity.imageUrl}
                  alt={`${activity.name} - ${activity.description.substring(0, 100)}...`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={80}
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center text-white">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm font-medium">{activity.distance}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 flex-1">
                    {activity.name}
                  </h3>
                  {activity.linkUrl && (
                    <a
                      href={activity.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 transition-colors ml-2 p-1 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded"
                      aria-label={`Visit website for ${activity.name} (opens in new tab)`}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {activity.description}
                </p>
                
                {/* Accessibility information */}
                {activity.accessibility && (
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Accessibility:</span> {activity.accessibility}
                    </p>
                  </div>
                )}
                
                {/* Enhanced tags */}
                <div className="flex flex-wrap gap-2">
                  {activity.tags.map((tag, index) => (
                    <span
                      key={`${activity.id}-${tag}-${index}`}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* No results message */}
        {filteredActivities.length === 0 && (
          <div className="text-center py-16" role="status">
            <svg 
              className="h-16 w-16 text-gray-400 mx-auto mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.824-2.562M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
              />
            </svg>
            <p className="text-gray-300 text-lg mb-2">No activities found in this category.</p>
            <p className="text-gray-400">Try selecting a different filter to see more options.</p>
          </div>
        )}
        
        {/* Enhanced call to action */}
        <div className="mt-16 text-center">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need Personalized Recommendations?
            </h3>
            <p className="text-gray-200 mb-6 leading-relaxed">
              Our local staff knows East Texas inside and out. We're happy to provide 
              personalized recommendations based on your interests, mobility needs, and the weather.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                Get Recommendations
              </Link>
              <a
                href="tel:+1234567890"
                className="inline-flex items-center justify-center px-6 py-3 border border-emerald-600 text-emerald-400 font-semibold rounded-lg hover:bg-emerald-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us
              </a>
            </div>
          </div>
        </div>

        {/* Additional local information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700">
            <svg className="h-8 w-8 text-emerald-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="text-lg font-semibold text-white mb-2">Best Times to Visit</h4>
            <p className="text-gray-300 text-sm">
              Spring and fall offer the most comfortable weather for outdoor activities. Summer is great for water activities.
            </p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700">
            <svg className="h-8 w-8 text-emerald-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h4 className="text-lg font-semibold text-white mb-2">Getting Around</h4>
            <p className="text-gray-300 text-sm">
              Most attractions are easily accessible by car. We can provide detailed directions and local driving tips.
            </p>
          </div>
          
          <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-700">
            <svg className="h-8 w-8 text-emerald-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="text-lg font-semibold text-white mb-2">Local Tips</h4>
            <p className="text-gray-300 text-sm">
              Bring insect repellent, comfortable walking shoes, and a camera to capture the natural beauty.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}