
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, HardHat } from 'lucide-react';
import { motion } from 'framer-motion';

interface UserTypeSelectorProps {
  onSelect: (type: 'worker' | 'employer') => void;
}

export const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome to Tempi</h1>
        <p className="text-muted-foreground">Select your role to get started</p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="overflow-hidden h-64 cursor-pointer hover:border-primary transition-colors duration-200"
                onClick={() => onSelect('worker')}>
            <CardContent className="p-0 h-full flex flex-col">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-24 flex items-center justify-center">
                <HardHat className="h-12 w-12 text-white" />
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between">
                <h3 className="text-xl font-semibold mb-2">I'm a Worker</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Find employers looking for your skills and availability
                </p>
                <Button className="w-full">
                  Continue as Worker
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="overflow-hidden h-64 cursor-pointer hover:border-primary transition-colors duration-200"
                onClick={() => onSelect('employer')}>
            <CardContent className="p-0 h-full flex flex-col">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-24 flex items-center justify-center">
                <Briefcase className="h-12 w-12 text-white" />
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between">
                <h3 className="text-xl font-semibold mb-2">I'm an Employer</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Find qualified workers available for your job requirements
                </p>
                <Button className="w-full">
                  Continue as Employer
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
