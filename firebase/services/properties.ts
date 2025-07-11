import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    where, 
    orderBy, 
    limit, 
    serverTimestamp 
  } from 'firebase/firestore';
  import { db } from '../config';
  import { Property } from '@/types/database';
  
  // Collection reference
  const propertiesCollection = collection(db, 'properties');
  
  /**
   * Get all properties
   */
  export const getAllProperties = async (activeOnly = true): Promise<Property[]> => {
    try {
      let propertiesQuery = query(propertiesCollection);
      
      if (activeOnly) {
        propertiesQuery = query(propertiesCollection, where('isActive', '==', true));
      }
      
      const snapshot = await getDocs(propertiesQuery);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Property[];
    } catch (error) {
      console.error('Error getting properties:', error);
      throw error;
    }
  };
  
  /**
   * Get a property by ID
   */
  export const getPropertyById = async (id: string): Promise<Property | null> => {
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
      console.error('Error getting property:', error);
      throw error;
    }
  };
  
  /**
   * Create a new property
   */
  export const createProperty = async (propertyData: Omit<Property, 'id'>): Promise<string> => {
    try {
      const docRef = await addDoc(propertiesCollection, {
        ...propertyData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  };
  
  /**
   * Update a property
   */
  export const updateProperty = async (id: string, propertyData: Partial<Property>): Promise<void> => {
    try {
      const propertyRef = doc(db, 'properties', id);
      await updateDoc(propertyRef, {
        ...propertyData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating property:', error);
      throw error;
    }
  };
  
  /**
   * Delete a property
   */
  export const deleteProperty = async (id: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, 'properties', id));
    } catch (error) {
      console.error('Error deleting property:', error);
      throw error;
    }
  };