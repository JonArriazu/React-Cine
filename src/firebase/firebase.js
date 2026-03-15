import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzqPt1gpu2bzNFG8JFEFVBBhgFa4mnPgw",
  authDomain: "zinema-aretoa.firebaseapp.com",
  projectId: "zinema-aretoa",
  storageBucket: "zinema-aretoa.firebasestorage.app",
  messagingSenderId: "24714572906",
  appId: "1:24714572906:web:caaffe9ad893d4d276c613"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;