import {
  collection,
  updateDoc,
  deleteDoc,
  setDoc,
  doc,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import db from "./fire";
import { v4 as uuidv4 } from "uuid";
import { aggregateStatus } from "./aggregateStatus";

export const handleCreate = async (message, result, status, handleClose) => {
  try {
    await setDoc(doc(db, "jobs", uuidv4()), {
      message: message,
      result: result,
      status: status,
      created: new Date(),
      updated: new Date(),
    });
    console.log("Document created");
    handleClose();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const handleRead = (setRows) => {
  const q = query(collection(db, "jobs"), orderBy("created", "desc"));
  onSnapshot(q, (querySnapshot) => {
    const jobs = [];
    querySnapshot.forEach((doc) => {
      var obj = { ...doc.data(), id: doc.id };
      jobs.push(obj);
    });
    setRows(jobs);
  });
};

export const sortDocs = (setRows, property, order) => {
  const q = query(collection(db, "jobs"), orderBy(property, order));
  onSnapshot(q, (querySnapshot) => {
    const jobs = [];
    querySnapshot.forEach((doc) => {
      jobs.push(doc.data());
    });
    setRows(jobs);
  });
};

export const handleEditDoc = async (
  id,
  message,
  result,
  status,
  handleClose
) => {
  try {
    const docRef = doc(db, "jobs", id);
    await updateDoc(docRef, {
      message: message,
      status: status,
      result: result,
      updated: new Date(),
    });
    console.log("Document Updated Succesfully", docRef.id);
    handleClose();
  } catch (e) {
    console.error("Error editing document: ", e);
  }
};

export const handleDelete = async (id, handleClose) => {
  try {
    const docRef = doc(db, "jobs", id);
    await deleteDoc(docRef);
    console.log("Document Deleted Succesfully");
    handleClose();
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

export const handleDocIdsMilestone2 = (setIdArray) => {
  const q = query(collection(db, "milestone-2"));
  onSnapshot(q, (querySnapshot) => {
    const jobsIds = [];
    querySnapshot.forEach((doc) => {
      jobsIds.push(doc.id);
    });
    setIdArray(jobsIds);
  });
};

export const handleReadMilestone2 = (id, setAggArray, setAggStatus) => {
  var l = {};
  for (let i = 0; i < 2; i++) {
    const collRef = collection(db, "milestone-2", id, `aggregator${i + 1}`);
    const q = query(collRef);
    onSnapshot(q, (querySnapshot) => {
      const subjobs = [];
      querySnapshot.forEach((doc) => {
        var obj = { ...doc.data(), id: doc.id };
        subjobs.push(obj);
      });
      l[q._path.segments[2]] = subjobs;
      if (Object.keys(l).length === 2) {
        setAggArray(l);
        var statusArr = [];
        for (let j = 0; j < 2; j++) {
          statusArr.push(l[`aggregator${j + 1}`][0].status);
          statusArr.push(l[`aggregator${j + 1}`][1].status);
        }
        setAggStatus(aggregateStatus(statusArr));
      }
    });
  }
};
