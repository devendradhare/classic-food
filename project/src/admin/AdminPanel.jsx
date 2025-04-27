import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../contextAPI/AppContextProvider";
import Header from "./Header";
import TableStatus from "./TableStatus";
import OrdersTable from "./OrdersTable";
import SubscribersTable from "./SubscribersTable";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    tableStatus,
    getAllSubscribedEmails,
    logoutUser,
    setActiveSection,
    saveAndClearTheTable,
    get50LatestOrders,
  } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      const emails = await getAllSubscribedEmails();
      setSubscribers(emails);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const ordersData = await get50LatestOrders();
      console.log("ordersData", ordersData);
      setOrders(ordersData);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleLogout = () => {
    logoutUser();
    setActiveSection("home");
    toast.success("Logged out successfully!");
  };

  const toggleDelivered = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, delivered: !order.delivered } : order
      )
    );
  };

  const togglePaid = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, paid: !order.paid } : order
      )
    );
  };

  const handleSaveAndClear = (tableNumber) => {
    saveAndClearTheTable(tableNumber);
    // console.log(tableStatus[`table0${tableNumber}`]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header onLogout={handleLogout} />
        <div className="border">
          <div className="min-h-fit bg-gray-50 py-8">
            <TableStatus
              tableStatus={tableStatus}
              handleSaveAndClear={handleSaveAndClear}
            />
          </div>
        </div>
        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === "orders"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setActiveTab("subscribers")}
                className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                  activeTab === "subscribers"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Subscribers
              </button>
            </nav>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">Loading...</div>
            ) : activeTab === "orders" ? (
              <OrdersTable
                orders={orders}
                toggleDelivered={toggleDelivered}
                togglePaid={togglePaid}
              />
            ) : (
              <SubscribersTable subscribers={subscribers} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
