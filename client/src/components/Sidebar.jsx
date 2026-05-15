import React, { useContext, useState, useEffect } from 'react';
import { 
  Inbox, 
  Calendar, 
  CalendarDays, 
  Hash, 
  Plus, 
  Settings,
  LogOut,
  FolderOpen,
  Moon,
  Sun
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeFilter = 'Inbox', onFilterChange = () => {} }) => {
  const { user, logout } = useContext(AuthContext);
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark' || 
       (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  // Generate initials
  const initials = user?.name ? user.name.substring(0, 2).toUpperCase() : 'U';

  return (
    <div className="w-64 flex-shrink-0 bg-gray-50/50 dark:bg-[#16171d]/80 border-r border-gray-200 dark:border-gray-800 flex flex-col h-full">
      
      {/* User Profile */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
            {initials}
          </div>
          <div className="overflow-hidden">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{user?.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Premium Plan</p>
          </div>
        </div>
        
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="p-2 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors">
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <div className="p-3 flex-1 overflow-y-auto">
        
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 mb-1">
          <Plus className="w-5 h-5" />
          Add Task
        </button>

        <div className="mt-4 space-y-1">
          <NavItem icon={<Inbox className="w-5 h-5 text-blue-500" />} label="Inbox" active={activeFilter === 'Inbox'} onClick={() => onFilterChange('Inbox')} />
          <NavItem icon={<Calendar className="w-5 h-5 text-green-500" />} label="Today" active={activeFilter === 'Today'} onClick={() => onFilterChange('Today')} />
          <NavItem icon={<CalendarDays className="w-5 h-5 text-purple-500" />} label="Upcoming" active={activeFilter === 'Upcoming'} onClick={() => onFilterChange('Upcoming')} />
          <NavItem icon={<FolderOpen className="w-5 h-5 text-yellow-500" />} label="Filters & Labels" active={activeFilter === 'Filters & Labels'} onClick={() => onFilterChange('Filters & Labels')} />
        </div>

        <div className="mt-8">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Projects</h4>
          <div className="space-y-1">
            <NavItem icon={<Hash className="w-5 h-5 text-gray-400" />} label="Work" active={activeFilter === 'Work'} onClick={() => onFilterChange('Work')} />
            <NavItem icon={<Hash className="w-5 h-5 text-gray-400" />} label="Personal" active={activeFilter === 'Personal'} onClick={() => onFilterChange('Personal')} />
            <NavItem icon={<Hash className="w-5 h-5 text-gray-400" />} label="Learning" active={activeFilter === 'Learning'} onClick={() => onFilterChange('Learning')} />
          </div>
        </div>

      </div>

      {/* Footer Settings */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <button 
          onClick={() => navigate('/settings')}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5" />
          Settings
        </button>
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors mt-1"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

    </div>
  );
};

const NavItem = ({ icon, label, count, active, onClick }) => {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      active 
        ? 'bg-gray-100 dark:bg-gray-800/60 text-gray-900 dark:text-gray-100' 
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/40'
    }`}>
      <div className="flex items-center gap-3">
        {icon}
        {label}
      </div>
      {count && (
        <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </button>
  );
}

export default Sidebar;


