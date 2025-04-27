import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Menu from "./components/Menu";
import TableStatus from "./components/TableStatus";
import About from "./components/About.jsx";
import Contact from "./components/Contact";
import CartPage from "./components/CartPage";
import Invoice from "./components/Invoice";
import Footer from "./components/Footer";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminPanel from "./admin/AdminPanel.jsx";
import toast, { Toaster } from "react-hot-toast";

import { collection, addDoc } from "firebase/firestore";
import { checkUserLoggedIn, db, auth } from "./firebase";
import { useAppContext } from "./contextAPI/AppContextProvider.jsx";

function App() {
  const { activeSection, setActiveSection } = useAppContext();
  const {
    cartItems,
    setCartItems,
    handleUpdateQuantity,
    handleRemoveItem,
    handleCartClick,
    handleGenerateInvoice,
    showInvoice,
    setShowInvoice,
  } = useAppContext();

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <Home />;
      case "menu":
        return <Menu />;
      case "table":
        return <TableStatus tableStatus={{}} />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      case "cart":
        return <CartPage />;
      case "admin":
        return auth.currentUser ? (
          <AdminPanel />
        ) : (
          <AdminLogin onLogin={() => setActiveSection("adminPanel")} />
        );
      case "adminPanel":
        if (!auth.currentUser) {
          setActiveSection("admin");
          return <AdminLogin onLogin={() => setActiveSection("adminPanel")} />;
        }
        return <AdminPanel />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={handleCartClick}
      />
      <main className="pt-16 flex-grow">{renderSection()}</main>
      <Footer />

      {showInvoice && (
        <Invoice
          items={cartItems}
          onClose={() => {
            setShowInvoice(false);
            setCartItems([]);
            setActiveSection("menu");
          }}
        />
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
