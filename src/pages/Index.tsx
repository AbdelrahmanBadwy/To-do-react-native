
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { Task } from '@/components/TaskItem';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import Header from '@/components/Header';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'tasks';
const CATEGORIES = ['work', 'personal', 'shopping', 'health'];

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const { toast } = useToast();
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);
  
  const handleAddTask = (title: string, category?: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      completed: false,
      category,
    };
    
    setTasks(prevTasks => [newTask, ...prevTasks]);
    
    toast({
      title: "Task added",
      description: title,
      duration: 2000,
    });
  };
  
  const handleToggleTask = (id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed } 
          : task
      )
    );
  };
  
  const handleDeleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    
    toast({
      title: "Task deleted",
      description: taskToDelete?.title,
      duration: 2000,
    });
  };
  
  const handleEditTask = (id: string, newTitle: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { ...task, title: newTitle } 
          : task
      )
    );
    
    toast({
      title: "Task updated",
      description: newTitle,
      duration: 2000,
    });
  };
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-b from-background to-secondary/30 pb-16"
      >
        <div className="container max-w-lg mx-auto p-4 sm:p-6">
          <Header 
            title="Clarity Tasks" 
            description="A beautifully simple to-do list to organize your tasks with ease."
          />
          
          <TaskForm onAddTask={handleAddTask} categories={CATEGORIES} />
          
          <TaskList 
            tasks={tasks} 
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
          
          {tasks.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-center text-xs text-muted-foreground"
            >
              <p>Your tasks are saved locally in your browser</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
