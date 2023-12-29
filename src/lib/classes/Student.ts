import { db } from "$lib/firebase";
import { QueryDocumentSnapshot, collection, doc, getDoc, getDocs, query, where, type DocumentData, DocumentReference, updateDoc } from "firebase/firestore";

/** Something about the student class */
export class Student {
    /** The first name of the student */
    firstName: string;
    /** The last name of the student */
    lastName: string;
    /** The Student ID of the student*/
    id: number;
    /** An array of check in and check out times for the student */
    scanTimes: Array<EpochTimeStamp>;
    /** The total number of hours a student has spent in shop */
    shopHours: number;
    /** The Firebase document that this student is linked with */
    firebaseDoc: DocumentReference<DocumentData, DocumentData>

    constructor(firstName: string, lastName: string, id: number, scanTimes: Array<EpochTimeStamp>, shopHours: number) {
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

    shown(search: string) {
        return (this.firstName.toLowerCase() + " " + this.lastName.toLowerCase()).includes(search) || this.id.toString().includes(search);
    }

    valueOf() {
        return this.shopHours;
    }

    async update() {
        await updateDoc(this.firebaseDoc, {
            scanTimes: this.scanTimes,
            shopHours: this.shopHours
        })
    }
}