import React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertCircle,
  Trash2,
  ChevronRight
} from 'lucide-react';
import { Task, TaskStatus, TaskPriority, OperationType } from '../types';
import { doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError } from '../lib/firebase';

export const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const toggleStatus = async () => {
    const nextStatus = task.status === TaskStatus.COMPLETED ? TaskStatus.TODO : TaskStatus.COMPLETED;
    try {
      await updateDoc(doc(db, 'tasks', task.id), {
        status: nextStatus,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `tasks/${task.id}`);
    }
  };

  const removeTask = async () => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteDoc(doc(db, 'tasks', task.id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `tasks/${task.id}`);
    }
  };

  const getPriorityColor = (p: TaskPriority) => {
    switch (p) {
      case TaskPriority.HIGH: return 'text-red-600 bg-red-50';
      case TaskPriority.MEDIUM: return 'text-amber-600 bg-amber-50';
      case TaskPriority.LOW: return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`group p-4 bg-white rounded-xl border transition-all ${
        task.status === TaskStatus.COMPLETED ? 'border-gray-100 bg-gray-50/50' : 'border-gray-200 hover:border-indigo-200 hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-4">
        <button 
          onClick={toggleStatus}
          className="mt-1 flex-shrink-0 transition-transform active:scale-90"
        >
          {task.status === TaskStatus.COMPLETED ? (
            <CheckCircle2 className="w-6 h-6 text-green-500 fill-green-50" />
          ) : (
            <Circle className="w-6 h-6 text-gray-300 hover:text-indigo-400" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold truncate ${task.status === TaskStatus.COMPLETED ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            <span className={`text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>
          {task.description && (
            <p className={`text-sm mb-2 line-clamp-2 ${task.status === TaskStatus.COMPLETED ? 'text-gray-300' : 'text-gray-500'}`}>
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-3 text-[10px] text-gray-400 uppercase font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {task.createdAt?.toDate?.() ? task.createdAt.toDate().toLocaleDateString() : 'Just now'}
            </span>
          </div>
        </div>

        <button 
          onClick={removeTask}
          className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 transition-opacity"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
