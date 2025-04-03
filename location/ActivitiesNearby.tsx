"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, ExternalLink, ChevronRight, Filter } from "lucide-react";

/**
 * Activities and attractions near Kountze, Texas
 * Showcases local points of interest for glamping guests
 */

// Activity type definition
interface Activity {
  id: string;
  name: string;
  description: string;
  category: string;
  distance: string; // e.g., "15 min drive"
  imageUrl: string;
  linkUrl?: string;
  tags: string[];
}

// Categories for filtering
const CATEGORIES = [
  "All",
  "Nature",
  "Parks",
  "Recreation",
  "Culture",
  "Food & Drink",
  "Shopping"
];

export default function ActivitiesNearby() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  
  // Activities data for Kountze, Texas area
  const activities: Activity[] = [
    {
      id: "big-thicket",
      name: "Big Thicket National Preserve",
      description: "Explore diverse ecosystems in this 'Biological Crossroads of North America' with hiking trails, bird watching, and canoeing opportunities.",
      category: "Nature",
      distance: "5 min drive",
      imageUrl: "/images/activities/big-thicket.jpg",
      linkUrl: "https://www.nps.gov/bith/",
      tags: ["hiking", "wildlife", "canoeing"]
    },
    {
      id: "village-creek",
      name: "Village Creek State Park",
      description: "Paddle, fish, hike, or camp along scenic Village Creek with sandy beaches and cypress-lined shores.",
      category: "Parks",
      distance: "15 min drive",
      imageUrl: "/images/activities/village-creek.jpg",
      linkUrl: "https://tpwd.texas.gov/state-parks/village-creek",
      tags: ["swimming", "paddling", "camping"]
    },
    {
      id: "kirby-nature-trail",
      name: "Kirby Nature Trail",
      description: "An easy 1.7-mile loop trail featuring diverse plant life and excellent bird watching opportunities.",
      category: "Nature",
      distance: "10 min drive",
      imageUrl: "/images/activities/kirby-trail.jpg",
      tags: ["hiking", "bird watching", "photography"]
    },
    {
      id: "big-thicket-museum",
      name: "Big Thicket Museum",
      description: "Learn about the natural and cultural history of the Big Thicket region through engaging exhibits.",
      category: "Culture",
      distance: "5 min drive",
      imageUrl: "/images/activities/big-thicket-museum.jpg",
      tags: ["history", "education", "indoor"]
    },
    {
      id: "neches-river",
      name: "Neches River Adventures",
      description: "Take a guided boat tour through cypress-lined waterways and spot native wildlife in their natural habitat.",
      category: "Recreation",
      distance: "25 min drive",
      imageUrl: "/images/activities/neches-river.jpg",
      linkUrl: "https://www.nechesriveradventures.org/",
      tags: ["boat tours", "wildlife", "river"]
    },
    {
      id: "pitcher-plant-trail",
      name: "Pitcher Plant Trail",
      description: "A short, accessible trail featuring rare carnivorous plants and unique bog ecosystems.",
      category: "Nature",
      distance: "15 min drive",
      imageUrl: "/images/activities/pitcher-plant.jpg",
      tags: ["unique plants", "short hike", "photography"]
    },
    {
      id: "pine-island-bayou",
      name: "Pine Island Bayou Paddling Trail",
      description: "Paddle through beautiful cypress-lined waterways in this Texas Parks & Wildlife designated paddling trail.",
      category: "Recreation",
      distance: "20 min drive",
      imageUrl: "/images/activities/pine-island-bayou.jpg",
      tags: ["kayaking", "canoeing", "water"]
    },
    {
      id: "kountze-farmers-market",
      name: "Kountze Farmers Market",
      description: "Shop for local produce, handmade crafts, and artisanal foods from local vendors (seasonal).",
      category: "Shopping",
      distance: "5 min drive",
      imageUrl: "/images/activities/farmers-market.jpg",
      tags: ["local food", "crafts", "shopping"]
    },
    {
      id: "alabama-coushatta-reservation",
      name: "Alabama-Coushatta Tribe Reservation",
      description: "Experience Native American culture and history at Texas' oldest reservation, featuring a cultural center and seasonal powwows.",
      category: "Culture",
      distance: "25 min drive",
      imageUrl: "/images/activities/alabama-coushatta.jpg",
      linkUrl: "https://www.alabama-coushatta.com/",
      tags: ["cultural", "history", "educational"]
    },
    {
      id: "local-cuisine",
      name: "East Texas BBQ & Seafood",
      description: "Savor authentic East Texas barbecue, Cajun influences, and fresh seafood at local restaurants in and around Kountze.",
      category: "Food & Drink",
      distance: "5-15 min drive",
      imageUrl: "/images/activities/texas-bbq.jpg",
      tags: ["dining", "bbq", "local cuisine"]
    }
  ];
  
  // Filter activities by category
  const filteredActivities = activeCategory === "All" 
    ? activities 
    : activities.filter(activity => activity.category === activeCategory);
  
  return (
    <section className="py-12" aria-labelledby="activities-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="activities-heading" className="text-3xl font-bold text-sky-400 mb-4">
            Explore Kountze, Texas
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Discover the natural wonders and local attractions surrounding our glamping site in the heart of the Big Thicket region.
          </p>
        </div>
        
        {/* Category filter - desktop */}
        <div className="hidden md:flex justify-center mb-8">
          <div className="inline-flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  activeCategory === category
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-400 text-gray-700 hover:bg-gray-100"
                }`}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Mobile category filter toggle */}
        <div className="md:hidden mb-6">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-expanded={showFilters}
          >
            <span className="flex items-center">
              <Filter className="mr-2 h-5 w-5 text-gray-400" />
              Filter: {activeCategory}
            </span>
            <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${showFilters ? "rotate-90" : ""}`} />
          </button>
          
          {/* Mobile filters dropdown */}
          {showFilters && (
            <div className="mt-2 p-2 bg-white rounded-md shadow-lg border border-gray-200">
              <div className="space-y-1">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setShowFilters(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm rounded-md ${
                      activeCategory === category
                        ? "bg-emerald-100 text-emerald-800 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    aria-pressed={activeCategory === category}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Activities grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <div 
              key={activity.id}
              className="bg-stone-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Activity image */}
              <div className="relative h-48">
                <Image
                  src={activity.imageUrl}
                  alt={activity.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex items-center text-white">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm">{activity.distance}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{activity.name}</h3>
                  {activity.linkUrl && (
                    <a
                      href={activity.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700"
                      aria-label={`Visit website for ${activity.name} (opens in new tab)`}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
                
                <p className="text-gray-900 mb-4">{activity.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {activity.tags.map((tag) => (
                    <span
                      key={`${activity.id}-${tag}`}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-600 text-gray-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* No results message */}
        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No activities found in this category. Try another filter.</p>
          </div>
        )}
        
        {/* Call to action */}
        <div className="mt-12 text-center">
          <p className="text-gray-200 mb-4">
            Looking for something specific? Our staff is happy to provide personalized recommendations.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Ask For Recommendations
          </Link>
        </div>
      </div>
    </section>
  );
}