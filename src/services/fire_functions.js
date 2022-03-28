import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import db from "./fire";

export const handleCreate = async (message, result, status) => {
  console.log(message, result, status);
  try {
    const docRef = await addDoc(collection(db, "jobs"), {
      message: message,
      result: result,
      status: status,
      created: new Date(),
      updated: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const handleRead = () => {
  const q = query(collection(db, "jobs"));
  onSnapshot(q, (querySnapshot) => {
    const jobs = [];
    querySnapshot.forEach((doc) => {
      jobs.push(doc.data());
    });
    console.log(jobs);
  });
};
