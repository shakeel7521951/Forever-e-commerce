import React from 'react';
import { motion } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
} from 'react-icons/fa';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const ContactSection = () => {
  return (
    <section className="bg-gray-50 min-h-screen py-10 h-full flex items-center px-4 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left Side: Contact Details */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-black">
            Have You Any Project? <br />
            <motion.span
              className="text-rose-600 text-2xl md:text-4xl inline-block"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            >
              Please Drop a Message
            </motion.span>
          </h2>
          <p className="mt-4 text-gray-600">
            Get in touch and let me know how I can help. Fill out the form and
            I'll be in touch as soon as possible.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-start space-x-4">
              <FaMapMarkerAlt className="text-xl text-rose-600" />
              <div>
                <p className="font-semibold text-rose-600">Address:</p>
                <p className="text-gray-600">89/9 Mothijheel, Dhaka, Bangladesh.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaPhoneAlt className="text-xl text-rose-600" />
              <div>
                <p className="font-semibold text-rose-600">Phone:</p>
                <p className="text-gray-600">+8801799568976</p>
                <p className="text-gray-600">+8801904015294</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <FaEnvelope className="text-xl text-rose-600" />
              <div>
                <p className="font-semibold text-rose-600">Email:</p>
                <p className="text-gray-600">support@abdul.com</p>
                <p className="text-gray-600">abdulbasetbappy@hotmail.com</p>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="mt-6 flex justify-center lg:justify-start gap-4">
            {[
              { icon: <FaGithub />, color: 'bg-neutral-950', label: 'GitHub' },
              { icon: <FaLinkedin />, color: 'bg-blue-900', label: 'LinkedIn' },
              { icon: <FaFacebook />, color: 'bg-blue-700', label: 'Facebook' },
              { icon: <FaYoutube />, color: 'bg-red-800', label: 'YouTube' },
            ].map((item, index) => (
              <motion.a
                key={item.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
                href="#"
                className={`group relative inline-flex h-10 w-10 items-center justify-center rounded-full ${item.color} text-neutral-200 hover:w-32 transition-all overflow-hidden`}
              >
                <span className="hidden group-hover:inline whitespace-nowrap mr-2">
                  {item.label}
                </span>
                {item.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Contact Form */}
        <motion.div
          className="bg-gray-800 p-8 rounded-xl shadow-lg"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <form>
            {['Name', 'Email', 'Phone', 'Message'].map((label, i) => (
              <motion.div
                className="mb-4"
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <label className="block text-gray-200 mb-2">{label}</label>
                {label !== 'Message' ? (
                  <input
                    type={label.toLowerCase() === 'email' ? 'email' : 'text'}
                    placeholder={`e.g ${
                      label === 'Email' ? 'johndoe@mail.com' : 'John Doe'
                    }`}
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 outline-none"
                  />
                ) : (
                  <textarea
                    placeholder="Write message..."
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 outline-none h-24"
                  ></textarea>
                )}
              </motion.div>
            ))}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full text-white bg-rose-600 hover:bg-rose-700 font-semibold py-3 rounded-lg transition"
            >
              SEND
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
