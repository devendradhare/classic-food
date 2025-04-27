import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchMenuItems, rdb, db, signOut, auth } from "../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { ref, set, onValue } from "firebase/database";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [userDetails, setUserDetails] = useState({
    userName: "",
    userEmail: "",
    tableNumber: "",
    invoiceNumber: "",
    date: "",
  });
  const [activeSection, setActiveSection] = useState("home");
  const [tableStatus, setTableStatus] = useState({});
  const [tableNumber, setTableNumber] = useState(null);

  useEffect(() => {
    const tableNumber = new URL(window.location.href).searchParams.get("tn");
    console.log("Table Number:", tableNumber);
    setTableNumber(tableNumber);
    setUserDetails((prevDetails) => ({ ...prevDetails, tableNumber }));
  }, []);

  useEffect(() => {
    const featching = async () => {
      try {
        const items = await fetchMenuItems();
        setMenuItems(items);
        console.log("Fetched menu items:", items); // Log the fetched items
        return items;
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setMenuItems([]);
        return [];
      }
    };
    featching();
  }, [setMenuItems]);

  // set order on the table
  const setOrderOnTheTable = async () => {
    const tableNo = userDetails.tableNumber.toString().padStart(2, "0");
    set(ref(rdb, "tables/table" + tableNo), { userDetails, cartItems });
  };

  // get order ditails on te table
  const readDataOnce = async () => {
    const snapshot = await get(ref(rdb, "tables/table01"));
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  };

  // read data in realtime form real time database
  useEffect(() => {
    const userRef = ref(rdb, "tables");
    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setTableStatus(data);
      console.log("Live Data:", data);
    });

    return () => unsubscribe();
  }, []);

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCartClick = () => {
    setActiveSection("cart");
  };

  const handleGenerateInvoice = async () => {
    await setOrderOnTheTable();
    setShowInvoice(true);
  };

  function handleEmailSubscribe(e, email) {
    e.preventDefault();
    const subscribersCollectionRef = collection(db, "subscribers");

    // Check if the email already exists
    const emailQuery = query(
      subscribersCollectionRef,
      where("email", "==", email)
    );

    getDocs(emailQuery)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          console.log("Email already subscribed:", email);
          alert("This email is already subscribed!");
        } else {
          // Add the email if it doesn't exist
          addDoc(subscribersCollectionRef, { email })
            .then(() => {
              console.log("Subscribed email added to Firestore:", email);
              alert("Thank you for subscribing!");
            })
            .catch((error) => {
              console.error("Error adding subscribed email:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error checking for existing email:", error);
      });
  }

  const getAllSubscribedEmails = async () => {
    const subscribersCollectionRef = collection(db, "subscribers");

    try {
      const querySnapshot = await getDocs(subscribersCollectionRef);
      const emails = querySnapshot.docs.map((doc) => doc.data().email);
      console.log("Subscribed Emails:", emails);
      return emails;
    } catch (error) {
      console.error("Error fetching subscribed emails:", error);
      return [];
    }
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  };

  const handleAdminLogin = async (email, password) => {
    try {
      const userLoginData = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("userLoginData", userLoginData);
      toast.success("Logged in successfully");
      setActiveSection("adminPanel");
    } catch (error) {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in
  //     setUser(user);
  //     console.log("User is logged in:", user.email);
  //   } else {
  //     // No user is signed in
  //     setUser(null);
  //     console.log("User is not logged in");
  //   }
  // });

  const saveAndClearTheTable = async (tableNumber) => {
    console.log("-----------", tableStatus[`table0${tableNumber}`]);
    try {
      // Get the completed order from the table status
      const completedOrder = tableStatus[`table0${tableNumber}`];

      if (!completedOrder) {
        console.error(`No data found for table ${tableNumber}`);
        toast.error(`No data found for table ${tableNumber}`);
        return;
      }

      // Add a timestamp to the completed order
      const orderWithTimestamp = {
        ...completedOrder,
        timestamp: new Date(), // Add the current date and time
      };

      // Reference to the Firestore 'orders' collection
      const ordersCollectionRef = collection(db, "orders");

      // Push the completed order with timestamp to Firestore
      await addDoc(ordersCollectionRef, orderWithTimestamp);

      console.log(`Order for table ${tableNumber} saved to Firestore.`);
      toast.success(`Order for table ${tableNumber} saved successfully!`);

      // Clear the table data from the Realtime Database
      const tableRef = ref(rdb, `tables/table0${tableNumber}`);
      await set(tableRef, null);

      console.log(`Table ${tableNumber} cleared.`);
      toast.success(`Table ${tableNumber} cleared successfully!`);
    } catch (error) {
      console.error("Error saving and clearing the table:", error);
      toast.error("Failed to save and clear the table.");
    }
  };

  const get50LatestOrders = async () => {
    const ordersCollectionRef = collection(db, "orders");

    try {
      // Create a query to fetch the latest 50 orders, ordered by timestamp
      const ordersQuery = query(
        ordersCollectionRef,
        orderBy("timestamp", "desc"),
        limit(50)
      );

      // Execute the query
      const querySnapshot = await getDocs(ordersQuery);

      // Map the results to an array of orders
      const orders = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Firestore document ID
        ...doc.data(), // Actual order data
      }));

      console.log("Latest 50 Orders:", orders);
      return orders;
    } catch (error) {
      console.error("Error fetching latest orders:", error);
      return [];
    }
  };

  return (
    <AppContext.Provider
      value={{
        // states
        menuItems,
        setMenuItems,
        activeSection,
        setActiveSection,
        cartItems,
        setCartItems,
        showInvoice,
        setShowInvoice,
        userDetails,
        setUserDetails,
        tableStatus,
        setTableStatus,
        tableNumber,
        // functions
        handleAddToCart,
        handleUpdateQuantity,
        handleRemoveItem,
        handleCartClick,
        handleGenerateInvoice,
        saveAndClearTheTable,
        // auth functions
        handleAdminLogin,
        logoutUser,
        // firestore database functions
        handleEmailSubscribe,
        getAllSubscribedEmails,
        get50LatestOrders,
        // realtime database functions
        setOrderOnTheTable,
        readDataOnce,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
