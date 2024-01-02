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
    private _scanTimes: Array<EpochTimeStamp>;
    /** The total number of hours a student has spent in shop */
    shopHours: number;
    /** The Firebase document that this student is linked with */
    firebaseDoc: DocumentReference<DocumentData, DocumentData>

    constructor(firstName: string, lastName: string, id: number, scanTimes: Array<EpochTimeStamp>) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this._scanTimes = scanTimes;
        this.shopHours = 0;
        this.firebaseDoc = doc(db, "students/" + this.id);

        let i = 0;
        for (i; i < scanTimes.length; i += 2) {
            this.shopHours += (scanTimes[i+1] - scanTimes[i]) / 3600000;
        }
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
            scanTimes: this._scanTimes,
        })
    }

    get name() {
        return this.firstName + " " + this.lastName;
    }

    get scanTimes() {
        return this._scanTimes;
    }

    set scanTimes(val: EpochTimeStamp[]) {
        this.shopHours = 0;
        this._scanTimes = val;
        let i = 0;
        for (i; i < this._scanTimes.length; i += 2) {
            this.shopHours += (this._scanTimes[i+1] - this._scanTimes[i]) / 3600000;
        }
    }
}