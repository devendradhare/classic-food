// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase } from "firebase/database";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_apiKey,
  authDomain: import.meta.env.VITE_API_authDomain,
  databaseURL: import.meta.env.VITE_API_databaseURL,
  projectId: import.meta.env.VITE_API_projectId,
  storageBucket: import.meta.env.VITE_API_storageBucket,
  messagingSenderId: import.meta.env.VITE_API_messagingSenderId,
  appId: import.meta.env.VITE_API_appId,
  measurementId: import.meta.env.VITE_API_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const rdb = getDatabase(app);
const auth = getAuth(app);

const fetchMenuItems = async () => {
  const menuCollectionRef = collection(db, "menuItems");

  try {
    const querySnapshot = await getDocs(menuCollectionRef);
    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Firestore document ID
      ...doc.data(), // Actual data
    }));

    console.log(items); // Use this in state or UI
    return items;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return [];
  }
};

// Function to check if the current user is logged in
const checkUserLoggedIn2 = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      console.log("User is logged in:", user.email);
    } else {
      // No user is signed in
      console.log("User is not logged in");
    }
  });
};

const checkUserLoggedIn = async () => {
  return await checkUserLoggedIn2((user) => {
    if (user) return true;
    return false;
  });
};

export { db, fetchMenuItems, checkUserLoggedIn, app, rdb, auth, signOut };
