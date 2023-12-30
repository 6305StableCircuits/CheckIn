import { d as db } from "../../../chunks/firebase.js";
import { getDocs, query, collection, orderBy } from "firebase/firestore";
async function load({ params }) {
  const students = [];
  const studentData = await getDocs(query(collection(db, "students"), orderBy("shopHours")));
  studentData.forEach((record) => {
    if (record.exists()) {
      let recordData = record.data();
      students.push({ name: recordData.firstName + " " + recordData.lastName, id: recordData.id, shopHours: recordData.shopHours });
    }
  });
  return {
    students
  };
}
export {
  load
};
