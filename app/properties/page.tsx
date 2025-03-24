import React from 'react';
import { Metadata } from 'next';
import { PropertyData } from '@/types';
import PropertyCard from '@/components/properties/PropertyCard';



// This would be replaced with API data fetching
const getProperties = async () => {
  // In a real application, this would fetch from an API
  const sampleProperties: PropertyData[] = [
    {
      _id: 'prop1',
      name: 'Luxury Treehouse Retreat',
      description: 'Elevated experience with stunning forest views',
      location: 'Asheville, North Carolina',
      price: 249,
      imageUrls: ['/images/treehouse.jpg'],
      capacity: 2,
      amenities: ['Wi-Fi', 'Heating', 'Kitchen'],
      category: 'treehouse',
      featured: true,
    },
    {
      _id: 'prop2',
      name: 'Stargazer Dome',
      description: 'Transparent dome ceiling for night sky viewing',
      location: 'Joshua Tree, California',
      price: 299,
      imageUrls: ['/images/geo-dome.jpg'],
      capacity: 4,
      amenities: ['Wi-Fi', 'Air conditioning', 'Hot tub'],
      category: 'dome',
      featured: true,
    },
    {
      _id: 'prop3',
      name: 'Lakeside Yurt',
      description: 'Modern yurt with private lake access',
      location: 'Lake Tahoe, Nevada',
      price: 219,
      imageUrls: ['/images/lakeside.jpg'],
      capacity: 3,
      amenities: ['Wi-Fi', 'Kitchenette', 'Firepit'],
      category: 'yurt',
      featured: true,
    },
    {
      _id: 'prop4',
      name: 'Mountain View Dome',
      description: 'Geodesic dome with panoramic mountain views',
      location: 'Telluride, Colorado',
      price: 279,
      imageUrls: ['/images/geo-dome.jpg'],
      capacity: 2,
      amenities: ['Heating', 'Wi-Fi', 'Coffee maker'],
      category: 'dome',
      featured: true,
    },
  ];

  return sampleProperties;
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'Properties | The Glamping Spot',
  description: 'Browse our unique glamping accommodations across stunning locations',
  keywords: 'glamping, properties, domes, treehouses, yurts, luxury camping',
};

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="mb-12 pt-28">
        <h1 className="text-4xl font-bold  mb-4">Our Glamping Properties</h1>
        <p className="text-xl text-gray-00 max-w-3xl">
          Discover our curated collection of unique glamping experiences in breathtaking natural settings. 
          From geodesic domes to luxury treehouses, find your perfect outdoor retreat.
        </p>
      </div>
      
      {/* Filters (placeholder - can be expanded later) */}
      <div className="mb-8">
        {/* Potential filter components can go here */}
      </div>
      
      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            name={property.name}
            location={property.location}
            price={property.price}
            imageUrl={property.imageUrls[0]}
          />
        ))}
      </div>
    </div>
  );
}