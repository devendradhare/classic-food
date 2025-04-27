import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useAppContext } from "../contextAPI/AppContextProvider";

const Menu = () => {
  const { handleAddToCart } = useAppContext();
  const { menuItems } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const categories = Array.from(
    new Set(menuItems.map((item) => item.category))
  );

  const filteredItems = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return menuItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

  const itemsByCategory = useMemo(() => {
    const categorized = {};
    categories.forEach((category) => {
      const items = filteredItems.filter((item) => item.category === category);
      if (items.length > 0) {
        categorized[category] = items;
      }
    });
    return categorized;
  }, [filteredItems, categories]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search our menu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-b-2 border-gray-200 focus:border-orange-500 focus:outline-none bg-transparent text-lg"
          />
          <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
        </div>
      </div>

      {Object.entries(itemsByCategory).length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No items found matching your search.
          </p>
        </div>
      ) : (
        <div className="grid gap-16">
          {Object.entries(itemsByCategory).map(([category, items]) => (
            <div key={category} className="menu-section">
              <h2 className="text-3xl font-serif text-center mb-8 relative">
                <span className="bg-white px-4 relative z-10">{category}</span>
                <div className="absolute w-full h-px bg-gray-200 top-1/2 left-0 -z-0"></div>
              </h2>

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-32 h-32 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-medium">{item.name}</h3>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-semibold">
                            ₹{item.price.toFixed(2)}
                          </span>
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
