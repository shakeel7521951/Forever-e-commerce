import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="bg-gray-50 pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={footerVariants}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants}>
            <img
              src={assets.logo}
              className="w-36 mb-6"
              alt="Forever You Logo"
            />
            <p className="text-gray-600 mb-6">
              Elevating your style with premium fashion collections. Forever You
              brings you the latest trends with quality and comfort.
            </p>
            <div className="flex gap-4">
              {[
                <FiFacebook />,
                <FiTwitter />,
                <FiInstagram />,
                <FiLinkedin />,
              ].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -3, color: "#7c3aed" }}
                  className="text-gray-500 hover:text-indigo-600 text-xl"
                >
                  {Icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {["Home", "Collection", "About","Contact"].map(
                (item, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    className="text-gray-600 hover:text-indigo-600 cursor-pointer"
                  >
                    <Link to={item}>{item}</Link>
                  </motion.li>
                )
              )}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Customer Service
            </h3>
            <ul className="space-y-3">
              {[
                "FAQs",
                "Shipping Policy",
                "Returns & Exchanges",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="text-gray-600 hover:text-indigo-600 cursor-pointer"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Contact Us
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">📞</span>
                +92 301487487
              </li>
              <li className="flex items-start">
                <span className="mr-2">✉️</span>
                fareehaasghar487@gmail.com
              </li>
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                Model town Bwp.
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-8 border-t border-gray-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p>
              © {new Date().getFullYear()} Forever You. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-indigo-600">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-indigo-600">
                Terms of Service
              </a>
              <a href="#" className="hover:text-indigo-600">
                Cookies
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
