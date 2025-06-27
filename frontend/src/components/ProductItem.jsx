import React, { useContext } from 'react' 
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link 
      to={`/product/${id}`} 
      onClick={() => scrollTo(0, 0)} 
      className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-3"
    >
      {/* Image */}
      <div className="overflow-hidden rounded-lg">
        <img 
          src={image[0]} 
          alt={name} 
          className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 ease-in-out" 
        />
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-1 text-center">
        <h3 className="text-gray-800 font-semibold text-sm group-hover:text-pink-600 transition">{name}</h3>
        <p className="text-gray-600 text-sm font-medium">{currency}{price}</p>
      </div>
    </Link>
  );
}

export default ProductItem;
