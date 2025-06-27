import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            LATEST <span className="text-indigo-600">COLLECTIONS</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Discover our newest arrivals that blend contemporary design with timeless elegance
          </p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
        >
          {latestProducts.map((product, index) => (
            <motion.div
              key={product._id}
              variants={item}
              whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
              onClick={() => handleProductClick(product._id)}
            >
              {/* Sale Badge */}
              {index < 3 && (
                <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                  NEW
                </div>
              )}

              {/* Product Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#4f46e5' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/collection')}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full font-medium inline-flex items-center"
          >
            View All Products
            <FiArrowRight className="ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestCollection;