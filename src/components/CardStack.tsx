
import React, { useState, useEffect } from 'react';
import { Card, CardDataProps } from './Card';
import { UserFilters } from './UserFilters';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface CardStackProps {
  userType: 'worker' | 'employer';
}

// Sample data for workers and employers
const sampleWorkers: CardDataProps[] = [
  {
    id: 'w4',
    name: 'Samantha Lee',
    location: 'New York, NY',
    jobType: 'Babysitting',
    availability: 'Evenings and Weekends',
    skills: ['Childcare', 'First Aid', 'Homework Help'],
    description: 'Responsible babysitter with 4 years of experience caring for children of all ages. CPR certified and great with pets.',
    phone: '(917) 555-3344',
    profileImage: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'w5',
    name: 'Jamal Carter',
    location: 'Houston, TX',
    jobType: 'Landscaping',
    availability: 'Full-Time',
    skills: ['Lawn Care', 'Tree Trimming', 'Irrigation Systems'],
    description: 'Skilled landscaper with over 6 years of experience maintaining and designing outdoor spaces for homes and businesses.',
    phone: '(713) 555-7890',
    profileImage: 'https://images.unsplash.com/photo-1546525848-3ce03ca516f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'w6',
    name: 'Emily Nguyen',
    location: 'Seattle, WA',
    jobType: 'Pet Sitting',
    availability: 'Weekends',
    skills: ['Dog Walking', 'Feeding', 'Medication Administration'],
    description: 'Animal lover with 3 years of experience caring for cats, dogs, and exotic pets. Reliable and great with anxious animals.',
    phone: '(206) 555-8765',
    profileImage: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'w7',
    name: 'Carlos Mendoza',
    location: 'Miami, FL',
    jobType: 'Painting',
    availability: 'Flexible',
    skills: ['Interior Painting', 'Exterior Painting', 'Surface Prep'],
    description: 'Experienced painter with attention to detail. Specializes in residential repainting and new constructions.',
    phone: '(305) 555-2468',
    profileImage: 'https://images.unsplash.com/photo-1590080875991-3c681d2fcae2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'w8',
    name: 'Aisha Khan',
    location: 'Phoenix, AZ',
    jobType: 'Tutoring',
    availability: 'Afternoons',
    skills: ['Math', 'Science', 'SAT Prep'],
    description: 'Certified tutor with a background in education. Helps students boost their grades and confidence.',
    phone: '(480) 555-6789',
    profileImage: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'w9',
    name: 'Michael Chen',
    location: 'Denver, CO',
    jobType: 'Tech Support',
    availability: 'Remote & On-Site',
    skills: ['PC Repair', 'Networking', 'Software Installation'],
    description: 'Tech-savvy and patient technician ready to solve hardware and software issues for home users and small businesses.',
    phone: '(303) 555-9087',
    profileImage: 'https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'w10',
    name: 'Grace Kim',
    location: 'Boston, MA',
    jobType: 'Elder Care',
    availability: 'Daytime',
    skills: ['Companionship', 'Medication Reminders', 'Meal Prep'],
    description: 'Compassionate caregiver with 5 years of experience supporting seniors with daily activities.',
    phone: '(617) 555-4321',
    profileImage: 'https://images.unsplash.com/photo-1573496780365-e8bcbfd6fd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'w11',
    name: 'Anthony Brown',
    location: 'Atlanta, GA',
    jobType: 'Handyman',
    availability: 'Weekdays',
    skills: ['Repairs', 'Mounting', 'Furniture Assembly'],
    description: 'All-around handyman with quick solutions for home repairs and installations.',
    phone: '(404) 555-0011',
    profileImage: 'https://images.unsplash.com/photo-1618005198919-d3d4b1f26165?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'w12',
    name: 'Isabella Rossi',
    location: 'Las Vegas, NV',
    jobType: 'Event Staffing',
    availability: 'Weekends',
    skills: ['Bartending', 'Serving', 'Setup/Takedown'],
    description: 'Energetic and professional event staff with experience in weddings, parties, and corporate events.',
    phone: '(702) 555-1122',
    profileImage: 'https://images.unsplash.com/photo-1531891437562-4301cf35b7ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'w13',
    name: 'Robert Taylor',
    location: 'Austin, TX',
    jobType: 'Delivery',
    availability: 'Full-Time',
    skills: ['Driving', 'Navigation', 'Customer Service'],
    description: 'Punctual and trustworthy delivery driver with a clean driving record and great reviews.',
    phone: '(512) 555-7788',
    profileImage: 'https://images.unsplash.com/photo-1603415526960-f8f0b3d68997?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'w14',
    name: 'Natalie Brooks',
    location: 'Portland, OR',
    jobType: 'Cleaning',
    availability: 'Mornings',
    skills: ['Eco-Friendly Products', 'Efficiency', 'Attention to Detail'],
    description: 'Green cleaning specialist available for regular and deep cleanings.',
    phone: '(503) 555-4422',
    profileImage: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'w15',
    name: 'Victor Alvarez',
    location: 'San Diego, CA',
    jobType: 'Construction',
    availability: 'Full-Time',
    skills: ['Masonry', 'Roofing', 'Drywall'],
    description: 'Construction worker with a strong background in residential builds and repairs.',
    phone: '(619) 555-0099',
    profileImage: 'https://images.unsplash.com/photo-1599488615732-9273dc4821cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'w16',
    name: 'Lily Thompson',
    location: 'Minneapolis, MN',
    jobType: 'Photography',
    availability: 'Weekends',
    skills: ['Portraits', 'Events', 'Editing'],
    description: 'Freelance photographer offering professional shoots for families, pets, and events.',
    phone: '(612) 555-7766',
    profileImage: 'https://images.unsplash.com/photo-1520975698519-59c91e145d2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'w17',
    name: 'Brian Wilson',
    location: 'Philadelphia, PA',
    jobType: 'Appliance Repair',
    availability: 'Flexible',
    skills: ['Washer/Dryer Repair', 'Fridge Repair', 'Diagnostics'],
    description: 'Certified technician with fast response and long-term solutions for household appliances.',
    phone: '(215) 555-3344',
    profileImage: 'https://images.unsplash.com/photo-1581094651187-26b556aaa1d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'w18',
    name: 'Nina Patel',
    location: 'Dallas, TX',
    jobType: 'Cooking',
    availability: 'Evenings',
    skills: ['Meal Prep', 'Catering', 'Dietary Customization'],
    description: 'Personal chef experienced in various cuisines. Available for meal planning, small events, and weekly prep.',
    phone: '(214) 555-8800',
    profileImage: 'https://images.unsplash.com/photo-1528715471579-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
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
      const initialData = userType === 'worker' ? sampleEmployers : sampleWorkers;
      setCards(initialData);
      setLoading(false);
    }, 1000);
  }, [userType]);

  const handleSwipe = (direction: 'left' | 'right', id: string) => {
    // In a real app, you would handle matches and store user preferences here
    console.log(`Swiped ${direction} on ${id}`);
    
    if (direction === 'right') {
      // This would be a "match" in a real app
      toast({
        title: "It's a match!",
        description: "You've been connected. Reveal the contact to get in touch.",
      });
    }
    
    // Remove the card from the stack
    setCards((prevCards) => {
      const updatedCards = prevCards.filter(card => card.id !== id);
      
      // If no cards left, reload the deck after a delay
      if (updatedCards.length === 0) {
        setLoading(true);
        setTimeout(() => {
          setCards(userType === 'worker' ? sampleEmployers : sampleWorkers);
          setLoading(false);
          toast({
            title: "New matches available",
            description: "We've found more potential matches for you.",
          });
        }, 1500);
      }
      
      return updatedCards;
    });
  };

  const handleFilterChange = (newFilters: {location: string, jobType: string}) => {
    setFilters(newFilters);
    
    // In a real app, you would fetch filtered data from an API
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
      
      if (filteredCards.length === 0) {
        toast({
          variant: "destructive",
          title: "No matches found",
          description: "Try adjusting your filters to see more results."
        });
      }
    }, 1000);
  };

  const resetCards = () => {
    setLoading(true);
    setTimeout(() => {
      setCards(userType === 'worker' ? sampleEmployers : sampleWorkers);
      setLoading(false);
    }, 800);
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
            className="text-center p-6 flex flex-col items-center"
          >
            <h3 className="text-xl font-semibold mb-2">No matches found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or check back later</p>
            <Button onClick={resetCards}>
              Refresh Matches
            </Button>
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
