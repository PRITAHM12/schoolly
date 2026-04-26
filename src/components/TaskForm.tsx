import React, { useState } from 'react';
import { 
  collection, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, handleFirestoreError } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { TaskStatus, TaskPriority, OperationType } from '../types';
import { Plus, X } from 'lucide-react';

export function TaskForm({ onComplete }: { onComplete: () => void }) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !title.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'tasks'), {
        title: title.trim(),
        description: description.trim(),
        priority,
        status: TaskStatus.TODO,
        ownerId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setTitle('');
      setDescription('');
      onComplete();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'tasks');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Grade Midterm Papers"
          className="input-primary"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about this task..."
          className="input-primary min-h-[100px] resize-none"
        />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select 
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="input-primary"
          >
            <option value={TaskPriority.LOW}>Low</option>
            <option value={TaskPriority.MEDIUM}>Medium</option>
            <option value={TaskPriority.HIGH}>High</option>
          </select>
        </div>
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        {loading ? 'Creating...' : <><Plus className="w-5 h-5" /> Create Task</>}
      </button>
    </form>
  );
}
