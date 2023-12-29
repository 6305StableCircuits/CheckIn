import { Student } from '$lib/classes/Student.js';
import { db } from '$lib/firebase.js';
import { error } from '@sveltejs/kit';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

type TableEntry = {
	name: string;
	id: number;
	shopHours: number;
}

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const id = parseInt(params.student);
	if (Number.isNaN(id)) {
		throw error(404, {
			message: 'Malformed ID'
		});
	}
	let student: Student;
	const studentQuery = await getDocs(query(collection(db, "students"), where("id", "==", id)));
	if (studentQuery.empty || studentQuery.size > 1) {
		throw error(404, {
			message: 'Invalid ID'
		});
	}
	try {
		const studentData = studentQuery.docs[0].data();
		student = new Student(studentData.firstName, studentData.lastName, studentData.id, studentData.scanTimes, studentData.shopHours);
		
		return {
			student: student
		};
	} catch {
		throw error(500, {
			message: 'Malformed Student Data'
		})
	}
}