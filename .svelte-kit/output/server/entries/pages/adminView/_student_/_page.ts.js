import { S as Student } from "../../../../chunks/Student.js";
import { d as db } from "../../../../chunks/firebase.js";
import { e as error } from "../../../../chunks/index.js";
import { getDocs, query, collection, where } from "firebase/firestore";
async function load({ params }) {
  const id = parseInt(params.student);
  if (Number.isNaN(id)) {
    throw error(404, {
      message: "Malformed ID"
    });
  }
  let student;
  const studentQuery = await getDocs(query(collection(db, "students"), where("id", "==", id)));
  if (studentQuery.empty || studentQuery.size > 1) {
    throw error(404, {
      message: "Invalid ID"
    });
  }
  try {
    const studentData = studentQuery.docs[0].data();
    student = new Student(studentData.firstName, studentData.lastName, studentData.id, studentData.scanTimes, studentData.shopHours);
    return {
      student
    };
  } catch {
    throw error(500, {
      message: "Malformed Student Data"
    });
  }
}
export {
  load
};
