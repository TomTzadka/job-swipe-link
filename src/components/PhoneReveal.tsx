
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface PhoneRevealProps {
  onComplete: () => void;
}

export const PhoneReveal: React.FC<PhoneRevealProps> = ({ onComplete }) => {
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (isAdPlaying) {
      // Start the 5-second countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setTimeout(() => {
              setIsAdPlaying(false);
              onComplete();
              toast({
                title: "Contact Revealed",
                description: "You can now contact this person directly.",
              });
            }, 500);
            return 0;
          }
          return prev - 1;
        });
        
        setProgress((prev) => {
          const newProgress = prev + 20;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isAdPlaying, onComplete]);

  const startAd = () => {
    setIsAdPlaying(true);
    setProgress(0);
    setCountdown(5);
  };

  return (
    <>
      <Button 
        onClick={startAd} 
        className="w-full bg-primary hover:bg-primary/90 text-white"
      >
        Reveal Contact Number
      </Button>

      <Dialog open={isAdPlaying} onOpenChange={(open) => {
        // Prevent dialog from closing early if user tries to close it
        if (!open && countdown > 0) {
          return;
        }
        setIsAdPlaying(open);
      }}>
        <DialogContent className="sm:max-w-md flex flex-col items-center justify-center p-6 space-y-6">
          <h3 className="text-xl font-semibold">Watch Ad to Reveal Number</h3>
          
          <div className="w-full h-40 bg-muted rounded-lg flex items-center justify-center overflow-hidden relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 0.8, 0.5], y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
            </motion.div>
            <div className="z-10 text-white text-lg font-medium">
              Advertisement
            </div>
          </div>
          
          <div className="w-full flex items-center justify-center flex-col">
            <div className="relative w-24 h-24">
              <svg className="progress-ring w-24 h-24">
                <circle
                  className="text-muted stroke-current"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="44"
                  cy="44"
                />
                <circle
                  className="text-primary stroke-current"
                  strokeWidth="8"
                  strokeDasharray={251.2}
                  strokeDashoffset={251.2 - (251.2 * progress) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="44"
                  cy="44"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold">
                {countdown}
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Contact number will be revealed in {countdown} seconds
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
