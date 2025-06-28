import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-12 px-4 sm:px-8 bg-gradient-to-br from-rose-50 to-pink-50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="mb-16 text-center"
        >
          <Title text1={'YOUR'} text2={'CART'} />
          <div className="w-24 h-1 bg-pink-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Empty State */}
        {cartData.length === 0 && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-16 rounded-3xl shadow-xl text-center border border-dashed border-pink-200"
          >
            <div className="text-7xl mb-6">🛍️</div>
            <h3 className="text-3xl font-semibold text-pink-800 mb-2">Your Cart is Waiting!</h3>
            <p className="text-pink-600 text-lg">Add your favorite styles and accessories to begin the journey.</p>
          </motion.div>
        )}

        {/* Cart Items + Cart Total */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Items */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6 mb-20 flex-1"
          >
            <AnimatePresence>
              {cartData.map((cartItem) => {
                const productData = products.find(p => p._id === cartItem._id);

                if (!productData) {
                  console.warn("Product not found for cart item:", cartItem._id);
                  return null;
                }

                return (
                  <motion.div
                    key={`${cartItem._id}-${cartItem.size}`}
                    variants={item}
                    layout
                    exit="exit"
                    className="flex flex-col sm:flex-row max-w-[40rem] items-center justify-between bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100"
                  >
                    {/* Product Info */}
                    <div className="flex items-center gap-6 w-full sm:w-auto">
                      <motion.div whileHover={{ rotate: -1 }} className="relative">
                        <div className="absolute -inset-2 bg-pink-200 rounded-xl blur-xl opacity-40" />
                        <img
                          src={productData.image[0]}
                          alt={productData.name}
                          className="w-24 h-24 object-cover rounded-xl relative z-10 border-2 border-white shadow-md"
                        />
                      </motion.div>

                      <div>
                        <h3 className="text-xl font-semibold text-pink-800">{productData.name}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-lg font-bold text-pink-600">{currency} {productData.price}</span>
                          <span className="px-3 py-1 text-xs bg-pink-100 text-pink-800 rounded-full font-medium">
                            Size: {cartItem.size}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                      <motion.input
                        whileFocus={{ scale: 1.03 }}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (!isNaN(val) && val > 0) updateQuantity(cartItem._id, cartItem.size, val);
                        }}
                        defaultValue={cartItem.quantity}
                        type="number"
                        min="1"
                        className="w-20 px-3 py-2 text-center border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                      />

                      <motion.button
                        onClick={() => updateQuantity(cartItem._id, cartItem.size, 0)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-pink-100 hover:bg-pink-500 hover:text-white text-pink-500 rounded-full transition-all duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {/* Checkout Summary */}
          {cartData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white order-0 p-8 rounded-3xl shadow-2xl border border-pink-100 w-full max-h-[20rem] max-w-[30rem]"
            >
              <CartTotal />
              <motion.button
                onClick={() => navigate('/place-order')}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 25px rgba(236, 72, 153, 0.4)"
                }}
                whileTap={{ scale: 0.97 }}
                className="w-full mt-8 py-4 px-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="drop-shadow">CHECKOUT NOW</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                  className="inline-block ml-2"
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
