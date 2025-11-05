import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { assets } from '../assets/assets.js';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
  };

  return (
    <section className='flex flex-col sm:flex-row border border-gray-200 shadow-lg rounded-2xl overflow-hidden mt-6 bg-gradient-to-br from-white via-gray-50 to-gray-100'>
      {/* Left side content */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 px-6 sm:px-10'>
        <motion.div 
          initial={{ opacity: 0, x: -40 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className='text-gray-800 space-y-4'
        >
          <div className='flex items-center gap-3'>
            <span className='w-10 md:w-14 h-[2px] bg-gray-700'></span>
            <span className='font-medium text-sm md:text-base tracking-wide text-gray-700 uppercase'>
              Our Bestsellers
            </span>
          </div>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900'>
            Discover <span className='text-gray-600'>New Arrivals</span>
          </h1>
          <p className='text-gray-500 text-sm sm:text-base max-w-md'>
            Elevate your wardrobe with our latest collection — crafted for comfort, designed for style.
          </p>
          <button
            onClick={() => navigate('/collection')}
            className='mt-4 bg-black text-white px-6 py-3 rounded-full text-sm sm:text-base hover:bg-gray-800 transition-all duration-300'
          >
            Shop Now
          </button>
        </motion.div>
      </div>
      

      {/* Right side carousel */}
      <div className='w-full sm:w-1/2 relative'>
        <Slider {...settings} className="w-full">
          {[assets.Hero4, assets.Hero2, assets.Hero3, assets.hero_img].map((img, idx) => (
            <div key={idx} className='relative'>
              <img
                src={img}
                alt={`Hero banner ${idx + 1}`}
                className='w-full h-[350px] sm:h-[500px] object-cover rounded-r-2xl'
              />
              <div className='absolute inset-0 bg-black/20'></div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Hero;
