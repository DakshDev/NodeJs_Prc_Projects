import { firebaseApp } from "../connections/firebase.js";
import { getFirestore, addDoc, collection, updateDoc, doc, deleteDoc, getDoc, getDocs, query, where } from "firebase/firestore";

// Initialiaze firebase app
const firestoreDB = getFirestore(firebaseApp);
const DBPath = "users"




// Create User
const createUser = async (userDetails) => {
  return await addDoc(collection(firestoreDB, DBPath), userDetails)
}
// Read User
const readUser = async (id, first, condition, second) => {
  // single doc Read
  if(id){
    const docRef = doc(firestoreDB, DBPath, id);
    const dataSnap = await getDoc(docRef);
    if(dataSnap.exists()) return dataSnap.data();
    return null;
  }
  // Read By Query
  if(first && condition && second){
    const colRef = collection(firestoreDB, DBPath);
    const q = query(colRef, where(first, condition, second))
    const dataSnap = await getDocs(q)
    let usersData = [];
    if(dataSnap.size > 0) {
      dataSnap.forEach(data => usersData.push(data.data()));
      return usersData;
    }
    return null;
  }
  // Multiple Doc Read
  const colRef = collection(firestoreDB, DBPath);
  const dataSnap = await getDocs(colRef);
  let usersData = [];
  if(dataSnap.size > 0) {
    dataSnap.forEach(data => usersData.push(data.data()))
    return usersData;
  }
  return null;
}
// Update User
const updateUser = async (id, updatedDetails) => {
  const docRef = doc(firestoreDB, DBPath, id)
  return await updateDoc(docRef, updatedDetails)
}
// Delete User
const deleteUser = async (id) => {
  const docRef = doc(firestoreDB, DBPath, id)
  return await deleteDoc(docRef)
}





// Export All
export {
  createUser,
  readUser,
  updateUser,
  deleteUser
}