import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${backendUrl}/api/order/status`, { orderId, status: event.target.value }, { headers: { token } });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      <h3 className="text-2xl font-bold text-center mb-6 text-rose-600">Orders</h3>

      <div className="space-y-5">
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-pink-50 border border-pink-200 rounded-xl shadow-sm p-5 md:p-6 hover:shadow-md transition"
          >
            <div className="grid grid-cols-1 sm:grid-cols-[50px_1fr] lg:grid-cols-[50px_2fr_1fr_1fr_1fr] gap-4">
              
              {/* Icon */}
              <img className="w-12 h-12 object-contain border border-pink-200" src={assets.parcel_icon} alt="Parcel" />

              {/* Order Details */}
              <div className="text-sm text-gray-700">
                <div className="mb-3">
                  {order.items.map((item, i) => (
                    <p key={i}>
                      {item.name} × {item.quantity} <span className="text-gray-500">({item.size})</span>{i !== order.items.length - 1 && ','}
                    </p>
                  ))}
                </div>
                <p className="font-semibold text-base mb-1">{order.address.firstName} {order.address.lastName}</p>
                <p className="text-gray-600">{order.address.street},</p>
                <p className="text-gray-600">{order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}</p>
                <p className="text-gray-600 mt-1">📞 {order.address.phone}</p>
              </div>

              {/* Meta Info */}
              <div className="text-sm text-gray-800 space-y-1">
                <p><strong>Items:</strong> {order.items.length}</p>
                <p><strong>Method:</strong> <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">{order.paymentMethod}</span></p>
                <p>
                  <strong>Payment:</strong> 
                  <span className={`ml-1 px-2 py-0.5 rounded-md ${order.payment ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {order.payment ? 'Done' : 'Pending'}
                  </span>
                </p>
                <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
              </div>

              {/* Amount */}
              <div className="text-xl font-semibold text-gray-800 flex items-start justify-start sm:justify-center">
                PKR {order.amount}
              </div>

              {/* Status */}
              <div className="flex items-start sm:justify-end">
                <select
                  value={order.status}
                  onChange={(e) => statusHandler(e, order._id)}
                  className="p-2 text-sm font-semibold rounded-md border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200 transition duration-200"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Orders;
