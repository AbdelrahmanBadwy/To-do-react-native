
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TaskItem, { Task } from './TaskItem';
import { ChevronDown, ChevronUp, ListFilter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, newTitle: string) => void;
}

type FilterOption = 'all' | 'active' | 'completed';

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onToggleTask, 
  onDeleteTask,
  onEditTask
}) => {
  const [filter, setFilter] = useState<FilterOption>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });
  
  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.length - completedCount;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-medium">Tasks</h2>
          <div className="text-xs font-medium bg-secondary text-muted-foreground px-2 py-0.5 rounded-md">
            {tasks.length}
          </div>
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ListFilter className="w-4 h-4 mr-1" />
          Filter
          {showFilters ? (
            <ChevronUp className="w-4 h-4 ml-1" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-1" />
          )}
        </button>
      </div>
      
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between bg-secondary/50 p-3 rounded-lg"
          >
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={cn(
                  "text-xs px-3 py-1 rounded-full transition-colors",
                  filter === 'all' 
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                )}
              >
                All ({tasks.length})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={cn(
                  "text-xs px-3 py-1 rounded-full transition-colors",
                  filter === 'active' 
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                )}
              >
                Active ({activeCount})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={cn(
                  "text-xs px-3 py-1 rounded-full transition-colors",
                  filter === 'completed' 
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                )}
              >
                Completed ({completedCount})
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {filteredTasks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-8 text-center text-muted-foreground"
          >
            <p>No tasks found</p>
          </motion.div>
        ) : (
          <div className="space-y-1">
            <AnimatePresence>
              {filteredTasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={onToggleTask}
                  onDelete={onDeleteTask}
                  onEdit={onEditTask}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
