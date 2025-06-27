import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white shadow-sm z-50 relative'>

      {/* Logo */}
      <Link to='/'><img src={assets.logo} className='w-36' alt="Logo" /></Link>

      {/* Desktop Nav Links */}
      <ul className='hidden sm:flex gap-7 text-sm text-gray-700 tracking-wide'>
        {['/', '/collection', '/about', '/contact'].map((route, index) => {
          const labels = ['HOME', 'COLLECTION', 'ABOUT', 'CONTACT']
          return (
            <NavLink
              to={route}
              key={route}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 hover:text-black transition duration-200 ${
                  isActive ? 'text-black font-semibold' : ''
                }`
              }
            >
              <p>{labels[index]}</p>
              <hr className='w-2/4 border-none h-[2px] bg-black transition-all scale-x-0 group-hover:scale-x-100 origin-left duration-300' />
            </NavLink>
          )
        })}
      </ul>

      {/* Icons */}
      <div className='flex items-center gap-6'>
        <img
          onClick={() => { setShowSearch(true); navigate('/collection') }}
          src={assets.search_icon}
          className='w-5 cursor-pointer hover:scale-110 transition-transform'
          alt="Search"
        />

        {/* Profile Icon + Dropdown */}
        <div className='relative group'>
          <img
            onClick={() => !token && navigate('/login')}
            className='w-5 cursor-pointer hover:scale-110 transition-transform'
            src={assets.profile_icon}
            alt="Profile"
          />
          <AnimatePresence>
            {token && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className='hidden group-hover:block absolute right-0 top-8 bg-white border shadow-md rounded-md w-40 py-3 px-4 z-10'
              >
                <p onClick={() => navigate('/profile')} className='cursor-pointer hover:text-black text-gray-600 mb-2'>My Profile</p>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black text-gray-600 mb-2'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black text-gray-600'>Logout</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cart */}
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 hover:scale-110 transition-transform' alt="Cart" />
          <p className='absolute right-[-6px] bottom-[-6px] w-4 h-4 flex items-center justify-center bg-black text-white rounded-full text-[10px] font-semibold'>{getCartCount()}</p>
        </Link>

        {/* Mobile Menu */}
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menu" />
      </div>

      {/* Sidebar menu for mobile */}
      <div className={`fixed top-0 right-0 h-full bg-white shadow-md z-50 transition-all duration-300 ${visible ? 'w-3/4' : 'w-0 overflow-hidden'}`}>
        <div className='flex flex-col text-gray-700 pt-6 h-full'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-3 px-5 py-4 border-b cursor-pointer hover:bg-gray-100'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Back" />
            <p className='text-sm'>Back</p>
          </div>
          {['/', '/collection', '/about', '/contact'].map((route, index) => {
            const labels = ['HOME', 'COLLECTION', 'ABOUT', 'CONTACT']
            return (
              <NavLink
                key={route}
                to={route}
                onClick={() => setVisible(false)}
                className='py-3 px-6 border-b text-sm hover:bg-gray-100 transition-colors'
              >
                {labels[index]}
              </NavLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Navbar
