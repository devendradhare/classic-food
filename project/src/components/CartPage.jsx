import React, { useState } from "react";
import { ArrowLeft, Printer } from "lucide-react";
import { useAppContext } from "../contextAPI/AppContextProvider";

const CartPage = ({ items }) => {
  const {
    userDetails,
    setUserDetails,
    handleGenerateInvoice,
    setActiveSection,
    handleRemoveItem,
    handleUpdateQuantity,
    cartItems,
    // setOrderOnTheTable
  } = useAppContext();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleGenerateInvoiceClick = () => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      invoiceNumber: `INV-${Date.now()}`,
      date: new Date().toLocaleDateString(),
    }));
    handleGenerateInvoice();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => setActiveSection("menu")}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Menu
        </button>
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <button
            onClick={() => setActiveSection("menu")}
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-4 border-b last:border-0"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">
                      ₹{item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 border rounded"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 border rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST (5%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-3">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="userName"
                  className="block text-gray-700 font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="userName"
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={userDetails.userName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="userEmail"
                  className="block text-gray-700 font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="userEmail"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={userDetails.userEmail}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="tableNumber"
                  className="block text-gray-700 font-medium"
                >
                  Table Number
                </label>
                <input
                  type="number"
                  id="tableNumber"
                  placeholder="Enter table number"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={userDetails.tableNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <button
                onClick={handleGenerateInvoiceClick}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-lg transition-colors ${
                  userDetails.userName &&
                  userDetails.userEmail &&
                  userDetails.tableNumber
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={
                  !userDetails.userName ||
                  !userDetails.userEmail ||
                  !userDetails.tableNumber
                }
              >
                <Printer className="w-5 h-5 mr-2" />
                Generate Invoice & Pay
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
