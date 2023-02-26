import { initializeApp } from "firebase/app";
// import * as firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/firestore';

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from "@firebase/firestore";
import SHOP_DATA from "../../shop-data";
//getDoc - Getting the document data.
const firebaseConfig = {
  apiKey: "AIzaSyCJz2nptH97sn4VIeUPeQ0mzszUgvgj8Ok",
  authDomain: "crwm-clothing-db-63a67.firebaseapp.com",
  projectId: "crwm-clothing-db-63a67",
  storageBucket: "crwm-clothing-db-63a67.appspot.com",
  messagingSenderId: "878492628082",
  appId: "1:878492628082:web:025baec260f8e75cd3beeb",
  measurementId: "G-2N5JB2Z4D4",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
// const facebookProvider = new FacebookAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});
export const db = getFirestore(firebaseApp);

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

// export  const signInWithFBPopup = () => signInWithPopup(auth, facebookProvider);

export const createUserDocument = async (userAuth, extraField = {}) => {
  //See if there is exiting document refernce
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef); // User doc reference using uid
  const userDocument = getDoc(userDocRef);
  console.log((await userDocument).exists()); //Check if the document exits or not.

  //if user data exits
  if ((await userDocument).exists()) {
  } else {
    //if user data doesn't exist set Doc with data from userAuth in my collection

    const { displayName, email } = userAuth;
    let createdAt = new Date();
    let userData = {
      displayName,
      email,
      createdAt,
      ...extraField,
    };
    try {
      await setDoc(userDocRef, userData);
    } catch (error) {
      console.log("Error", error.message);
    }
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListner = (callback) =>
  onAuthStateChanged(auth, callback);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((obj) => {
    const docRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(docRef, obj);
  });
  await batch.commit();
  console.log("Done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);

  return querySnapShot.docs.reduce((acc, docSnapshop)=>{
    const {title, items} = docSnapshop.data();
    acc[title.toLowerCase()] = items;
    return acc;
  },{})
};
