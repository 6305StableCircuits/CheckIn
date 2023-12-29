// @ts-nocheck
import { Student } from '$lib/classes/Student.js';
import { db } from '$lib/firebase.js';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

type TableEntry = {
	name: string;
	id: number;
	shopHours: number;
}

/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export async function load({ params }) {
	const students: Array<TableEntry> = [];
	const studentData = await getDocs(query(collection(db, "students"), orderBy("shopHours")));
	studentData.forEach((record) => {
		if (record.exists()) {
			let recordData = record.data();
			students.push({name: recordData.firstName + ' ' + recordData.lastName, id: recordData.id, shopHours: recordData.shopHours});
		}
	})

	return {
		students: students
	};
}