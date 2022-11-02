// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, setDoc, getFirestore, collection, getDocs, where, query } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MEESAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export const storage = getStorage(app);
export const storageRef = ref(storage);

// Get a list of cities from your database
export async function getComments() {
  const citiesCol = query(collection(db, "comments"), where('auth','==','heom'));
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}

export async function setComments(commentsId, commentsValue) {
  const comments = await setDoc(doc(db, "comments", commentsId), {auth: 'heom', 'comments': commentsValue});
  console.log(comments);
}
