import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Property } from '@/types/database';

/**
 * Get all properties with optional filters
 */
export async function getProperties(filters?: { 
  propertyType?: string, 
  maxGuests?: number,
  featured?: boolean
}): Promise<Property[]> {
  try {
    let propertiesQuery = collection(db, 'properties');
    
    if (filters?.propertyType) {
      propertiesQuery = query(propertiesQuery, where('propertyType', '==', filters.propertyType));
    }
    
    if (filters?.maxGuests) {
      propertiesQuery = query(propertiesQuery, where('maxGuests', '>=', filters.maxGuests));
    }
    
    if (filters?.featured) {
      propertiesQuery = query(propertiesQuery, where('featuredIndex', '>', 0));
    }
    
    const snapshot = await getDocs(propertiesQuery);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Property));
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw new Error('Failed to fetch properties');
  }
}

/**
 * Get a single property by ID
 */
export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    const propertyDoc = await getDoc(doc(db, 'properties', id));
    
    if (!propertyDoc.exists()) {
      return null;
    }
    
    return {
      id: propertyDoc.id,
      ...propertyDoc.data()
    } as Property;
  } catch (error) {
    console.error('Error fetching property:', error);
    throw new Error('Failed to fetch property');
  }
}