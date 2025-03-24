
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  userType: 'worker' | 'employer' | null;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ userType, onReset }) => {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="border-b border-border sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80"
    >
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
          <div onClick={onReset} className="cursor-pointer">
            <h2 className="text-lg font-bold">
              JobSwipe
              {userType && (
                <span className="text-xs font-normal ml-2 text-muted-foreground">
                  {userType === 'worker' ? 'Worker View' : 'Employer View'}
                </span>
              )}
            </h2>
          </div>
        </div>
        
        <div>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
