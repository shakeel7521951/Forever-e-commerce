import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex items-center gap-3 mb-6 animate-fade-in">
      <h2 className="text-lg sm:text-xl font-semibold tracking-wide text-gray-600">
        {text1} <span className="text-pink-600 font-bold">{text2}</span>
      </h2>
      <span className="w-10 sm:w-16 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-md"></span>
    </div>
  )
}

export default Title;
