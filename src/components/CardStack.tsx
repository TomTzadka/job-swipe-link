
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
    "id": "w1",
    "name": "יוסי כהן",
    "location": "תל אביב, ישראל",
    "jobType": "חשמלאי",
    "availability": "משרה מלאה",
    "skills": ["חיווט", "התקנת לוחות חשמל", "איתור תקלות"],
    "description": "חשמלאי מוסמך עם 5 שנות ניסיון בעבודות חשמל במגזר הפרטי והעסקי. מחפש עבודה יומית בתל אביב והסביבה.",
    "phone": "(050) 123-4567",
    "profileImage": "https://images.unsplash.com/photo-1605902711622-cfb43c4437f2?auto=format&fit=crop&w=500&q=60"
  },
  {
    "id": "w2",
    "name": "מוחמד אבו חמיד",
    "location": "חיפה, ישראל",
    "jobType": "אינסטלטור",
    "availability": "פרילנס",
    "skills": ["התקנת צנרת", "תיקון דליפות", "תחזוקת מערכות מים"],
    "description": "אינסטלטור עם ניסיון של 7 שנים בעבודות תחזוקה ותיקונים. זמין לעבודות יומיות בחיפה והסביבה.",
    "phone": "(052) 234-5678",
    "profileImage": "https://images.unsplash.com/photo-1581092580504-47d3c28f7f81?auto=format&fit=crop&w=500&q=60"
  },
  {
    "id": "w3",
    "name": "דוד לוי",
    "location": "ירושלים, ישראל",
    "jobType": "צבעי",
    "availability": "חלקית",
    "skills": ["צביעה פנימית", "צביעה חיצונית", "הכנת משטחים"],
    "description": "צבעי מקצועי עם ניסיון של 10 שנים. מחפש עבודות צביעה יומיות בירושלים.",
    "phone": "(054) 345-6789",
    "profileImage": "https://images.unsplash.com/photo-1597764693985-93a7b83260ba?auto=format&fit=crop&w=500&q=60"
  },
  {
    "id": "w4",
    "name": "ראמי כיאל",
    "location": "באר שבע, ישראל",
    "jobType": "גגן",
    "availability": "משרה מלאה",
    "skills": ["התקנת רעפים", "תיקון גגות", "איטום"],
    "description": "גגן עם ניסיון של 8 שנים בעבודות התקנה ותיקון גגות. זמין לעבודות יומיות בבאר שבע והסביבה.",
    "phone": "(053) 456-7890",
    "profileImage": "https://images.unsplash.com/photo-1604014238418-6d8f8b37a33e?auto=format&fit=crop&w=500&q=60"
  },
  {
    "id": "w5",
    "name": "אבי מזרחי",
    "location": "אשדוד, ישראל",
    "jobType": "רתך",
    "availability": "פרילנס",
    "skills": ["רתכת MIG", "עבודות פלדה", "קריאת שרטוטים"],
    "description": "רתך מוסמך עם ניסיון של 6 שנים בעבודות מתכת ופלדה. מחפש פרויקטים יומיים באשדוד והסביבה.",
    "phone": "(055) 567-8901",
    "profileImage": "https://images.unsplash.com/photo-1556740772-1a741367b93e?auto=format&fit=crop&w=500&q=60"
  },
  {
    "id": "w6",
    "name": "שרה ברק",
    "location": "נתניה, ישראל",
    "jobType": "טכנאית מיזוג אוויר",
    "availability": "משרה מלאה",
    "skills": ["התקנה", "תחזוקה", "אבחון תקלות"],
    "description": "טכנאית מיזוג אוויר עם 4 שנות ניסיון. מחפשת עבודה יומית בנתניה והסביבה.",
    "phone": "(058) 678-9012",
    "profileImage": "https://images.unsplash.com/photo-1602407294553-6a755bd379d1?auto=format&fit=crop&w=500&q=60"
  },
  {
    "id": "w7",
    "name": "חיים פרץ",
    "location": "ראשון לציון, ישראל",
    "jobType": "מתקין רצפות",
    "availability": "מבוסס פרויקט",
    "skills": ["התקנת אריחים", "פרקט", "ריצוף ויניל"],
    "description": "מתקין רצפות עם 9 שנות ניסיון. זמין לפרויקטים יומיים בראשון לציון והסביבה.",
    "phone": "(057) 789-0123",
    "profileImage": "https://images.unsplash.com/photo-1584559987030-6e56d52fef4e?auto=format&fit=crop&w=500&q=60"
  },
  {
    "id": "w8",
    "name": "ליאורה כהן",
    "location": "אילת, ישראל",
    "jobType": "מתקינת מערכות סולאריות",
    "availability": "משרה מלאה",
    "skills": ["התקנת פאנלים", "עבודות גובה", "חיווט"],
    "description": "מתקינת מערכות סולאריות עם 3 שנות ניסיון. מחפשת עבודה יומית באילת.",
    "phone": "(056) 890-1234",
    "profileImage": "https://images.unsplash.com/photo-1581090406994-9fe5b6c5a4e0?auto=format&fit=crop&w=500&q=60"
  },
  
];

const sampleEmployers: CardDataProps[] = [
  {
    "id": "e3",
    "name": " ארה אוהלים ומבני מתיחה",
    "location": "גינתון, ישראל",
    "jobType": "התקנה ופירוק",
    "availability": "עבודה יומית",
    "skills": ["חיווט", "ריתוך", "בנייה"],
    "description": "דרושים עובדים שבאים לעבוד ולא לזיין בשכל. תנאים טובים למתאימים.",
    "phone": "(03) 555-3344",
    "profileImage": "https://ar-a.co.il/wp-content/uploads/2024/12/logo-heb-300x217x.webp"
  },
  {
    "id": "e4",
    "name": "חשמלאים מובילים",
    "location": "תל אביב, ישראל",
    "jobType": "חשמלאות",
    "availability": "משרה מלאה",
    "skills": ["חיווט", "התקנת לוחות חשמל", "איתור תקלות"],
    "description": "דרושים חשמלאים מוסמכים לעבודות חשמל במגזר הפרטי והעסקי. תנאים טובים למתאימים.",
    "phone": "(03) 555-3344",
    "profileImage": "https://images.unsplash.com/photo-1605902711622-cfb43c4437f2?auto=format&fit=crop&w=500&q=60"
  },
  {
    "id": "e5",
    "name": "אינסטלטורים מקצועיים",
    "location": "חיפה, ישראל",
    "jobType": "אינסטלציה",
    "availability": "פרילנס",
    "skills": ["התקנת צנרת", "תיקון דליפות", "תחזוקת מערכות מים"],
    "description": "מחפשים אינסטלטורים עם ניסיון לעבודות תחזוקה ותיקונים. עבודה על בסיס יומי.",
    "phone": "(04) 555-2233",
    "profileImage": "https://images.unsplash.com/photo-1581092580504-47d3c28f7f81?auto=format&fit=crop&w=500&q=60"
  },
  {
    "id": "e6",
    "name": "צבעים מומחים",
    "location": "ירושלים, ישראל",
    "jobType": "צביעה",
    "availability": "חלקית",
    "skills": ["צביעה פנימית", "צביעה חיצונית", "הכנת משטחים"],
    "description": "דרושים צבעים לעבודות צביעה במבנים פרטיים וציבוריים. שכר יומי ותנאים טובים.",
    "phone": "(02) 555-9988",
    "profileImage": "https://images.unsplash.com/photo-1597764693985-93a7b83260ba?auto=format&fit=crop&w=500&q=60"
  },
  {
    "id": "e7",
    "name": "גגנים מקצועיים",
    "location": "באר שבע, ישראל",
    "jobType": "עבודות גג",
    "availability": "משרה מלאה",
    "skills": ["התקנת רעפים", "תיקון גגות", "איטום"],
    "description": "דרושים גגנים עם ניסיון לעבודות התקנה ותיקון גגות. עבודה על בסיס יומי.",
    "phone": "(08) 555-7744",
    "profileImage": "https://images.unsplash.com/photo-1604014238418-6d8f8b37a33e?auto=format&fit=crop&w=500&q=60"
  },
  {
    "id": "e8",
    "name": "רתכים מוסמכים",
    "location": "אשדוד, ישראל",
    "jobType": "רתכות",
    "availability": "פרילנס",
    "skills": ["רתכת MIG", "עבודות פלדה", "קריאת שרטוטים"],
    "description": "מחפשים רתכים מוסמכים לעבודות מתכת ופלדה. תשלום לפי פרויקט.",
    "phone": "(08) 555-1122",
    "profileImage": "https://images.unsplash.com/photo-1556740772-1a741367b93e?auto=format&fit=crop&w=500&q=60"
  },
  {
    "id": "e9",
    "name": "טכנאי מיזוג אוויר",
    "location": "נתניה, ישראל",
    "jobType": "מיזוג אוויר",
    "availability": "משרה מלאה",
    "skills": ["התקנה", "תחזוקה", "אבחון תקלות"],
    "description": "דרושים טכנאים למיזוג אוויר להתקנות ותחזוקה. הכשרה על חשבון החברה.",
    "phone": "(09) 555-0909",
    "profileImage": "https://images.unsplash.com/photo-1602407294553-6a755bd379d1?auto=format&fit=crop&w=500&q=60"
  },
  {
    "id": "e10",
    "name": "מתקיני רצפות",
    "location": "ראשון לציון, ישראל",
    "jobType": "ריצוף",
    "availability": "מבוסס פרויקט",
    "skills": ["התקנת אריחים", "פרקט", "ריצוף ויניל"],
    "description": "דרושים מתקיני רצפות לעבודות ריצוף שונות. תשלום לפי פרויקט.",
    "phone": "(03) 555-3412",
    "profileImage": "https://images.unsplash.com/photo-1584559987030-6e56d52fef4e?auto=format&fit=crop&w=500&q=60"
  },
  {
    "id": "e11",
    "name": "מתקיני מערכות סולאריות",
    "location": "אילת, ישראל",
    "jobType": "התקנת מערכות סולאריות",
    "availability": "משרה מלאה",
    "skills": ["התקנת פאנלים", "עבודות גובה", "חיווט"],
    "description": "דרושים מתקינים למערכות סולאריות. עבודה בתנאי שטח.",
    "phone": "(08) 555-8080",
    "profileImage": "https://images.unsplash.com/photo-1581090406994-9fe5b6c5a4e0?auto=format&fit=crop&w=500&q=60"
  },
  {
    "id": "e12",
    "name": "צוותי הריסה",
    "location": "פתח תקווה, ישראל",
    "jobType": "הריסה",
    "availability": "לפי קריאה",
    "skills": ["עבודות הריסה", "הפעלת ציוד", "ניקוי אתרים"],
    "description": "מחפשים עובדים לעבודות הריסה ופינוי. עבודה פיזית בתנאי שטח.",
    "phone": "(03) 555-3366",
    "profileImage": "https://images.unsplash.com/photo-1557772611-722dabe5c14b?auto=format&fit=crop&w=500&q=60"
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
