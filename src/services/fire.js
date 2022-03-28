import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC8diYBH2DuAmV6uQjTaFFW6Zl3q-A5GiA",
  authDomain: "asa-chromium-milestone.firebaseapp.com",
  projectId: "asa-chromium-milestone",
  storageBucket: "asa-chromium-milestone.appspot.com",
  messagingSenderId: "772113369066",
  appId: "1:772113369066:web:34f9c1f6b84ac2b30ed493",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

