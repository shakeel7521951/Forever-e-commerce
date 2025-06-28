import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  // Sample review data
  const [reviews] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      rating: 5,
      date: '2023-05-15',
      comment: 'Absolutely love this product! The quality exceeded my expectations and it fits perfectly.'
    },
    {
      id: 2,
      name: 'Sarah Miller',
      rating: 4,
      date: '2023-04-22',
      comment: 'Great product overall. The color is beautiful and the material is comfortable. Would recommend!'
    },
    {
      id: 3,
      name: 'Michael Chen',
      rating: 3,
      date: '2023-03-10',
      comment: 'Good product but the sizing runs a bit small. Had to exchange for a larger size.'
    },
    {
      id: 4,
      name: 'Emily Wilson',
      rating: 5,
      date: '2023-02-28',
      comment: 'Perfect in every way! Fast shipping too. Will definitely purchase again.'
    }
  ]);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <img 
            key={i} 
            src={i < rating ? assets.star_icon : assets.star_dull_icon} 
            alt="Star" 
            className="w-4" 
          />
        ))}
      </div>
    );
  };

  return productData ? (
    <div className=' pt-10  px-4 sm:px-8'>
      <div className='max-w-7xl mx-auto'>
        {/*----------- Product Data-------------- */}
        <div className='flex gap-8 flex-col lg:flex-row bg-rose-50 p-6 rounded-xl shadow-sm'>
          {/* Product Images */}
          <div className='flex-1 flex flex-col-reverse gap-4 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-2 sm:w-24'>
              {productData.image.map((item,index) => (
                <img 
                  onClick={() => setImage(item)} 
                  src={item} 
                  key={index} 
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition-all ${image === item ? 'border-pink-500' : 'border-transparent'}`} 
                  alt="Product thumbnail" 
                />
              ))}
            </div>
            <div className='w-full sm:flex-1'>
                <img 
                  className='w-full h-auto max-h-[500px] object-contain rounded-lg' 
                  src={image} 
                  alt={productData.name} 
                />
            </div>
          </div>

          {/* Product Info */}
          <div className='flex-1 lg:pl-8 mt-10'>
            <h1 className='font-bold text-2xl text-gray-900 '>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-5'>
                {renderStars(4)}
                <span className='pl-2 text-sm text-gray-600'>(122 reviews)</span>
            </div>
            <p className='mt-4 text-2xl font-bold text-pink-600'>{currency} {productData.price}</p>
            <p className='mt-4 text-gray-700'>{productData.description}</p>
            
            {/* Size Selection */}
            <div className='mt-8'>
              <p className='text-sm font-medium text-gray-900 mb-3'>SELECT SIZE</p>
              <div className='flex flex-wrap gap-2'>
                {productData.sizes.map((item,index) => (
                  <button 
                    onClick={() => setSize(item)} 
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      item === size 
                        ? 'bg-pink-600 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`} 
                    key={index}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={() => addToCart(productData._id, size)}
              disabled={!size}
              className={`mt-8 w-full py-3 px-6 rounded-lg font-medium text-white transition-all ${
                size 
                  ? 'bg-pink-600 hover:bg-pink-700 shadow-lg hover:shadow-xl' 
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {size ? 'ADD TO CART' : 'SELECT SIZE'}
            </button>

            {/* Product Policies */}
            {/* <div className='mt-8 pt-6 border-t border-gray-200'>
              <div className='flex flex-col gap-2 text-sm text-gray-600'>
                <div className='flex items-start gap-2'>
                  <svg className="w-5 h-5 text-pink-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>100% Original product</span>
                </div>
                <div className='flex items-start gap-2'>
                  <svg className="w-5 h-5 text-pink-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Cash on delivery available</span>
                </div>
                <div className='flex items-start gap-2'>
                  <svg className="w-5 h-5 text-pink-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Easy return and exchange within 7 days</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* ---------- Description & Review Section ------------- */}
        <div className='mt-12 bg-white rounded-xl shadow-sm overflow-hidden'>
          <div className='flex border-b'>
            <button 
              onClick={() => setActiveTab('description')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'description' 
                  ? 'text-pink-600 border-b-2 border-pink-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'reviews' 
                  ? 'text-pink-600 border-b-2 border-pink-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Reviews (122)
            </button>
          </div>
          
          <div className='p-6'>
            {activeTab === 'description' ? (
              <div className='text-gray-700'>
                <p className='mb-4'>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
                <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
              </div>
            ) : (
              <div className='space-y-6'>
                {reviews.map(review => (
                  <div key={review.id} className='border-b border-gray-100 pb-6 last:border-0 last:pb-0'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <h4 className='font-medium text-gray-900'>{review.name}</h4>
                        <div className='flex items-center mt-1'>
                          {renderStars(review.rating)}
                          <span className='ml-2 text-xs text-gray-500'>{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className='mt-3 text-gray-700'>{review.comment}</p>
                  </div>
                ))}
                
                {/* Add Review Button */}
                <button className='mt-8 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-colors'>
                  Write a Review
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --------- display related products ---------- */}
        <div className='mt-12'>
          <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
      </div>
    </div>
  ) : <div className='min-h-screen bg-rose-50'></div>
}

export default Product;