
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  description?: string;
}

const Header: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8 text-center"
    >
      <span className="inline-block text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full mb-2">
        Beautifully Simple
      </span>
      <h1 className={cn(
        "text-3xl sm:text-4xl font-bold text-foreground mb-2",
        "tracking-tight"
      )}>
        {title}
      </h1>
      {description && (
        <p className="text-muted-foreground max-w-md mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default Header;
