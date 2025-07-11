import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Bell, MailOpen, Calendar, MessageSquare, User, Settings } from 'lucide-react';

interface AdminNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  relatedId?: string;
  actionUrl?: string;
  createdAt: any;
}

export default function AdminNotificationCenter() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Load notifications
  useEffect(() => {
    const notificationsQuery = query(
      collection(db, 'adminNotifications'),
      orderBy('createdAt', 'desc'),
      limit(20)
    );
    
    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      const notificationsData: AdminNotification[] = [];
      let newUnreadCount = 0;
      
      snapshot.forEach((doc) => {
        const notification = { id: doc.id, ...doc.data() } as AdminNotification;
        notificationsData.push(notification);
        
        if (!notification.read) {
          newUnreadCount++;
        }
      });
      
      setNotifications(notificationsData);
      setUnreadCount(newUnreadCount);
    });
    
    return () => unsubscribe();
  }, []);
  
  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      await updateDoc(doc(db, 'adminNotifications', notificationId), {
        read: true
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  
  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const promises = notifications
        .filter(notification => !notification.read)
        .map(notification => 
          updateDoc(doc(db, 'adminNotifications', notification.id), { read: true })
        );
      
      await Promise.all(promises);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };
  
  // Get appropriate icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'new_booking':
        return <Calendar className="h-5 w-5 text-emerald-500" />;
      case 'booking_cancelled':
        return <Calendar className="h-5 w-5 text-red-500" />;
      case 'contact_form':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'user_registration':
        return <User className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div className="relative">
      {/* Notifications Bell */}
      <button 
        className="relative p-2 rounded-full hover:bg-gray-100"
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
      
      {/* Notifications Panel */}
      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                className="text-sm text-emerald-600 hover:text-emerald-800"
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications yet
              </div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => {
                    if (!notification.read) markAsRead(notification.id);
                    if (notification.actionUrl) {
                      window.location.href = notification.actionUrl;
                    }
                  }}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{notification.title}</p>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.createdAt?.toDate().toLocaleString() || 'Just now'}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-2 border-t border-gray-200">
            <button 
              onClick={() => window.location.href = '/admin/notifications'}
              className="text-sm text-center w-full text-gray-600 hover:text-gray-800 p-2"
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}