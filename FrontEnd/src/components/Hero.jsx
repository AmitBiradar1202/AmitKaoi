import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const videoUrl =
    "https://genrage.com/cdn/shop/videos/c/vp/35306b2c25374562bc65ad3be788c312/35306b2c25374562bc65ad3be788c312.HD-1080p-7.2Mbps-59110661.mp4?v=0";

  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden cursor-pointer bg-black">
      {/* Video */}
      <motion.video
        key={videoUrl}
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-20 max-w-6xl w-full px-6 text-center">
        {/* <h1 className="huge-title -mt-300 text-7xl md:text-[120px] leading-none text-transparent bg-clip-text glass-text">
  SK<span className="opacity-90">COLLECTIONS</span>
</h1> */}
<<h1 className="huge-title -mt-10 text-7xl md:text-[120px] leading-none text-transparent bg-clip-text glass-text">
  SA<span className="opacity-90">COLLECTIONS</span>
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
