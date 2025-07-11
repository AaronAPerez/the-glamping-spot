import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Settings, Mail, Bell, Smartphone } from 'lucide-react';

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    inAppNotifications: true,
    notifyOnNewBookings: true,
    notifyOnCancellations: true,
    notifyOnContactForm: true,
    notifyOnPayments: true,
    dailySummary: true,
    adminEmails: ['admin@theglampingspot.com'],
    adminPhones: [''],
  });
  
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  
  // Load settings from Firestore
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settingsDoc = await getDoc(doc(db, 'adminSettings', 'notifications'));
        
        if (settingsDoc.exists()) {
          setSettings(settingsDoc.data() as any);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading notification settings:', error);
        setLoading(false);
      }
    };
    
    loadSettings();
  }, []);
  
  // Save settings to Firestore
  const saveSettings = async () => {
    setSaveStatus('saving');
    
    try {
      await updateDoc(doc(db, 'adminSettings', 'notifications'), settings);
      setSaveStatus('success');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('Error saving notification settings:', error);
      setSaveStatus('error');
    }
  };
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Handle email list changes
  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...settings.adminEmails];
    newEmails[index] = value;
    
    setSettings(prev => ({
      ...prev,
      adminEmails: newEmails
    }));
  };
  
  // Add new email field
  const addEmailField = () => {
    setSettings(prev => ({
      ...prev,
      adminEmails: [...prev.adminEmails, '']
    }));
  };
  
  // Remove email field
  const removeEmailField = (index: number) => {
    const newEmails = [...settings.adminEmails];
    newEmails.splice(index, 1);
    
    setSettings(prev => ({
      ...prev,
      adminEmails: newEmails
    }));
  };
  
  if (loading) {
    return <div className="p-8 text-center">Loading notification settings...</div>;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <Settings className="h-6 w-6 text-emerald-600 mr-2" />
        <h2 className="text-xl font-semibold">Notification Settings</h2>
      </div>
      
      <form onSubmit={(e) => { e.preventDefault(); saveSettings(); }}>
        <div className="space-y-6">
          {/* Notification Methods */}
          <div>
            <h3 className="text-lg font-medium mb-4">Notification Methods</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="emailNotifications"
                  name="emailNotifications"
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="emailNotifications" className="ml-2 flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-2" />
                  <span>Email Notifications</span>
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="smsNotifications"
                  name="smsNotifications"
                  type="checkbox"
                  checked={settings.smsNotifications}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="smsNotifications" className="ml-2 flex items-center">
                  <Smartphone className="h-5 w-5 text-gray-500 mr-2" />
                  <span>SMS Notifications</span>
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="inAppNotifications"
                  name="inAppNotifications"
                  type="checkbox"
                  checked={settings.inAppNotifications}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="inAppNotifications" className="ml-2 flex items-center">
                  <Bell className="h-5 w-5 text-gray-500 mr-2" />
                  <span>In-App Notifications</span>
                </label>
              </div>
            </div>
          </div>
          
          {/* Notification Events */}
          <div>
            <h3 className="text-lg font-medium mb-4">Notification Events</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="notifyOnNewBookings"
                  name="notifyOnNewBookings"
                  type="checkbox"
                  checked={settings.notifyOnNewBookings}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="notifyOnNewBookings" className="ml-2">
                  New Bookings
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="notifyOnCancellations"
                  name="notifyOnCancellations"
                  type="checkbox"
                  checked={settings.notifyOnCancellations}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="notifyOnCancellations" className="ml-2">
                  Cancellations
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="notifyOnContactForm"
                  name="notifyOnContactForm"
                  type="checkbox"
                  checked={settings.notifyOnContactForm}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="notifyOnContactForm" className="ml-2">
                  Contact Form Submissions
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="notifyOnPayments"
                  name="notifyOnPayments"
                  type="checkbox"
                  checked={settings.notifyOnPayments}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="notifyOnPayments" className="ml-2">
                  Payment Events
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="dailySummary"
                  name="dailySummary"
                  type="checkbox"
                  checked={settings.dailySummary}
                  onChange={handleChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="dailySummary" className="ml-2">
                  Daily Summary Report
                </label>
              </div>
            </div>
          </div>

            {/* Admin Notification Recipients */}
            <div>
            <h3 className="text-lg font-medium mb-4">Admin Notification Recipients</h3>
            
            {/* Email Recipients */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Recipients
              </label>
              
              {settings.adminEmails.map((email, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                    className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="admin@example.com"
                  />
                  <button
                    type="button"
                    onClick={() => removeEmailField(index)}
                    className="ml-2 p-2 text-red-600 hover:text-red-800"
                    aria-label="Remove email"
                    disabled={settings.adminEmails.length <= 1}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addEmailField}
                className="mt-2 text-sm text-emerald-600 hover:text-emerald-700 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Email
              </button>
            </div>
            
            {/* SMS Recipients (if SMS is enabled) */}
            {settings.smsNotifications && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SMS Recipients (Phone Numbers)
                </label>
                
                {settings.adminPhones.map((phone, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        const newPhones = [...settings.adminPhones];
                        newPhones[index] = e.target.value;
                        setSettings(prev => ({
                          ...prev,
                          adminPhones: newPhones
                        }));
                      }}
                      className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="+1 (555) 555-5555"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newPhones = [...settings.adminPhones];
                        newPhones.splice(index, 1);
                        setSettings(prev => ({
                          ...prev,
                          adminPhones: newPhones
                        }));
                      }}
                      className="ml-2 p-2 text-red-600 hover:text-red-800"
                      aria-label="Remove phone number"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={() => {
                    setSettings(prev => ({
                      ...prev,
                      adminPhones: [...prev.adminPhones, '']
                    }));
                  }}
                  className="mt-2 text-sm text-emerald-600 hover:text-emerald-700 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Phone Number
                </button>
              </div>
            )}
          </div>
          
          {/* Email Templates Configuration */}
          <div>
            <h3 className="text-lg font-medium mb-4">Email Template Settings</h3>
            <p className="text-sm text-gray-500 mb-4">
              Configure the appearance and content of notification emails.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-md p-4">
                <h4 className="font-medium mb-2">Email Branding</h4>
                <div>
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                    Site Name
                  </label>
                  <input
                    id="siteName"
                    name="siteName"
                    type="text"
                    defaultValue="The Glamping Spot"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div className="mt-3">
                  <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Logo URL
                  </label>
                  <input
                    id="logoUrl"
                    name="logoUrl"
                    type="url"
                    defaultValue="/images/TheGlampingSpot.png"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div className="mt-3">
                  <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Color
                  </label>
                  <div className="flex">
                    <input
                      id="primaryColor"
                      name="primaryColor"
                      type="color"
                      defaultValue="#10b981"
                      className="h-9 w-9 border-gray-300 rounded-md shadow-sm"
                    />
                    <input
                      type="text"
                      defaultValue="#10b981"
                      className="ml-2 flex-1 border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-md p-4">
                <h4 className="font-medium mb-2">Footer Information</h4>
                <div>
                  <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Address
                  </label>
                  <input
                    id="companyAddress"
                    name="companyAddress"
                    type="text"
                    defaultValue="123 Glamping Road, Modesto, CA 95123"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div className="mt-3">
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Email
                  </label>
                  <input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    defaultValue="info@theglampingspot.com"
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                
                <div className="mt-3 flex items-center">
                  <input
                    id="includeSocialLinks"
                    name="includeSocialLinks"
                    type="checkbox"
                    defaultChecked={true}
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                  />
                  <label htmlFor="includeSocialLinks" className="ml-2 text-sm text-gray-700">
                    Include social media links
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <button
                type="button"
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                onClick={() => window.location.href = '/admin/notification-templates'}
              >
                Manage Email Templates →
              </button>
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="mt-8 flex items-center justify-end">
          <div className="mr-4">
            {saveStatus === 'success' && (
              <span className="text-green-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Settings saved successfully!
              </span>
            )}
            
            {saveStatus === 'error' && (
              <span className="text-red-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Error saving settings. Please try again.
              </span>
            )}
          </div>
          
          <button
            type="button"
            className="mr-3 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            onClick={() => window.location.reload()}
          >
            Cancel
          </button>
          
          <button
            type="submit"
            className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 flex items-center"
            disabled={saveStatus === 'saving'}
          >
            {saveStatus === 'saving' ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save Settings'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
    