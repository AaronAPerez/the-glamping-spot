import { 
    ref, 
    uploadBytes, 
    getDownloadURL, 
    deleteObject, 
    listAll, 
    StorageReference 
  } from 'firebase/storage';
  import { storage } from '../config';
  
  /**
   * Upload a file to Firebase Storage
   * @param file The file to upload
   * @param path The storage path (e.g. 'properties/123/image.jpg')
   * @returns Promise with the download URL
   */
  export const uploadFile = async (file: File, path: string): Promise<string> => {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      return await getDownloadURL(snapshot.ref);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };
  
  /**
   * Upload a property image
   * @param propertyId The property ID
   * @param file The image file
   * @param filename Optional custom filename
   * @returns Promise with the download URL
   */
  export const uploadPropertyImage = async (
    propertyId: string,
    file: File,
    filename?: string
  ): Promise<string> => {
    const name = filename || `${Date.now()}-${file.name}`;
    return uploadFile(file, `properties/${propertyId}/${name}`);
  };
  
  /**
   * Upload a user profile image
   * @param userId The user ID
   * @param file The image file
   * @returns Promise with the download URL
   */
  export const uploadProfileImage = async (userId: string, file: File): Promise<string> => {
    // Extract file extension
    const extension = file.name.split('.').pop() || 'jpg';
    return uploadFile(file, `users/${userId}/profile.${extension}`);
  };
  
  /**
   * Delete a file from Firebase Storage
   * @param path The storage path to the file
   */
  export const deleteFile = async (path: string): Promise<void> => {
    try {
      const fileRef = ref(storage, path);
      await deleteObject(fileRef);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  };
  
  /**
   * Get all files in a directory
   * @param path The directory path
   * @returns Promise with array of download URLs
   */
  export const getFilesInDirectory = async (path: string): Promise<string[]> => {
    try {
      const dirRef = ref(storage, path);
      const result = await listAll(dirRef);
      
      // Get download URLs for all items
      const urls = await Promise.all(
        result.items.map(itemRef => getDownloadURL(itemRef))
      );
      
      return urls;
    } catch (error) {
      console.error('Error listing files:', error);
      throw error;
    }
  };