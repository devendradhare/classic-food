import React from "react";
import { useAppContext } from "../contextAPI/AppContextProvider";

const Invoice = ({ items, onClose }) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const gst = subtotal * 0.05;
  const total = subtotal + gst;
  // const invoiceNumber = `INV-${Date.now()}`;
  // const date = new Date().toLocaleDateString();

  const { userDetails, setUserDetails } = useAppContext();
  //   userName: "",
  //   userEmail: "",
  //   tableNumber: "",
  //   invoiceNumber: "",
  //   date: date,

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="p-8" id="invoice-content">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold">Classic Food</h2>
              <p className="text-gray-600">classic food Restaurant indore</p>
              <p className="text-gray-600">MP, 453331</p>
              <p className="text-gray-600">Tel: +91 62673 14645</p>
            </div>
            <div className="">
              <h3 className="text-xl font-semibold">CUSTOMER DETAILS</h3>
              <p className="text-gray-600">name: {userDetails.userName}</p>
              <p className="text-gray-600">email: {userDetails.userEmail}</p>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-semibold">INVOICE</h3>
              <p className="text-gray-600">#{userDetails.invoiceNumber}</p>
              <p className="text-gray-600">Date: {userDetails.date}</p>
            </div>
          </div>

          <table className="w-full mb-8">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Item</th>
                <th className="text-center py-2">Quantity</th>
                <th className="text-right py-2">Price</th>
                <th className="text-right py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2">{item.name}</td>
                  <td className="text-center py-2">{item.quantity}</td>
                  <td className="text-right py-2">₹{item.price.toFixed(2)}</td>
                  <td className="text-right py-2">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>GST (5%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-8 text-center text-gray-600">
            <p>Thank you for dining with us!</p>
          </div>
        </div>

        <div className="border-t p-4 flex justify-end space-x-4">
          <button
            onClick={() => {
              window.print();
            }}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
          >
            Print Invoice
          </button>
          <button
            onClick={onClose}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
