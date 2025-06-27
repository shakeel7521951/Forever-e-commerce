import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300 px-4">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeIn" }}
        className="bg-pink-50 backdrop-blur-md shadow-xl rounded-2xl px-8 py-10 w-full max-w-md"
      >
        <h1 className="text-3xl font-extrabold text-center text-rose-600 mb-6">
          Admin Panel
        </h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-600 mb-2">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-600 mb-2">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 font-semibold rounded-lg text-white bg-rose-600 hover:bg-rose-700 transition-colors duration-200"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
