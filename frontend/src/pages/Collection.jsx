import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { VscTypeHierarchySub } from "react-icons/vsc";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 pt-14 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filter */}
          <div className="lg:w-64">
            <div className="hidden lg:block sticky top-24 space-y-6">
              {/* Category */}
              <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-pink-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  Categories
                </h3>
                <div className="space-y-3">
                  {["Men", "Women", "Kids"].map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        value={cat}
                        checked={category.includes(cat)}
                        onChange={toggleCategory}
                        className="accent-pink-500 w-5 h-5 rounded-md border-gray-300"
                      />
                      <span className="text-gray-700 group-hover:text-pink-600 transition">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <VscTypeHierarchySub className="text-pink-400" />
                  Type
                </h3>
                <div className="space-y-3">
                  {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        value={type}
                        checked={subCategory.includes(type)}
                        onChange={toggleSubCategory}
                        className="accent-pink-500 w-5 h-5 rounded-md border-gray-300"
                      />
                      <span className="text-gray-700 group-hover:text-pink-600 transition">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="w-full bg-white text-gray-800 px-5 py-3 rounded-xl shadow border font-semibold flex justify-between items-center"
              >
                Filters
                <svg
                  className={`w-5 h-5 transform ${
                    showFilter ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {showFilter && (
                <div className="bg-white mt-4 p-6 rounded-xl shadow space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-800">
                      Categories
                    </h4>
                    {["Men", "Women", "Kids"].map((cat) => (
                      <label key={cat} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          value={cat}
                          checked={category.includes(cat)}
                          onChange={toggleCategory}
                          className="accent-pink-500 w-5 h-5"
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-800">Type</h4>
                    {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                      <label key={type} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          value={type}
                          checked={subCategory.includes(type)}
                          onChange={toggleSubCategory}
                          className="accent-pink-500 w-5 h-5"
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Section */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <Title text1="ALL" text2="COLLECTIONS" />
              <div className="relative">
                <select
                  onChange={(e) => setSortType(e.target.value)}
                  className="bg-white border border-pink-200 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200 shadow-sm"
                >
                  <option value="relavent">Sort by: Relevant</option>
                  <option value="low-high">Sort by: Low to High</option>
                  <option value="high-low">Sort by: High to Low</option>
                </select>
              </div>
            </div>

            {filterProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filterProducts.map((item, index) => (
                  <ProductItem
                    key={index}
                    name={item.name}
                    id={item._id}
                    price={item.price}
                    image={item.image}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-6 bg-gradient-to-br from-pink-50 to-white rounded-2xl shadow-lg border border-pink-100 transition-all duration-300">
                <div className="text-6xl text-pink-400 mb-6 animate-bounce">
                  🛒
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Oops! No Products Found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms to find what you’re
                  looking for.
                </p>
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-medium px-6 py-2 rounded-full shadow-sm transition"
                >
                  Go Back to Top
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
