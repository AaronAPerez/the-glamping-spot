import { useState, useEffect } from 'react';
import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  UploadTask 
} from 'firebase/storage';
import { storage } from '@/firebase/config';

type UploadState = 'idle' | 'uploading' | 'success' | 'error';

/**
 * Custom hook for Firebase Storage file uploads
 */
export const useStorage = () => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [state, setState] = useState<UploadState>('idle');
  const [uploadTask, setUploadTask] = useState<UploadTask | null>(null);

  // Function to upload a file
  const uploadFile = (file: File, path: string): void => {
    setError(null);
    setState('uploading');
    setUploadProgress(0);
    setDownloadUrl(null);

    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);
    setUploadTask(task);

    task.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Upload error:', error);
        setError(error);
        setState('error');
      },
      async () => {
        try {
          const url = await getDownloadURL(task.snapshot.ref);
          setDownloadUrl(url);
          setState('success');
        } catch (err: any) {
          console.error('Error getting download URL:', err);
          setError(err);
          setState('error');
        }
      }
    );
  };

  // Function to cancel the current upload
  const cancelUpload = (): void => {
    if (uploadTask && state === 'uploading') {
      uploadTask.cancel();
      setState('idle');
    }
  };

  // Clean up function
  useEffect(() => {
    return () => {
      if (uploadTask && state === 'uploading') {
        uploadTask.cancel();
      }
    };
  }, [uploadTask, state]);

  return { 
    uploadFile, 
    cancelUpload, 
    state, 
    progress: uploadProgress, 
    downloadUrl, 
    error 
  };
};