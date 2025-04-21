import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    query, 
    where, 
    orderBy, 
    limit,
    updateDoc,
    addDoc,
    deleteDoc,
    serverTimestamp 
  } from 'firebase/firestore';
  import { db } from '../config';
  import { Property } from '../../types/database';
  
  // Collection reference
  const propertiesCollection = collection(db, 'properties');
  
  /**
   * Get all properties
   * @param {boolean} activeOnly - Only return active properties
   * @returns {Promise<Property[]>} Array of properties
   */
  export const getAllProperties = async (activeOnly = true): Promise<Property[]> => {
    try {
      // Construct query
      let propertiesQuery = query(propertiesCollection);
      
      // Only include active properties if specified
      if (activeOnly) {
        propertiesQuery = query(propertiesCollection, where('isActive', '==', true));
      }
      
      // Add ordering by name
      propertiesQuery = query(propertiesQuery, orderBy('name'));
      
      // Execute the query
      const querySnapshot = await getDocs(propertiesQuery);
      
      // Map the documents to Property objects
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Property[];
    } catch (error) {
      console.error('Error getting properties:', error);
      throw error;
    }
  };
  
  /**
   * Get featured properties
   * @param {number} count - Number of featured properties to return
   * @returns {Promise<Property[]>} Array of featured properties
   */
  export const getFeaturedProperties = async (count = 4): Promise<Property[]> => {
    try {
      const featuredQuery = query(
        propertiesCollection,
        where('isActive', '==', true),
        where('featuredIndex', '>', 0),
        orderBy('featuredIndex'),
        limit(count)
      );
      
      const querySnapshot = await getDocs(featuredQuery);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Property[];
    } catch (error) {
      console.error('Error getting featured properties:', error);
      throw error;
    }
  };
  
  /**
   * Get a property by ID
   * @param {string} id - Property ID
   * @returns {Promise<Property|null>} Property or null if not found
   */
  export const getPropertyById = async (id: string): Promise<Property | null> => {
    try {
      const propertyDoc = await getDoc(doc(db, 'properties', id));
      
      if (propertyDoc.exists()) {
        return {
          id: propertyDoc.id,
          ...propertyDoc.data()
        } as Property;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting property:', error);
      throw error;
    }
  };
  
  /**
   * Get property by slug
   * @param {string} slug - Property slug
   * @returns {Promise<Property|null>} Property or null if not found
   */
  export const getPropertyBySlug = async (slug: string): Promise<Property | null> => {
    try {
      const propertyQuery = query(
        propertiesCollection,
        where('slug', '==', slug),
        limit(1)
      );
      
      const querySnapshot = await getDocs(propertyQuery);
      
      if (!querySnapshot.empty) {
        const propertyDoc = querySnapshot.docs[0];
        return {
          id: propertyDoc.id,
          ...propertyDoc.data()
        } as Property;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting property by slug:', error);
      throw error;
    }
  };
  
  /**
   * Similar properties based on type and location
   * @param {string} propertyId - Current property ID to find similar ones
   * @param {number} limit - Number of similar properties to return
   * @returns {Promise<Property[]>} Array of similar properties
   */
  export const getSimilarProperties = async (
    propertyId: string,
    count = 3
  ): Promise<Property[]> => {
    try {
      // First get the current property to match criteria
      const property = await getPropertyById(propertyId);
      
      if (!property) {
        throw new Error('Property not found');
      }
      
      // Query similar properties by type
      const similarQuery = query(
        propertiesCollection,
        where('isActive', '==', true),
        where('propertyType', '==', property.propertyType),
        where('id', '!=', propertyId),
        limit(count)
      );
      
      const querySnapshot = await getDocs(similarQuery);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Property[];
    } catch (error) {
      console.error('Error getting similar properties:', error);
      throw error;
    }
  };