"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import { useRef } from "react";

const playfair = Playfair_Display({ subsets: ["latin"] });

const Gallery = () => {
  return (
    <div className="bg-neutral-900">
      <div className="flex items-center py-6 justify-center">
        <h1
          className={`${playfair.className} font-semiBold text-4xl text-white`}
        >
          Kardeşim 🔥
        </h1>
      </div>
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[450px] w-[450px] overflow-hidden bg-neutral-200 rounded-lg"
    >
      {/* Background Image */}
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 z-10 w-full bg-gradient-to-r from-black/70 to-transparent p-4">
        <p className="text-lg font-bold uppercase text-white">{card.title}</p>
      </div>
    </div>
  );
};

export default Gallery;

type CardType = {
  url: string;
  title: string;
  id: number;
};

const cards: CardType[] = [
  {
    url: "/img5.jpg",
    title: "iDÖLS",
    id: 1,
  },
  {
    url: "/img3.jpg",
    title: "Valo main",
    id: 2,
  },
  {
    url: "/img4.jpg",
    title: "OW2 main falan fistan",
    id: 3,
  },
  {
    url: "/img2.jpg",
    title: "Fav yemek",
    id: 4,
  },
  {
    url: "/img6.jpg",
    title: "HBD UĞURCAN",
    id: 5,
  },
  {
    url: "/img1.jpg",
    title: "İbnelik denince hemen onun adı",
    id: 6,
  },
  {
    url: "/her2.jpg",
    title: "Gelir akla(UĞUR, UĞUR, UĞUR)",
    id: 7,
  },
];
