
import React, { useState } from 'react';
import { UserTypeSelector } from '@/components/UserTypeSelector';
import { CardStack } from '@/components/CardStack';
import { Navbar } from '@/components/Navbar';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const [userType, setUserType] = useState<'worker' | 'employer' | null>(null);

  const handleUserTypeSelect = (type: 'worker' | 'employer') => {
    setUserType(type);
  };

  const handleReset = () => {
    setUserType(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar userType={userType} onReset={handleReset} />
      
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          {userType === null ? (
            <motion.div
              key="selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <UserTypeSelector onSelect={handleUserTypeSelect} />
            </motion.div>
          ) : (
            <motion.div
              key="card-stack"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <CardStack userType={userType} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
