import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter(item => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className='my-12 px-4 md:px-10'>
      {/* Section Title */}
      <div className='text-center py-8'>
        <Title text1="BEST" text2="SELLERS" />
        <p className='w-full sm:w-3/4 md:w-2/3 mx-auto text-gray-600 text-sm sm:text-base'>
          Explore our top-selling products loved by our customers.
        </p>
      </div>

      {/* Product Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestSeller.map((item, idx) => (
          <div 
            key={idx} 
            className='bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 p-2 flex flex-col items-center'
          >
            <ProductItem 
              id={item._id} 
              image={item.image} 
              name={item.name} 
              price={item.price} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
