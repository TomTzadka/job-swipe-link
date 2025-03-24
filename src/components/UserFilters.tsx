
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserFiltersProps {
  onFilterChange: (filters: {location: string, jobType: string}) => void;
}

export const UserFilters: React.FC<UserFiltersProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');

  const handleApplyFilters = () => {
    onFilterChange({ location, jobType });
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setLocation('');
    setJobType('');
    onFilterChange({ location: '', jobType: '' });
    setIsOpen(false);
  };

  return (
    <div className="border-b border-border py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">
          Filters
          {(location || jobType) && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
              {(location ? 1 : 0) + (jobType ? 1 : 0)}
            </span>
          )}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Filter className="h-4 w-4" />
          <span>{isOpen ? 'Hide' : 'Show'}</span>
        </Button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="py-3 space-y-3">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Location
                </label>
                <Input
                  placeholder="Enter city or ZIP code"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Job Type
                </label>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Job Types</SelectItem>
                    <SelectItem value="Construction">Construction</SelectItem>
                    <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                    <SelectItem value="Landscaping">Landscaping</SelectItem>
                    <SelectItem value="Moving">Moving</SelectItem>
                    <SelectItem value="Cleaning">Cleaning</SelectItem>
                    <SelectItem value="Delivery">Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 flex-1"
                  onClick={handleClearFilters}
                >
                  <X className="h-4 w-4" />
                  <span>Clear</span>
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
