import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const List = ({ token }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="p-4 bg-gray-100 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4 border-b border-pink-200 pb-2 text-rose-600">All Products List</h2>

      {/* Table Head */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-pink-200 text-gray-700 font-bold py-3 px-4 rounded-md">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Action</span>
      </div>

      {/* Product Rows */}
      <div className="flex flex-col gap-3 mt-2">
        {list.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 10, delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center bg-pink-50 hover:bg-pink-100 p-3 rounded-lg shadow-sm"
          >
            <img className="w-12 h-12 object-cover rounded-md border" src={item.image[0]} alt={item.name} />
            <p className="text-gray-800 font-medium">{item.name}</p>
            <p className="text-gray-600">{item.category}</p>
            <p className="text-green-600 font-semibold">{currency}{item.price}</p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-red-500 text-center cursor-pointer text-xl font-bold hover:text-red-700"
              title="Remove Product"
            >
              ×
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default List
