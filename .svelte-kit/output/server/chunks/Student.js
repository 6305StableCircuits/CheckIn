import { d as db } from "./firebase.js";
import { doc, updateDoc } from "firebase/firestore";
class Student {
  /** The first name of the student */
  firstName;
  /** The last name of the student */
  lastName;
  /** The Student ID of the student*/
  id;
  /** An array of check in and check out times for the student */
  scanTimes;
  /** The total number of hours a student has spent in shop */
  shopHours;
  /** The Firebase document that this student is linked with */
  firebaseDoc;
  constructor(firstName, lastName, id, scanTimes, shopHours) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.scanTimes = scanTimes;
    this.shopHours = shopHours;
    this.firebaseDoc = doc(db, "students/" + this.id);
  }
  serialize() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      id: this.id,
      scanTimes: this.scanTimes,
      shopHours: this.shopHours
    };
  }
  shown(search) {
    return (this.firstName.toLowerCase() + " " + this.lastName.toLowerCase()).includes(search) || this.id.toString().includes(search);
  }
  valueOf() {
    return this.shopHours;
  }
  async update() {
    await updateDoc(this.firebaseDoc, {
      scanTimes: this.scanTimes,
      shopHours: this.shopHours
    });
  }
}
export {
  Student as S
};
