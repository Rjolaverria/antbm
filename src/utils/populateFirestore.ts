import { addDoc, collection, Firestore } from "firebase/firestore";

import data from "../data/dummy_data.json";

export const populateFireStore = async (firestore: Firestore) => {
  try {
    data.forEach(
      async (item) =>
        await addDoc(collection(firestore, "classifications"), item)
    );
    console.log("Data added successfully");
  } catch (e) {
    console.error("Error adding data");
  }
};
