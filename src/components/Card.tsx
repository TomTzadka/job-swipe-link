
import React from 'react';
import { motion } from 'framer-motion';
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
  const [isPhoneRevealed, setIsPhoneRevealed] = React.useState(false);
  const [startPosition, setStartPosition] = React.useState({ x: 0, y: 0 });
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);

  const handlePhoneReveal = () => {
    setIsPhoneRevealed(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isCurrent) return;
    setStartPosition({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.touches[0].clientX - startPosition.x,
      y: e.touches[0].clientY - startPosition.y,
    });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (offset.x > 100) {
      onSwipe('right', data.id);
    } else if (offset.x < -100) {
      onSwipe('left', data.id);
    } else {
      // Reset position if not swiped enough
      setOffset({ x: 0, y: 0 });
    }
  };

  // Calculate rotation and opacity based on offset
  const rotate = offset.x * 0.1; // Rotate more the further you swipe
  const opacity = Math.max(1 - Math.abs(offset.x) / 400, 0.5);

  return (
    <motion.div
      className={`absolute top-0 left-0 w-full h-full swipe-card-container 
        ${isCurrent ? 'z-10' : 'z-0'}`}
      initial={{ scale: isCurrent ? 1 : 0.9, opacity: isCurrent ? 1 : 0 }}
      animate={{
        scale: isCurrent ? 1 : 0.9,
        opacity: isCurrent ? opacity : 0,
        x: isCurrent ? offset.x : 0,
        y: isCurrent ? offset.y : 0,
        rotate: isCurrent ? rotate : 0,
      }}
      transition={{ type: 'spring', damping: 15, stiffness: 150 }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-full max-w-md mx-auto overflow-hidden rounded-2xl glassmorphism card-shadow">
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
