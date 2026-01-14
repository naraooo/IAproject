import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBC6uTjXGnez9Y_tK1bIJAABSnhJEe0eSY",
  authDomain: "iaproject-2ce08.firebaseapp.com",
  projectId: "iaproject-2ce08",
  storageBucket: "iaproject-2ce08.firebasestorage.app",
  messagingSenderId: "294586079672",
  appId: "1:294586079672:web:5ed612a74252951b27574d",
  measurementId: "G-6RPS8MMRRN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };