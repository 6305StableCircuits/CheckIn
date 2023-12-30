import { S as Student } from "../../chunks/Student.js";
import { d as db } from "../../chunks/firebase.js";
import { getDocs, collection } from "firebase/firestore";
async function load({ params }) {
  const students = [];
  const studentData = await getDocs(collection(db, "students"));
  studentData.forEach((record) => {
    if (record.exists()) {
      let recordData = record.data();
      students.push(new Student(recordData.firstName, recordData.lastName, recordData.id, recordData.scanTimes, recordData.shopHours));
    }
  });
  return {
    students
  };
}
export {
  load
};
