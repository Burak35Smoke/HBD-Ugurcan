"use client";

import React, { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"] });

const SoSpecial = () => {
  const [cards, setCards] = useState<Card[]>(cardData);

  const handleSwipe = (direction: "left" | "right") => {
    if (cards.length > 1) {
      setCards((prevCards) => {
        const newCards = prevCards.slice(0, -1);
        return newCards;
      });
    } else {
      setCards(cardData);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-4">
      <div className="py-8 flex items-center flex-col">
        <h1 className={`${playfair.className} font-bold text-3xl`}>
          Dost olmamızın milyonlarca nedeni.
        </h1>
        <p className="text-foreground">
          İyi ki varsın kardeşim.
        </p>
      </div>

      <div className="relative w-full max-w-sm h-[400px] mb-8">
        <AnimatePresence>
          {cards.map((card, index) => (
            <LoveCard
              key={card.id}
              {...card}
              onSwipe={handleSwipe}
              index={index}
              total={cards.length}
            />
          ))}
        </AnimatePresence>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => handleSwipe("left")}
          className="p-4 bg-white rounded-full shadow-lg text-blue-500 hover:bg-blue-50 transition-colors"
          aria-label="Swipe Left"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="p-4 bg-white rounded-full shadow-lg text-blue-500 hover:bg-blue-50 transition-colors"
          aria-label="Swipe Right"
        >
          <ArrowRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

interface CardProps extends Card {
  onSwipe: (direction: "left" | "right") => void;
  index: number;
  total: number;
}

const LoveCard: React.FC<CardProps> = ({
  id,
  content,
  onSwipe,
  index,
  total,
}) => {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-150, 0, 150], [0.8, 1, 0.8]);
  const rotate = useTransform(x, [-150, 0, 150], [-30, 0, 30]);
  const opacity = useTransform(x, [-150, -100, 0, 100, 150], [0, 1, 1, 1, 0]);
  const background = useTransform(
    x,
    [-150, 0, 150],
    [
      "linear-gradient(to right, rgba(59,130,246,0.2), rgba(59,130,246,0))",
      "rgba(255,255,255,1)",
      "linear-gradient(to left, rgba(59,130,246,0.2), rgba(59,130,246,0))",
    ]
  );

  const handleDragEnd = () => {
    if (x.get() < -100) {
      onSwipe("left");
    } else if (x.get() > 100) {
      onSwipe("right");
    }
  };

  // Calculate the rotation based on the index
  const cardRotation = index === total - 1 ? -5 : index === total - 2 ? 5 : 0;

  return (
    <motion.div
      style={{
        x,
        rotate,
        opacity,
        scale,
        background,
      }}
      drag={index === total - 1 ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute w-full h-full"
      initial={{ scale: 0.8, opacity: 0, rotate: cardRotation }}
      animate={{ scale: 1, opacity: 1, rotate: cardRotation }}
      exit={{ scale: 0.8, opacity: 0, rotate: cardRotation }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full h-full flex items-center justify-center p-6 rounded-2xl shadow-xl border border-gray-200">
        <p className="text-2xl font-semibold text-center text-gray-800">
          {content}
        </p>
      </div>
    </motion.div>
  );
};

interface Card {
  id: number;
  content: string;
}

const cardData: Card[] = [
  { id: 1, content: "ve zaman geçiyor bugün 18'ine giriyorsun, iyi ki seni tanımışım dostum." },
  { id: 2, content: "Yeri geldi simit ayran, yeri geldi vodka fondip par-ti-le" },
  { id: 3, content: "Yeri geldi bira midye, yeri geldi lahmacuncu necip usta." },
  { id: 4, content: "Yeri geldi götünü siktim, yeri geldi bidaha siktim(!)" },
  { id: 5, content: "Basarken sema karanlık, Uğur'un götüne basan çok(Öhm)" },
  { id: 6, content: "Yeri geldi okuldan kaçmak için 1 saat sövüştük." },
  { id: 7, content: "Yeri geldi yemek alırken tolga hocaya yakalandık." },
  { id: 8, content: "Yeri geldi küfür ederken ibneliğine hocam ne diyoo dedik." },
  { id: 9, content: "Yeri geldi babalar gibi canerin karşısında boynumuzu bükmedik." },
  { id: 10, content: "Yeri geldi telefonun arkasından garip sesler çıkarttık." },
];

export default SoSpecial;