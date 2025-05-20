// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB5Y-Jz68vpbyp7xmnd0szhHtJDxid90kQ",
//   authDomain: "fir-miniproject-57f2d.firebaseapp.com",
//   projectId: "fir-miniproject-57f2d",
//   storageBucket: "fir-miniproject-57f2d.firebasestorage.app",
//   messagingSenderId: "714760418991",
//   appId: "1:714760418991:web:5cfe3dedf2b466b20e065a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp)

export { db }
