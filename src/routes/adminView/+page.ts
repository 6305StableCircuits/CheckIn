import { Student } from '$lib/classes/Student.js';
import { db } from '$lib/firebase.js';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const students: Array<Student> = [];
	const studentData = await getDocs(query(collection(db, "students")));
	studentData.forEach((record) => {
		if (record.exists()) {
			let recordData = record.data();
			students.push(new Student(recordData.firstName, recordData.lastName, recordData.id, recordData.scanTimes));
		}
	})

	return {
		students: students
	};
}