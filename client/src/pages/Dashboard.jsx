import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Circle, CheckCircle2, Search, Bell, Menu, Plus, Trash2, Calendar as CalendarIcon, Tag, Flag, GripVertical } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggingTaskId, setDraggingTaskId] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('Inbox');
  
  // Expanded form state
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [newTaskCategory, setNewTaskCategory] = useState('General');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');

  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const playSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      oscillator.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.log('Audio not supported', e);
    }
  };

  const showNotification = (title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  };

  useEffect(() => {
    fetchTasks();
    if ('Notification' in window && Notification.permission !== 'denied' && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const { data } = await api.post('/tasks', { 
        title: newTaskTitle,
        description: newTaskDesc,
        priority: newTaskPriority,
        category: newTaskCategory,
        dueDate: newTaskDueDate || undefined,
        // Default status is handled by backend ('Todo')
      });
      setTasks([data, ...tasks]);
      
      // Reset form
      setNewTaskTitle('');
      setNewTaskDesc('');
      setNewTaskPriority('Medium');
      setNewTaskCategory('General');
      setNewTaskDueDate('');
      setShowTaskForm(false);
      
      toast.success('Task added successfully');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  const updateTaskStatus = async (id, newStatus) => {
    const previousTasks = [...tasks];
    const completed = newStatus === 'Done';
    const taskTitle = tasks.find(t => t._id === id)?.title;
    
    // Optimistic UI update
    setTasks(tasks.map((t) => (t._id === id ? { ...t, status: newStatus, completed } : t)));
    
    try {
      const { data } = await api.put(`/tasks/${id}`, { status: newStatus, completed });
      // Update with server response
      setTasks(currentTasks => currentTasks.map((t) => (t._id === id ? data : t)));

      if (completed && newStatus !== previousTasks.find(t => t._id === id)?.status) {
        playSound();
        showNotification('Task Completed! 🎉', taskTitle);
      }
    } catch (error) {
      toast.error('Failed to update task');
      setTasks(previousTasks); // Revert on failure
    }
  };

  const toggleTaskStatus = (id, currentCompleted, currentStatus) => {
    // Determine target status
    let targetStatus = 'Done';
    if (currentCompleted || currentStatus === 'Done') {
      targetStatus = 'Todo';
    }
    updateTaskStatus(id, targetStatus);
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleDragStart = (e, id) => {
    setDraggingTaskId(id);
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
      if (e.target) e.target.classList.add('opacity-50');
    }, 0);
  };

  const handleDragEnd = (e) => {
    if (e.target) e.target.classList.remove('opacity-50');
    setDraggingTaskId(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    if (draggingTaskId) {
      const task = tasks.find(t => t._id === draggingTaskId);
      const currentStatus = task?.status || (task?.completed ? 'Done' : 'Todo');
      if (currentStatus !== newStatus) {
        updateTaskStatus(draggingTaskId, newStatus);
      }
    }
  };

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderTaskCard = (task) => (
    <div 
      key={task._id} 
      draggable
      onDragStart={(e) => handleDragStart(e, task._id)}
      onDragEnd={handleDragEnd}
      className={`group flex items-start gap-3 p-4 bg-white dark:bg-[#1f2028] rounded-xl border border-gray-100 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-900/50 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing ${task.completed ? 'opacity-75' : ''}`}
    >
      <div className="mt-1 text-gray-300 hover:text-purple-500 dark:text-gray-600 dark:hover:text-purple-400 shrink-0 cursor-move">
        <GripVertical className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`text-sm font-semibold text-gray-900 dark:text-gray-100 break-words ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
        {task.description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 break-words">{task.description}</p>}
        
        {/* Task Meta Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {/* Priority Badge */}
          <span className={`flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md ${
            task.priority === 'High' ? 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400' :
            task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400' :
            'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
          }`}>
            <Flag className="w-3 h-3" />
            {task.priority}
          </span>
          
          {/* Category Badge */}
          <span className="flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2 py-1 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 rounded-md">
            <Tag className="w-3 h-3" />
            {task.category || 'General'}
          </span>
          
          {/* Due Date Badge */}
          {task.dueDate && (
            <span className={`flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md ${
              new Date(task.dueDate) < new Date() && !task.completed ? 'bg-red-50 text-red-500 dark:bg-red-500/5' : 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400'
            }`}>
              <CalendarIcon className="w-3 h-3" />
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>
      <button onClick={() => toggleTaskStatus(task._id, task.completed, task.status)} className="p-2 text-gray-300 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-lg transition-all shrink-0">
        {task.completed || task.status === 'Done' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5" />}
      </button>
      <button onClick={() => deleteTask(task._id)} className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all shrink-0">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-white dark:bg-[#1a1b26]">
      <Sidebar activeFilter={currentFilter} onFilterChange={setCurrentFilter} />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Top Header */}
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 bg-white/50 dark:bg-[#1a1b26]/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Kanban Board</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search tasks..." 
                className="w-64 pl-10 pr-4 py-2 bg-gray-100 dark:bg-[#16171d] border-transparent focus:bg-white dark:focus:bg-[#1f2028] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-lg text-sm transition-all outline-none dark:text-white"
              />
            </div>
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full border-2 border-white dark:border-[#1a1b26]"></span>
            </button>
          </div>
        </header>

        {/* Task List Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-full h-full flex flex-col">
            
            {/* Add Task Component */}
            <div className="w-full max-w-3xl mb-8">
              {!showTaskForm ? (
                <button 
                  onClick={() => setShowTaskForm(true)}
                  className="w-full flex items-center gap-3 p-4 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 bg-white dark:bg-[#1f2028] border border-transparent hover:border-purple-200 dark:hover:border-purple-900/50 rounded-xl transition-all shadow-sm hover:shadow-md text-left"
                >
                  <Plus className="w-5 h-5" />
                  <span className="text-base font-medium">Add a new task...</span>
                </button>
              ) : (
                <form onSubmit={handleAddTask} className="p-4 bg-white dark:bg-[#1f2028] border border-purple-200 dark:border-purple-900/50 rounded-xl shadow-md transition-all">
                  <input 
                    type="text" 
                    autoFocus
                    placeholder="Task title (e.g., Pay electricity bill)" 
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full bg-transparent text-gray-900 dark:text-white text-lg font-medium outline-none placeholder-gray-400 mb-2"
                  />
                  <input 
                    type="text" 
                    placeholder="Description (optional)" 
                    value={newTaskDesc}
                    onChange={(e) => setNewTaskDesc(e.target.value)}
                    className="w-full bg-transparent text-gray-500 dark:text-gray-400 text-sm outline-none placeholder-gray-400 mb-4"
                  />
                  
                  {/* Advanced Options Bar */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {/* Due Date */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-[#16171d] rounded-lg text-sm text-gray-600 dark:text-gray-300">
                      <CalendarIcon className="w-4 h-4 text-purple-500" />
                      <input 
                        type="date" 
                        value={newTaskDueDate}
                        onChange={(e) => setNewTaskDueDate(e.target.value)}
                        className="bg-transparent outline-none cursor-pointer"
                      />
                    </div>
                    
                    {/* Priority */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-[#16171d] rounded-lg text-sm text-gray-600 dark:text-gray-300">
                      <Flag className={`w-4 h-4 ${newTaskPriority === 'High' ? 'text-red-500' : newTaskPriority === 'Medium' ? 'text-yellow-500' : 'text-blue-500'}`} />
                      <select 
                        value={newTaskPriority} 
                        onChange={(e) => setNewTaskPriority(e.target.value)}
                        className="bg-transparent outline-none cursor-pointer"
                      >
                        <option value="Low">Low Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="High">High Priority</option>
                      </select>
                    </div>
                    
                    {/* Category */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-[#16171d] rounded-lg text-sm text-gray-600 dark:text-gray-300">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <select 
                        value={newTaskCategory} 
                        onChange={(e) => setNewTaskCategory(e.target.value)}
                        className="bg-transparent outline-none cursor-pointer"
                      >
                        <option value="General">General</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Learning">Learning</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <button 
                      type="button" 
                      onClick={() => setShowTaskForm(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={!newTaskTitle.trim()}
                      className="px-5 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors"
                    >
                      Add Task
                    </button>
                  </div>
                </form>
              )}
            </div>

            {loading ? (
              <div className="flex justify-center p-8">
                <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="flex gap-6 overflow-x-auto pb-4 flex-1">
                {/* Columns */}
                {['Todo', 'In Progress', 'Done'].map(status => {
                  let filteredTasks = tasks;
                  
                  // Apply sidebar filter
                  if (currentFilter === 'Today') {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    
                    filteredTasks = filteredTasks.filter(t => {
                      if (!t.dueDate) return false;
                      const dueDate = new Date(t.dueDate);
                      return dueDate >= today && dueDate < tomorrow;
                    });
                  } else if (currentFilter === 'Upcoming') {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    
                    filteredTasks = filteredTasks.filter(t => {
                      if (!t.dueDate) return false;
                      const dueDate = new Date(t.dueDate);
                      return dueDate >= tomorrow;
                    });
                  } else if (['Work', 'Personal', 'Learning'].includes(currentFilter)) {
                    filteredTasks = filteredTasks.filter(t => t.category === currentFilter);
                  }
                  
                  const columnTasks = filteredTasks.filter(t => (t.status || (t.completed ? 'Done' : 'Todo')) === status);
                  return (
                    <div 
                      key={status} 
                      className="flex flex-col min-w-[320px] w-1/3 bg-gray-50/50 dark:bg-[#16171d]/30 rounded-2xl border border-gray-200 dark:border-gray-800/80 p-4"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, status)}
                    >
                      <div className="flex items-center justify-between mb-4 px-1">
                        <h2 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          {status === 'Todo' && <Circle className="w-4 h-4 text-blue-500" />}
                          {status === 'In Progress' && <Circle className="w-4 h-4 text-yellow-500 fill-yellow-500/20" />}
                          {status === 'Done' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                          {status}
                        </h2>
                        <span className="text-xs bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full font-medium">
                          {columnTasks.length}
                        </span>
                      </div>
                      
                      <div className="flex flex-col gap-3 flex-1 overflow-y-auto min-h-[150px] custom-scrollbar pb-2">
                        {columnTasks.map(task => renderTaskCard(task))}
                        {columnTasks.length === 0 && (
                          <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl text-gray-400 text-sm">
                            Drop tasks here
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
