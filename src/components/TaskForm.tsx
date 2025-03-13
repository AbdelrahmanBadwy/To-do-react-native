
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskFormProps {
  onAddTask: (title: string, category?: string) => void;
  categories: string[];
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, categories }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), category);
      setTitle('');
      setCategory(undefined);
      setIsFocused(false); // Close the form after submission
    }
  };
  
  const handlePlusClick = () => {
    setIsFocused(true);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-4 rounded-xl glass mb-6 transition-all duration-300",
        isFocused ? "shadow-md" : "shadow-sm"
      )}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center">
          <div 
            className="flex-shrink-0 w-6 h-6 rounded-md mr-3 border border-primary/30 flex items-center justify-center cursor-pointer"
            onClick={handlePlusClick}
          >
            <Plus className="w-4 h-4 text-primary" />
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 bg-transparent focus:outline-none text-sm sm:text-base"
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              // Only unfocus if there's no text to preserve the expanded view when typing
              if (!title.trim()) {
                setTimeout(() => setIsFocused(false), 100);
              }
            }}
          />
        </div>
        
        {isFocused && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pl-9"
          >
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(category === cat ? undefined : cat)}
                  className={cn(
                    "text-xs px-3 py-1 rounded-full transition-colors",
                    category === cat 
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-secondary text-muted-foreground border border-transparent hover:border-muted-foreground/30"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="bg-primary text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Add Task
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default TaskForm;
