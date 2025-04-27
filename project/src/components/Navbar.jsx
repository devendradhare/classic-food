import React from "react";
import { Menu, ShoppingCart, Home, Info, Phone } from "lucide-react";
import logo from "../images/logo.png";

const Navbar = ({
  activeSection,
  setActiveSection,
  cartItemCount,
  onCartClick,
}) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center">
            <img src={logo} className="mr-2 h-16" />
            Classic Food
          </h1>

          <div className="hidden md:flex space-x-8">
            {["home", "menu", "about", "table", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`₹{
                  activeSection === section
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600 hover:text-orange-500"
                } capitalize transition-colors duration-200`}
              >
                {section}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative" onClick={onCartClick}>
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button className="md:hidden">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
