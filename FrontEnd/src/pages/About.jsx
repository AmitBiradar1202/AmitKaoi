import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 min-h-screen text-gray-700">
      {/* ======= ABOUT US HEADER ======= */}
      <div className="text-3xl md:text-4xl font-bold text-center pt-10 border-t border-gray-200">
        <Title text1={"ABOUT "} text2={"US"} />
      </div>

      {/* ======= MAIN ABOUT SECTION ======= */}
      <div className="my-12 flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-16">
        <div className="md:w-1/2">
          <img
            src={assets.about_img}
            alt="About Us"
            className="w-full max-w-[500px] rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          />
        </div>

        <div className="md:w-1/2 flex flex-col gap-6 text-base leading-relaxed">
          <p>
            <span className="font-semibold text-gray-900">Forever</span> was
            born out of a passion for innovation and a desire to revolutionize
            the way people shop online. Our journey began with a simple idea —
            to provide a platform where customers can easily discover, explore,
            and purchase a wide range of products from the comfort of their
            homes.
          </p>

          <p>
            Since our inception, we’ve worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-2">Our Mission</h2>
          <p>
            Our mission at{" "}
            <span className="font-semibold text-gray-900">Forever</span> is to
            empower customers with choice, convenience, and confidence. We’re
            dedicated to providing a seamless shopping experience that exceeds
            expectations — from browsing and ordering to delivery and beyond.
          </p>
        </div>
      </div>

      {/* ======= WHY CHOOSE US ======= */}
      <div className="text-3xl md:text-4xl text-center font-bold text-gray-800 py-6">
        <Title text1={"WHY "} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-8 px-6 md:px-16 mb-20">
        {/* Card 1 */}
        <div className="bg-white shadow-md hover:shadow-xl rounded-2xl px-8 py-10 sm:py-16 text-center flex-1 transition-all duration-300">
          <b className="block text-lg text-gray-900 mb-3">Quality Assurance</b>
          <p className="text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-md hover:shadow-xl rounded-2xl px-8 py-10 sm:py-16 text-center flex-1 transition-all duration-300">
          <b className="block text-lg text-gray-900 mb-3">Convenience</b>
          <p className="text-gray-600">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-md hover:shadow-xl rounded-2xl px-8 py-10 sm:py-16 text-center flex-1 transition-all duration-300">
          <b className="block text-lg text-gray-900 mb-3">
            Exceptional Support
          </b>
          <p className="text-gray-600">
            Our team of dedicated professionals is here to assist you every
            step of the way — ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>

      {/* ======= NEWSLETTER SECTION ======= */}
      <div className="pb-12">
        <NewsLetterBox />
      </div>
    </div>
  );
};

export default About;
