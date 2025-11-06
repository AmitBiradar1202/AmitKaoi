import { assets } from "../assets/assets";
import NewsLetterBox from '../components/NewsLetterBox';
import Title from '../components/Title';

const Contact = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Title */}
      <div className='text-center text-2xl md:text-3xl pt-10 border-t border-gray-200'>
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Contact Info */}
      <div className='my-10 flex flex-col md:flex-row justify-center items-center gap-10 mb-28'>
        {/* Image */}
        <img 
          src={assets.contact_img} 
          alt="Contact Us"  
          className='w-full md:max-w-[480px] rounded-lg shadow-md object-cover'
        />

        {/* Info */}
        <div className='flex flex-col justify-center items-start gap-6 w-full md:w-1/2'>
          {/* Store Info */}
          <div>
            <p className='font-semibold text-xl text-gray-700'>Our Store</p>
            <p className='text-gray-500'>
             <br />
              Near Oberoi Spring, Andheri West, Mumbai 400058, India
            </p>
            <p className='text-gray-500 mt-2'>
              Tel: 04646545556 <br />
              Email: amitbiradar1202@gmail.com
            </p>
          </div>

          {/* Careers */}
          <div>
            <p className='font-semibold text-xl text-gray-700'>Careers at AmitKaoi</p>
            <p className='text-gray-500 mt-1'>Learn more about our teams and job openings.</p>
            <button className='mt-2 border border-black px-6 py-2 text-sm font-medium hover:bg-black hover:text-white rounded transition-colors'>
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <NewsLetterBox />
    </div>
  )
}

export default Contact;
