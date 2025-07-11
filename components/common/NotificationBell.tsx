'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { Bell } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) return;
    
    // Subscribe to user's notifications
    const notificationsQuery = query(
      collection(db, 'notifications'),
      where('userId', '==', user.uid),
      where('read', '==', false),
      orderBy('createdAt', 'desc'),
      limit(10)
    );
    
    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      const notificationsData = [];
      
      snapshot.forEach((doc) => {
        notificationsData.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setNotifications(notificationsData);
      setUnreadCount(notificationsData.length);
    });
    
    return () => unsubscribe();
  }, [user]);
  
  if (!user) return null;
  
  return (
    <div className="relative">
      <button
        className="p-2 rounded-full hover:bg-gray-100"
        onClick={() => setShowNotifications(!showNotifications)}
        aria-label={`${unreadCount} unread notifications`}
      >
        <Bell className="h-6 w-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      
      {/* Notification dropdown */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-medium">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                className="text-sm text-emerald-600 hover:text-emerald-700"
                onClick={handleMarkAllRead}
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No new notifications
              </div>
            ) : (
              <ul>
                {notifications.map((notification) => (
                  <li 
                    key={notification.id} 
                    className="p-4 border-b border-gray-100 hover:bg-gray-50"
                  >
                    <div 
                      onClick={() => handleNotificationClick(notification)}
                      className="cursor-pointer"
                    >
                      <p className="font-medium text-gray-800">{notification.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {formatTimestamp(notification.createdAt)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="p-3 border-t border-gray-200 text-center">
            <button 
              className="text-sm text-emerald-600 hover:text-emerald-700"
              onClick={() => router.push('/account/notifications')}
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

  // Helper function to mark a notification as read
  const handleNotificationClick = async (notification) => {
    try {
      // Update notification in Firestore
      const notificationRef = doc(db, 'notifications', notification.id);
      await updateDoc(notificationRef, {
        read: true
      });
      
      // Navigate to action URL if present
      if (notification.actionUrl) {
        router.push(notification.actionUrl);
      }
      
      // Close dropdown
      setShowNotifications(false);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  
  // Helper function to mark all notifications as read
  const handleMarkAllRead = async () => {
    try {
      // Update all notifications in batch
      const batch = writeBatch(db);
      
      notifications.forEach((notification) => {
        const notificationRef = doc(db, 'notifications', notification.id);
        batch.update(notificationRef, { read: true });
      });
      
      await batch.commit();
      
      // Close dropdown after marking all as read
      setShowNotifications(false);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };
  
  
  // Helper function to format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    } else if (diffInMinutes < 24 * 60) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (diffInMinutes < 7 * 24 * 60) {
      const days = Math.floor(diffInMinutes / (24 * 60));
      return `${days} day${days === 1 ? '' : 's'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
