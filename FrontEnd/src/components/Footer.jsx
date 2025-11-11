import { assets } from "../assets/assets.js";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 mt-32 text-gray-700">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-16 grid grid-cols-1 sm:grid-cols-3 gap-12 text-sm">
        
        {/* Logo + About */}
        <div>
          <img src={assets.SkCollections} alt="Logo" className="mb-5 w-36" />
          <p className="text-gray-600 leading-relaxed">
            Elevate your style with premium streetwear and timeless essentials.
            Designed with passion, crafted with care — because your fashion
            deserves to speak confidence.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-5 text-gray-800">Company</h3>
          <ul className="flex flex-col gap-2 text-gray-600 hover:[&>li]:text-black transition-all duration-300">
            <li className="cursor-pointer hover:translate-x-1">Home</li>
            <li className="cursor-pointer hover:translate-x-1">About Us</li>
            <li className="cursor-pointer hover:translate-x-1">Delivery</li>
            <li className="cursor-pointer hover:translate-x-1">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-5 text-gray-800">Get In Touch</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
  <li>📞 <a href="tel:+911231680976" className="hover:text-yellow-500 transition">+91 123 168 0976</a></li>
  
  <li>
    ✉️ 
    <a 
      href="mailto:sacollections@gmail.com" 
      className="hover:text-yellow-500 transition ml-1"
    >
      sacollections@gmail.com
    </a>
  </li>

  <li>
    📸 
    <a 
      href="https://www.instagram.com/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="hover:text-yellow-500 transition ml-1"
    >
      Instagram
    </a>
  </li>

  
</ul>>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 pt-6 pb-4 text-center text-sm">
        <p className="text-gray-600">
          Made with 💖 by{" "}
          <a
            href=" "
            target="_blank"
            rel="noopener noreferrer"
            className="text-black font-medium hover:underline"
          >
            SACollections
          </a>
        </p>
        <p className="text-gray-500 mt-1">
          © {new Date().getFullYear()} SACollections.com — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
