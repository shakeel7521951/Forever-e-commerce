import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [location])

  return (
    <AnimatePresence>
      {showSearch && visible && (
        <motion.div
          className="border-t border-b bg-gray-50 py-4 px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center border border-gray-300 shadow-md px-5 py-2 rounded-full w-full sm:w-1/2 bg-white hover:shadow-lg transition-all">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 outline-none bg-inherit text-sm text-gray-700 placeholder-gray-400"
                type="text"
                placeholder="Search for books, authors..."
              />
              <img className="w-4 ml-2 opacity-70" src={assets.search_icon} alt="Search Icon" />
            </div>
            <motion.img
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSearch(false)}
              className="w-4 cursor-pointer opacity-70 hover:opacity-100 transition-all"
              src={assets.cross_icon}
              alt="Close"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SearchBar;
