import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useAppContext } from '../contextAPI/AppContextProvider';


const Home = () => {
  const { setActiveSection } = useAppContext();
  return (
    <div className="relative">
      <div className="h-screen relative">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000"
            alt="Restaurant interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome to Classic Food
            </h1>
            <p className="text-xl text-white mb-8">
              Experience the perfect blend of traditional flavors and modern cuisine
            </p>
            <button
              onClick={() => setActiveSection('menu')}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center"
            >
              View Our Menu
              <ArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Dishes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800"
                alt="Featured dish 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Signature Steak</h3>
                <p className="text-gray-600">
                  Premium cut steak grilled to perfection with seasonal vegetables
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=800"
                alt="Featured dish 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Fresh Seafood Pasta</h3>
                <p className="text-gray-600">
                  Handmade pasta with fresh seafood in a light white wine sauce
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800"
                alt="Featured dish 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Dessert Special</h3>
                <p className="text-gray-600">
                  Chef's selection of house-made desserts that change daily
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;