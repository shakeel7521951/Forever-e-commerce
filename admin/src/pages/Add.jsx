import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))
      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      className='w-full max-w-3xl mx-auto p-6 bg-pink-50 rounded-2xl shadow-xl space-y-6'
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Image Upload */}
      <div>
        <p className='mb-2 font-semibold text-rose-600'>Upload Images</p>
        <div className='flex gap-3 flex-wrap'>
          {[{ img: image1, setter: setImage1, id: 'image1' },
            { img: image2, setter: setImage2, id: 'image2' },
            { img: image3, setter: setImage3, id: 'image3' },
            { img: image4, setter: setImage4, id: 'image4' }
          ].map(({ img, setter, id }, i) => (
            <motion.label
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              key={i}
              htmlFor={id}
              className='w-24 h-24 border border-pink-300 rounded-md overflow-hidden cursor-pointer hover:shadow-md transition'
            >
              <img className='w-full h-full object-cover' src={!img ? assets.upload_area : URL.createObjectURL(img)} alt='' />
              <input onChange={(e) => setter(e.target.files[0])} type="file" id={id} hidden />
            </motion.label>
          ))}
        </div>
      </div>

      {/* Name */}
      <div>
      
  <p className='mb-1 font-semibold text-gray-600'>Product Name</p>
  <input
    onChange={(e) => setName(e.target.value)}
    value={name}
    className='w-full px-4 py-2 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200 transition duration-200'
    type="text"
    placeholder='Enter product name'
    required
  />
</div>


      {/* Description */}
      <div>
        <p className='mb-1 font-semibold text-gray-600'>Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className='w-full px-4 py-2 border border-pink-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200 transition duration-200'
          rows={3}
          placeholder='Enter product description'
          required
        />
      </div>

      {/* Dropdowns + Price */}
      <div className='flex flex-wrap gap-4'>
        <div className='flex-1 min-w-[140px] 400'>
          <p className='mb-1 font-semibold text-gray-600 '>Category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-4 py-2  rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200 transition duration-200'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className='flex-1 min-w-[140px]'>
          <p className='mb-1 font-semibold text-gray-600'>Subcategory</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-4 py-2 border rounded-md border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200 transition duration-200'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className='flex-1 min-w-[120px]'>
          <p className='mb-1 font-semibold text-gray-600'>Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className='w-full px-4 py-2 border rounded-md border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200 transition duration-200'
            type="number"
            placeholder='e.g. 25'
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className='mb-2 font-semibold text-gray-600'>Available Sizes</p>
        <div className='flex flex-wrap gap-3 '>
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <motion.div
              key={size}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                setSizes(prev =>
                  prev.includes(size)
                    ? prev.filter(item => item !== size)
                    : [...prev, size]
                )
              }
              className={`px-4 py-1 rounded-full border cursor-pointer transition ${
                sizes.includes(size)
                  ? "bg-blue-100 border-blue-400 text-blue-700"
                  : "bg-pink-200 border-pink-300 text-gray-700"
              }`}
            >
              {size}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <motion.div
        className='flex items-center gap-2 mt-1'
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <input
          onChange={() => setBestseller(prev => !prev)}
          checked={bestseller}
          type="checkbox"
          id='bestseller'
          className='accent-blue-600'
        />
        <label htmlFor="bestseller" className='text-gray-700 cursor-pointer'>Mark as Bestseller</label>
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className='text-white bg-rose-600 hover:bg-rose-700 font-sem py-2 px-6 rounded-md transition'
      >
        ADD
      </motion.button>
    </motion.form>
  )
}

export default Add;
