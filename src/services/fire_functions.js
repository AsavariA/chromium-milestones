import { collection, updateDoc, deleteDoc,  doc, setDoc, query, onSnapshot, orderBy } from "firebase/firestore";
import db from "./fire";

export const handleCreate = async (message, result, status, handleClose) => {
  try {
    const docRef = await setDoc(doc(db, "jobs", ), {
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
      var obj = {...doc.data(), id: doc.id}
      jobs.push(obj);
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

export const handleEditDoc = async (id, message, result, status, handleClose) => {
  try {
    const docRef = doc(db, "jobs", id);
    await updateDoc(docRef, {
      message: message,
      status: status,
      result: result,
      updated: new Date()
  });
    console.log("Document Updated Succesfully", docRef.id);
    handleClose()
  } catch (e) {
    console.error("Error editing document: ", e);
  }
}

export const handleDelete = async (id, handleClose) => {
  try {
    const docRef = doc(db, "jobs", id);
    await deleteDoc(docRef);
    console.log("Document Deleted Succesfully");
    handleClose()
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
}