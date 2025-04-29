import React, { use, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc, collection, query, getDocs, initializeFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8-C39mqhwj91rpNZf6sP8h_nQra4RXXc",
  authDomain: "react-typesciprt-pizza.firebaseapp.com",
  projectId: "react-typesciprt-pizza",
  storageBucket: "react-typesciprt-pizza.firebasestorage.app",
  messagingSenderId: "921918263463",
  appId: "1:921918263463:web:6fa92276574702cf40cb82",
  measurementId: "G-Y2LMD323ZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// const analytics = getAnalytics(app);

function App() {

  const [sizes, setSizes] = useState([])

  useEffect(() => {
    getDocs(collection(db, "sizes")).then((querySnapshot) => {
      // @ts-ignore
      setSizes(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    })
  }, [])
  return (
    <div className="App">
      <h1>Sizes are</h1>
      <div>
        {
          // @ts-ignore
          sizes.map(({size}) => size)
        }
      </div>
    </div>
  );
}

export default App;
