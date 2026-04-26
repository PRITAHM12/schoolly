import React, { useEffect, useState } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';
import { db, handleFirestoreError } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Task, OperationType } from '../types';
import { TaskItem } from './TaskItem';
import { TaskForm } from './TaskForm';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Plus, ListChecks, X } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'todo' | 'completed'>('all');

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'tasks'),
      where('ownerId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[];
      setTasks(taskData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'tasks');
    });

    return unsubscribe;
  }, [user]);

  const filteredTasks = tasks.filter(t => {
    if (filter === 'todo') return t.status !== 'completed';
    if (filter === 'completed') return t.status === 'completed';
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 min-h-screen">
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight">
            Academic Planner
          </h1>
          <p className="text-gray-500 font-medium">
            Manage your daily school tasks and administrative goals
          </p>
        </div>
        
        <button 
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 py-3"
        >
          <Plus className="w-5 h-5" />
          <span>New Task</span>
        </button>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
          {(['all', 'todo', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${
                filter === f 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="text-sm font-medium text-gray-400">
          Showing {filteredTasks.length} tasks
        </div>
      </div>

      <div className="grid gap-4">
        <AnimatePresence mode='popLayout'>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                <ListChecks className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No tasks yet</h3>
              <p className="text-gray-500 mb-6">Start by adding your first school assignment or plan.</p>
              <button 
                onClick={() => setShowForm(true)}
                className="text-indigo-600 font-bold hover:underline"
              >
                Create your first task
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">Add New Task</h2>
                <button 
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <TaskForm onComplete={() => setShowForm(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
