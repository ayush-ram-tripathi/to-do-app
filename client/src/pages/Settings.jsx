import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ArrowLeft, User, Shield, Bell, Palette } from 'lucide-react';

const Settings = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1a1b26] p-6 md:p-12 transition-colors">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Settings Sidebar */}
          <div className="md:col-span-1 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-lg font-medium text-left">
              <User className="w-5 h-5" />
              Profile
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium text-left transition-colors">
              <Palette className="w-5 h-5" />
              Appearance
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium text-left transition-colors">
              <Bell className="w-5 h-5" />
              Notifications
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium text-left transition-colors">
              <Shield className="w-5 h-5" />
              Security
            </button>
          </div>

          {/* Settings Content */}
          <div className="md:col-span-3 space-y-6">
            
            {/* Profile Section */}
            <div className="bg-white dark:bg-[#1f2028] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Profile Information</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {user?.name ? user.name.substring(0, 2).toUpperCase() : 'U'}
                </div>
                <div>
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm">
                    Change Avatar
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    readOnly
                    value={user?.name || ''}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#16171d] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white opacity-70 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    readOnly
                    value={user?.email || ''}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#16171d] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white opacity-70 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-2">Email address cannot be changed currently.</p>
                </div>
              </div>
            </div>

            {/* Plan Section */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl shadow-md text-white">
              <h2 className="text-xl font-semibold mb-2">Pro Plan Subscription</h2>
              <p className="text-purple-100 text-sm mb-6">You are currently on the free plan. Upgrade to unlock unlimited projects, team collaboration, and more.</p>
              <button className="px-5 py-2.5 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                Upgrade Now
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
