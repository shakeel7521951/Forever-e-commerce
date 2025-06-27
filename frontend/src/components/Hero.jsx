import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentSeason, setCurrentSeason] = useState("Summer");

  useEffect(() => {
    const seasons = ["Summer", "Autumn", "Winter", "Spring"];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % seasons.length;
      setCurrentSeason(seasons[index]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-5 relative overflow-hidden bg-gray-50">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIiBzdHJva2U9IiNlNGU0ZTQiPgogIDxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz4KPC9zdmc+Cg==')]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left space-y-6"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800"
          >
            <span className="animate-pulse">🔥</span>
            <span className="ml-1">HOT COLLECTION</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Elevate Your <br />
            <motion.span
              key={currentSeason}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-rose-600"
            >
              {currentSeason} Style
            </motion.span>
          </h1>

          <p className="text-lg text-gray-600 max-w-lg">
            Discover our curated collection of premium fashion that combines
            comfort with cutting-edge design. Limited edition pieces that make a
            statement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/collection">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                Shop New Arrivals
              </motion.button>
            </Link>
            <Link to="/collection">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-rose-600 text-base font-medium rounded-md text-rose-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors"
              >
                View Lookbook
              </motion.button>
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-4">
            <motion.div whileHover={{ y: -5 }} className="flex items-center">
              <div className="flex -space-x-2 overflow-hidden">
                {[1, 2, 3].map((item) => (
                  <img
                    key={item}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                    src={`https://randomuser.me/api/portraits/women/${
                      item + 20
                    }.jpg`}
                    alt="Happy customer"
                  />
                ))}
              </div>
              <span className="ml-3 text-sm text-gray-600">
                <span className="font-medium">1000+</span> Happy Customers
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              className="w-full h-auto object-cover"
              src="https://thumbs.dreamstime.com/b/young-blonde-girl-beautiful-blue-eyes-wearing-black-jacket-close-up-portrait-outdoors-pretty-russian-female-long-wavy-87720680.jpg"
              alt="Fashion model wearing our latest collection"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200"
          >
            <div className="flex items-center">
              <span className="text-rose-600 font-bold text-lg">-30%</span>
              <span className="ml-2 text-sm text-gray-600">Today Only</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
