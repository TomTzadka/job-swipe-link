
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { MapPin, Clock, Briefcase } from 'lucide-react';
import { PhoneReveal } from './PhoneReveal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface CardDataProps {
  id: string;
  name: string;
  location: string;
  jobType: string;
  availability: string;
  skills: string[];
  description: string;
  phone: string;
  profileImage: string;
}

interface CardProps {
  data: CardDataProps;
  onSwipe: (direction: 'left' | 'right', id: string) => void;
  isCurrent: boolean;
}

export const Card: React.FC<CardProps> = ({ data, onSwipe, isCurrent }) => {
  const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);
  const [exitX, setExitX] = useState(0);
  
  // Motion values for the card
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  
  // Determine background opacity based on drag distance
  const opacity = useTransform(
    x,
    [-200, -100, 0, 100, 200],
    [0.8, 0.9, 1, 0.9, 0.8]
  );

  const handlePhoneReveal = () => {
    setIsPhoneRevealed(true);
  };
  
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isCurrent) return;
    
    // Determine if the card was dragged far enough for a swipe
    if (info.offset.x > 100) {
      setExitX(200);
      onSwipe('right', data.id);
    } else if (info.offset.x < -100) {
      setExitX(-200);
      onSwipe('left', data.id);
    }
  };

  // Only apply drag constraints to the current card
  const dragConstraints = isCurrent ? {} : { left: 0, right: 0, top: 0, bottom: 0 };

  return (
    <motion.div
      className={`absolute top-0 left-0 right-0 w-full mx-auto max-w-md h-full swipe-card-container 
        ${isCurrent ? 'z-10 cursor-grab active:cursor-grabbing' : 'z-0 pointer-events-none'}`}
      style={{ x, rotate, opacity }}
      drag={isCurrent}
      dragConstraints={dragConstraints}
      onDragEnd={handleDragEnd}
      animate={{ x: exitX }}
      exit={{ 
        x: exitX,
        opacity: 0,
        transition: { duration: 0.2 }
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-2xl glassmorphism card-shadow">
        <div 
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${data.profileImage})` }}
        />
        
        <div className="p-5 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-balance">{data.name}</h2>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{data.location}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center text-sm">
              <Briefcase className="w-4 h-4 mr-1 text-primary" />
              <span>{data.jobType}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 mr-1 text-primary" />
              <span>{data.availability}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {skill}
              </Badge>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-3">
            {data.description}
          </p>
          
          <div className="pt-2">
            {!isPhoneRevealed ? (
              <PhoneReveal onComplete={handlePhoneReveal} />
            ) : (
              <div className="animate-fade-in flex items-center justify-center p-3 border border-primary/20 bg-primary/5 rounded-lg">
                <a href={`tel:${data.phone}`} className="text-lg font-medium text-primary">
                  {data.phone}
                </a>
              </div>
            )}
          </div>
        </div>
        
        {isCurrent && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 px-5">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full border-2 border-destructive text-destructive"
              onClick={() => onSwipe('left', data.id)}
            >
              ✕
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full border-2 border-primary text-primary"
              onClick={() => onSwipe('right', data.id)}
            >
              ✓
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};
