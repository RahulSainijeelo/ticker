// import { cert, getApps, initializeApp } from "firebase-admin/app";
// import { getFirestore } from "firebase-admin/firestore";

// const privateKey = import.meta.env.VITE_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

// const serviceAccount = {
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   clientEmail: import.meta.env.VITE_FIREBASE_CLIENT_EMAIL,
//   privateKey,
// };

// let app;
// if (!getApps().length) {
//   app = initializeApp({
//     credential: cert(serviceAccount),
//     projectId: serviceAccount.projectId,
//   });
// } else {
//   app = getApps()[0];
// }

// export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Your firebase config here
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);