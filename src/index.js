import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  orderBy,
} from 'firebase/firestore'
import {
  getAuth,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBv8_kXlTABhgWR9xfAbz8z0wyuAarpSeo",
  authDomain: "fir-app-7825e.firebaseapp.com",
  projectId: "fir-app-7825e",
  storageBucket: "fir-app-7825e.appspot.com",
  messagingSenderId: "215741555944",
  appId: "1:215741555944:web:4609c03864f426dcb4d55d",
  measurementId: "G-SMS3MMG4GT"
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const colRef = collection(db, 'books');

//Search for a author who's name equals Stephen King
const q = query(colRef, orderBy('createdAt', 'asc'));



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App
      colRef={colRef}
      db={db}
      auth={auth}
      q={q}
    />
  </React.StrictMode>
);