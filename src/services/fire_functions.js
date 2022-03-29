import { collection, addDoc, query, onSnapshot, orderBy } from "firebase/firestore";
import db from "./fire";

export const handleCreate = async (message, result, status, handleClose) => {
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
    handleClose()
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const handleRead = (setRows) => {
  const q = query(collection(db, "jobs"), orderBy("created", "desc"));
  onSnapshot(q, (querySnapshot) => {
    const jobs = [];
    querySnapshot.forEach((doc) => {
      jobs.push(doc.data());
    });
    setRows(jobs)
  });
};

export const sortDocs = (setRows, property, order) => {
  const q = query(collection(db, "jobs"), orderBy(property, order));
  onSnapshot(q, (querySnapshot) => {
    const jobs = [];
    querySnapshot.forEach((doc) => {
      jobs.push(doc.data());
    });
    setRows(jobs)
  });
};
