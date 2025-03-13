
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Trash2, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category?: string;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  
  const handleToggle = () => {
    onToggle(task.id);
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(task.id);
  };
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };
  
  const handleSubmitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editValue.trim()) {
      onEdit(task.id, editValue);
      setIsEditing(false);
    }
  };
  
  const categoryColors: Record<string, string> = {
    work: 'bg-blue-100 text-blue-800',
    personal: 'bg-purple-100 text-purple-800',
    shopping: 'bg-green-100 text-green-800',
    health: 'bg-red-100 text-red-800',
    default: 'bg-gray-100 text-gray-800'
  };
  
  const getCategoryColor = (category?: string) => {
    return category && categoryColors[category] ? categoryColors[category] : categoryColors.default;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group flex items-center justify-between p-4 mb-3 rounded-xl glass transition-all",
        task.completed ? "opacity-70" : "opacity-100"
      )}
    >
      <div className="flex items-center flex-1" onClick={handleToggle}>
        <div 
          className={cn(
            "flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-md mr-3 border transition-all duration-200",
            task.completed 
              ? "border-primary bg-primary text-primary-foreground" 
              : "border-muted-foreground/30 hover:border-primary"
          )}
        >
          {task.completed && <Check className="w-4 h-4" />}
        </div>
        
        {isEditing ? (
          <form onSubmit={handleSubmitEdit} className="flex-1">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              autoFocus
              onBlur={handleSubmitEdit}
              className="w-full bg-transparent border-b border-primary/50 focus:border-primary outline-none px-1 py-0.5"
            />
          </form>
        ) : (
          <div className="flex flex-col flex-1">
            <span 
              className={cn(
                "text-sm sm:text-base font-medium transition-all duration-200",
                task.completed ? "line-through text-muted-foreground" : "text-foreground"
              )}
            >
              {task.title}
            </span>
            
            {task.category && (
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full w-fit mt-1",
                getCategoryColor(task.category)
              )}>
                {task.category}
              </span>
            )}
          </div>
        )}
      </div>
      
      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isEditing && (
          <button 
            onClick={handleEdit}
            className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
        <button 
          onClick={handleDelete}
          className="p-1.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskItem;
