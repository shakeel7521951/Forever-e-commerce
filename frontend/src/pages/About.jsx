import React from 'react';
import { motion } from 'framer-motion';
import { FaTwitter, FaStar } from 'react-icons/fa';

const HeroSection = () => {
  const testimonials = [
    {
      name: 'Leslie Alexander',
      title: 'Freelance React Developer',
      avatar:
        'https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png',
      quote:
        '“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.”',
    },
    {
      name: 'Jacob Jones',
      title: 'Digital Marketer',
      avatar:
        'https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png',
      quote:
        '“Simply the best. Better than all the rest. I’d recommend this product to beginners and advanced users.”',
    },
    {
      name: 'Fakhar Bahtti 333',
      title: 'Web Developer',
      avatar:
        'https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png',
      quote:
        '“I’d recommend this product to beginners and advanced users. My new site is so much faster and easier to work with than my old site. ”',
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-10 pb-16 overflow-hidden bg-gray-50">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Content */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight text-black ">
                Hey 👋 I am
                <br />
                <motion.span
                  className="text-rose-600 text-5xl inline-block"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                >
                  Arooj Jutti
                </motion.span>
              </h1>

              <p className="mt-6 text-lg text-gray-600  max-w-xl">
                Passionate about building delightful user experiences and powerful web applications. Let’s create something amazing together — with creativity, precision, and a deep focus on innovation, performance, scalability, and seamless design for real-world impact.
              </p>

              <p className="mt-6 text-xl text-gray-700 ">
                <span className="relative inline-block">
                  <span className="absolute inset-x-0 bottom-0 h-1 bg-rose-500 rounded-md animate-pulse" />
                  <span className="relative">Have a question?</span>
                </span>
                {' '}Ask me on{' '}
                <a
                  href="#"
                  title="Twitter"
                  className="inline-flex items-center gap-2 text-sky-500 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition duration-200"
                >
                  <FaTwitter className="text-xl" />
                  <span className="font-medium underline underline-offset-2">Twitter</span>
                </a>
              </p>
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="flex justify-center"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <img
                className="w-full max-w-md xl:max-w-lg transform hover:scale-105 transition duration-500 ease-in-out"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/business-woman.png"
                alt="Business Woman"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-50 sm:py-8 ">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <p className="text-lg font-medium text-rose-600 
          ">
              500 people have said how good Rareblocks
            </p>
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Our happy clients say about us
            </h2>

            <div className="mt-8 md:mt-6">
              <a
                href="#"
                className="pb-2 text-base font-bold leading-7 text-gray-600 transition-all duration-200 border-b-2 border-gray-600 hover:border-gray-600  focus:outline-none"
              >
                Check all 500 reviews
              </a>
            </div>

            <div className="relative mt-10 md:mt-24 w-full">
              <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
                <div
                  className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                  style={{
                    background:
                      'linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)',
                  }}
                />
              </div>

              <motion.div
                className="relative grid max-w-lg grid-cols-1 gap-6 mx-auto md:max-w-none lg:gap-10 md:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {testimonials.map((item, index) => (
                  <motion.div
                    key={`${item.name}-${index}`}
                    className="flex flex-col overflow-hidden shadow-2xl bg-red-500 rounded-2xl"
                    variants={cardVariants}
                  >
                    <motion.div
                      className="flex flex-col justify-between flex-1 p-6 bg-gray-100 lg:py-8 lg:px-7 rounded-2xl"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="w-5 h-5 text-[#FDB241]" />
                          ))}
                        </div>

                        <blockquote className="flex-1 mt-8">
                          <p className="text-lg leading-relaxed text-gray-900 font-pj">
                            {item.quote}
                          </p>
                        </blockquote>
                      </div>

                      <div className="flex items-center mt-8">
                        <img
                          className="flex-shrink-0 object-cover rounded-full w-11 h-11"
                          src={item.avatar}
                          alt={`${item.name}'s Avatar`}
                        />
                        <div className="ml-4 text-left">
                          <p className="text-base font-bold text-gray-900 font-pj">{item.name}</p>
                          <p className="mt-0.5 text-sm font-pj text-gray-600">{item.title}</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
