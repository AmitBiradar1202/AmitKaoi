import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import NewsLetterBox from "../components/NewsLetterBox";
import OurPolicy from "../components/OurPolicy";

const categories = [
  {
    name: "Men",
    img: "https://plus.unsplash.com/premium_photo-1706806943523-e2b20a2377ac?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1112",
  },
  {
    name: "Women",
    img: "https://plus.unsplash.com/premium_photo-1680111700123-8759aae3b5b0?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "Kids",
    img: "https://plus.unsplash.com/premium_photo-1675183689638-a68fe7048da9?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    // Navigate to LatestCollection page with category param
    navigate(`/collection`);
  };

  return (
    <div className="overflow-hidden">
      <Hero />

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-20">
        <h2 className="text-2xl font-semibold mb-10 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
              onClick={() => handleCategoryClick(cat.name)} // ✅ click navigates
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <p className="text-white text-xl font-semibold tracking-wide">
                  {cat.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Latest & Best Sellers */}
      <LatestCollection />
      <BestSeller />

      {/* Brand Story */}
      <section
        className="relative bg-fixed bg-center bg-cover py-24 my-20 text-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521334884684-d80222895322?w=1200')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Redefine Your Everyday Style
          </h2>
          <p className="text-gray-200 text-lg leading-relaxed">
            From street to chic — explore the best in Men’s, Women’s, and Kids’ fashion curated for comfort and confidence.
          </p>
        </div>
      </section>

      <OurPolicy />

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-20 text-center">
        <h2 className="text-2xl font-semibold mb-12">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial items here */}
        </div>
      </section>

      <NewsLetterBox />
    </div>
  );
};

export default Home;
