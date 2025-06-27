import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { motion } from 'framer-motion';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      setIsLoading(true);
      if (!token) return;

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-500';
      case 'shipped': return 'bg-blue-500';
      case 'processing': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-pink-400';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-50 text-green-800';
      case 'shipped': return 'bg-blue-50 text-blue-800';
      case 'processing': return 'bg-yellow-50 text-yellow-800';
      case 'cancelled': return 'bg-red-50 text-red-800';
      default: return 'bg-pink-50 text-pink-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="min-h-screen pt-16 px-4 sm:px-8 bg-gradient-to-b from-white to-pink-50"
    >
      <div className="max-w-6xl mx-auto pb-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <Title text1={'MY'} text2={'ORDERS'} />
          <div className="w-24 h-1 bg-pink-400 mx-auto mt-4 rounded-full" />
        </div>

        {/* Order List */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : orderData.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="space-y-6"
          >
            {orderData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg border border-pink-100 transition-all duration-300 group"
              >
                <div className="p-6 flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <div className="relative w-24 h-24">
                    <div className="absolute -inset-1 bg-pink-300 rounded-lg blur opacity-25 group-hover:opacity-40 transition-all duration-300"></div>
                    <img
                      src={item.image[0]}
                      alt={item.name}
                      className="relative w-full h-full object-cover rounded-lg border-2 border-white z-10"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm">
                      <p className="font-semibold text-pink-600">PK {item.price}</p>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-gray-600">Size: {item.size}</p>
                    </div>
                    <div className="mt-3 text-sm text-gray-500 space-y-1">
                      <p>Ordered on: {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                      <p>Payment: <span className="capitalize">{item.paymentMethod}</span></p>
                    </div>
                  </div>

                  {/* Status + Actions */}
                  <div className="md:w-48 flex flex-col justify-between items-start md:items-end gap-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusBgColor(item.status)}`}>
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`}></span>
                      <span className="capitalize">{item.status}</span>
                    </div>
                    <button
                      onClick={loadOrderData}
                      className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold rounded-lg transition-all hover:shadow-md"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-pink-200">
            <div className="text-pink-400 text-5xl mb-4">📦</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No orders found</h3>
            <p className="text-gray-500">Your order history will appear here.</p>
            <button
              onClick={loadOrderData}
              className="mt-6 px-6 py-2 bg-pink-600 hover:bg-pink-800 text-white font-medium rounded-lg transition-all"
            >
              Refresh Orders
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Orders;
