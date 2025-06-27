import React, { useState } from 'react'
import { motion } from 'framer-motion'

const NewsletterBox = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const onSubmitHandler = (e) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log('Subscribed with:', email)
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <div className="text-center px-4 py-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
      >
        Join Our Style Community
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-600 max-w-2xl mx-auto mb-6"
      >
        Subscribe now for exclusive fashion insights, 20% off your first order, and early access to new collections.
      </motion.p>

      {subscribed ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-green-600 font-medium py-4"
        >
          Thank you for subscribing! Check your email for confirmation.
        </motion.div>
      ) : (
        <motion.form
          onSubmit={onSubmitHandler}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full sm:w-3/4 md:w-1/2 flex flex-col sm:flex-row gap-2 mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-grow px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="bg-black text-white font-medium px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Subscribe
          </motion.button>
        </motion.form>
      )}
    </div>
  )
}

export default NewsletterBox