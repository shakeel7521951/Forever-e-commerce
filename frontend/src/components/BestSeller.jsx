import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { motion } from 'framer-motion'
import { FiShoppingBag, FiStar, FiArrowRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller)
    setBestSeller(bestProduct.slice(0, 5))
  }, [products])

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      hover: {
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }
    }
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              BEST <span className="text-rose-600">SELLERS</span>
            </h2>
            <motion.div 
              className="absolute bottom-0 left-0 w-full h-2 bg-rose-100"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg">
            Customer favorites - the most loved items in our collection
          </p>
        </motion.div>

        {/* Product Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
        >
          {bestSeller.map((product, index) => (
            <motion.div
              key={product._id}
              variants={item}
              whileHover="hover"
              transition={{ type: "spring", stiffness: 300 }}
              className="relative group cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              {/* Product Card */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 h-full flex flex-col">
                {/* Best Seller Badge */}
                <div className="absolute top-4 left-4 z-10 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                  <FiStar className="mr-1" />
                  <span>BESTSELLER</span>
                </div>

                {/* Product Image */}
                <div className="relative pt-[100%] overflow-hidden">
                  <motion.img
                    src={product.image[0]}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x500?text=Product+Image'
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="mt-auto">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">PK {product.price}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i} 
                            className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Add Button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 right-4 bg-white text-rose-600 p-2 rounded-full shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Add to cart functionality here
                  }}
                >
                  <FiShoppingBag />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#e11d48' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/collection')}
            className="bg-rose-600 text-white px-8 py-3 rounded-full font-medium inline-flex items-center"
          >
            Shop All Bestsellers
            <motion.span
              animate={{
                x: [0, 5, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5
              }}
              className="ml-2"
            >
              <FiArrowRight />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default BestSeller