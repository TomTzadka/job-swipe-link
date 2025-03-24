
import React, { useState, useEffect } from 'react';
import { Card, CardDataProps } from './Card';
import { UserFilters } from './UserFilters';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface CardStackProps {
  userType: 'worker' | 'employer';
}

// Sample data for workers and employers
const sampleWorkers: CardDataProps[] = [
  {
    id: 'w1',
    name: 'Alex Johnson',
    location: 'San Francisco, CA',
    jobType: 'Construction',
    availability: 'Weekdays',
    skills: ['Carpentry', 'Plumbing', 'Electrical'],
    description: 'Experienced construction worker with 5+ years in residential and commercial projects. Reliable and hard-working with excellent references.',
    phone: '(415) 555-1234',
    profileImage: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHdvcmtlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'w2',
    name: 'Maria Garcia',
    location: 'Los Angeles, CA',
    jobType: 'Housekeeping',
    availability: 'Flexible',
    skills: ['Deep Cleaning', 'Organization', 'Pet-Friendly'],
    description: 'Detail-oriented housekeeper with experience in both residential and hotel settings. Available for one-time or recurring jobs.',
    phone: '(213) 555-5678',
    profileImage: 'https://images.unsplash.com/photo-1573497019418-b400bb3ab074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmVtYWxlJTIwd29ya2VyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'w3',
    name: 'David Smith',
    location: 'Chicago, IL',
    jobType: 'Moving',
    availability: 'Weekends',
    skills: ['Heavy Lifting', 'Packing', 'Driving'],
    description: 'Strong and reliable mover with a clean driving record. Can handle all aspects of residential and office moves.',
    phone: '(312) 555-9012',
    profileImage: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbGUlMjB3b3JrZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  },
];

const sampleEmployers: CardDataProps[] = [
  {
    id: 'e1',
    name: 'Acme Construction',
    location: 'San Francisco, CA',
    jobType: 'Construction',
    availability: 'Full-time',
    skills: ['Framing', 'Drywall', 'Finishing'],
    description: 'Looking for experienced construction workers for a 3-month residential project. Competitive daily pay with potential for ongoing work.',
    phone: '(415) 555-9876',
    profileImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29uc3RydWN0aW9uJTIwY29tcGFueXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'e2',
    name: 'Green Thumb Landscaping',
    location: 'Seattle, WA',
    jobType: 'Landscaping',
    availability: 'Seasonal',
    skills: ['Gardening', 'Lawn Care', 'Irrigation'],
    description: 'Seeking landscapers for spring and summer season. Experience with commercial properties preferred but not required.',
    phone: '(206) 555-4321',
    profileImage: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBpbmclMjBjb21wYW55fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'e3',
    name: 'Speedy Movers Inc.',
    location: 'Boston, MA',
    jobType: 'Moving',
    availability: 'On-demand',
    skills: ['Furniture Assembly', 'Packing', 'Heavy Lifting'],
    description: 'Looking for reliable movers who can work on-demand. Must be able to lift 50+ pounds and have a valid driver\'s license.',
    phone: '(617) 555-8765',
    profileImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aW5nJTIwY29tcGFueXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
];

export const CardStack: React.FC<CardStackProps> = ({ userType }) => {
  const [cards, setCards] = useState<CardDataProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    jobType: ''
  });

  useEffect(() => {
    // Simulate loading data from an API
    setLoading(true);
    setTimeout(() => {
      setCards(userType === 'worker' ? sampleEmployers : sampleWorkers);
      setLoading(false);
    }, 1500);
  }, [userType]);

  const handleSwipe = (direction: 'left' | 'right', id: string) => {
    // In a real app, you would handle matches and store user preferences here
    console.log(`Swiped ${direction} on ${id}`);
    
    setCards((prevCards) => {
      // If swiped right, this would be a "match" in a real app
      if (direction === 'right') {
        // You could trigger match logic here
      }
      
      // Remove the card from the stack
      const updatedCards = prevCards.filter(card => card.id !== id);
      
      // If no cards left, you could reload or show a message
      if (updatedCards.length === 0) {
        setTimeout(() => {
          setCards(userType === 'worker' ? sampleEmployers : sampleWorkers);
        }, 1000);
      }
      
      return updatedCards;
    });
  };

  const handleFilterChange = (newFilters: {location: string, jobType: string}) => {
    setFilters(newFilters);
    
    // In a real app, you would fetch filtered data from an API
    // For now, we'll simulate filtering with timeout
    setLoading(true);
    setTimeout(() => {
      const dataSource = userType === 'worker' ? sampleEmployers : sampleWorkers;
      
      // Apply filters
      let filteredCards = dataSource;
      
      if (newFilters.location) {
        filteredCards = filteredCards.filter(card => 
          card.location.toLowerCase().includes(newFilters.location.toLowerCase())
        );
      }
      
      if (newFilters.jobType) {
        filteredCards = filteredCards.filter(card => 
          card.jobType.toLowerCase().includes(newFilters.jobType.toLowerCase())
        );
      }
      
      setCards(filteredCards);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col">
      <UserFilters onFilterChange={handleFilterChange} />
      
      <div className="flex-grow relative flex items-center justify-center p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center space-y-3">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <p className="text-muted-foreground">Finding matches...</p>
          </div>
        ) : cards.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-6"
          >
            <h3 className="text-xl font-semibold mb-2">No matches found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or check back later</p>
          </motion.div>
        ) : (
          <div className="relative w-full h-[70vh] max-h-[600px]">
            <AnimatePresence>
              {cards.map((card, index) => (
                <Card 
                  key={card.id}
                  data={card}
                  onSwipe={handleSwipe}
                  isCurrent={index === 0}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
