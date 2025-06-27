import React from 'react'
import { motion } from 'framer-motion'
import { FiRefreshCw, FiAward, FiHeadphones } from 'react-icons/fi'

const OurPolicy = () => {
  const policies = [
    {
      icon: <FiRefreshCw className="w-8 h-8" />,
      title: "Easy Exchange Policy",
      description: "Hassle-free exchanges within 14 days",
      colorClass: "bg-gradient-to-r from-purple-500 to-indigo-600"
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: "7 Days Return Policy",
      description: "Free returns within 7 days of purchase",
      colorClass: "bg-gradient-to-r from-rose-500 to-pink-600"
    },
    {
      icon: <FiHeadphones className="w-8 h-8" />,
      title: "24/7 Customer Support",
      description: "Dedicated support team always available",
      colorClass: "bg-gradient-to-r from-amber-500 to-orange-600"
    }
  ]

  // Simplified animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`${policy.colorClass} w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white mb-4`}>
                {policy.icon}
              </div>
              <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">
                {policy.title}
              </h3>
              <p className="text-gray-500 text-center">
                {policy.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurPolicy