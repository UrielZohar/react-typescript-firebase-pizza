import React, { use, useEffect, useState } from 'react'
import './App.css'
import Login from './components/Login/Login'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { 
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  getDocs,
  initializeFirestore 
} from "firebase/firestore";
import { OrderUI, PizzaSize } from './types';
import CreateOrder from './components/CreateOrder/CreateOrder'
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
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

function App() {

  const [sizes, setSizes] = useState<Array<PizzaSize>>([])
  const [userUID, setUserUID] = useState("")

  useEffect(() => {
    getDocs(collection(db, "sizes")).then((querySnapshot) => {
      setSizes(querySnapshot.docs.map((doc) => {
        const {id, size} = doc.data() as PizzaSize;
        return { id, size };
      }))
    })
  }, [])

  const onCreateOrder = (order: OrderUI) => {
    const createdAt = new Date()
    const orderAPI = {
      ...order,
      userUID,
      createdAt: createdAt.getTime(),
    }
    setDoc(doc(db, "orders", `${userUID}${createdAt.getTime()}`), orderAPI)
      .then(() => {
        console.log("Document written with ID: ", userUID);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

  }
  return (
    <div className="App">
      <Login
        onLogin={setUserUID}
      />
      <CreateOrder 
        onCreateOrder={onCreateOrder}
        sizes={sizes}
      />
      {
        /*
          <h1>We have the sizes</h1>
          <div>
            {
              sizes.map(({size}) => (
                <div key={size}>
                  <h2>{size}</h2>
                </div>
              ))
            }
          </div>
        */
      }
    </div>
  );
}

export default App
