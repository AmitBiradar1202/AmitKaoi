import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { assets } from '../assets/assets.js';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const videos = [
    assets.video1,
    assets.video2,
    assets.video3,
    assets.video4,
    assets.video5
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % videos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative w-full h-screen flex items-center justify-center overflow-hidden cursor-pointer"
      // cursor-pointer added here to always show hand
    >
      {/* Preload all videos, toggle opacity */}
      {videos.map((video, idx) => (
        <motion.video
          key={idx}
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentIndex === idx ? 1 : 0 }}
          transition={{ opacity: { duration: 0.5 } }}
        />
      ))}

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-20 max-w-6xl w-full px-6 text-center">
        <h1 className="huge-title text-7xl md:text-[120px] leading-none text-white">
          NEW <span className="text-white/90">DROP</span>
        </h1>

        <p className="mt-6 text-sm md:text-lg text-gray-300 max-w-2xl mx-auto">
          Minimal. Street. Elevated. Shop the latest curated pieces — limited release.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => navigate("/collection")}
            className="uppercase px-8 py-3 border border-white rounded-full text-sm tracking-wider hover:bg-white hover:text-black transition"
          >
            Shop Collection
          </button>

          <button
            onClick={() => navigate("/collection?filter=new")}
            className="uppercase px-6 py-3 text-sm tracking-wider text-gray-300 hover:text-white transition"
          >
            Explore New
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 text-gray-300 text-sm">
        Scroll
        <div className="mt-2 w-7 h-10 border rounded-full border-gray-400 mx-auto relative">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="block w-1 h-1 rounded-full bg-gray-400 absolute left-1/2 -translate-x-1/2 top-2"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
