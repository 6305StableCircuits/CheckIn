<script lang="ts">
    import type { Student } from "$lib/classes/Student";
    import { db } from "$lib/firebase";
    import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

    export let student: Student;

    let checkedIn = student.scanTimes.length % 2 != 0;

    function checkIn() {
        student.scanTimes.push(Date.now());
        checkedIn = student.scanTimes.length % 2 != 0;
        student.update();
        }

    function checkOut() {
        student.scanTimes.push(Date.now());
        student.shopHours += (student.scanTimes[student.scanTimes.length - 1] - student.scanTimes[student.scanTimes.length - 2]) / 3600000;
        checkedIn = student.scanTimes.length % 2 != 0;
        student.update();
    }
</script>

<div class="bg-white min-w-min p-5 rounded-2xl w-full">
    <h1 class="text-2xl">{student.firstName} {student.lastName}</h1>
    <h2 class="text-xl">ID: {student.id}</h2>
    {#if !checkedIn}
        <button class="bg-green-500 hover:bg-green-600 p-1 py-3 text-lg w-full mt-2 flex-row rounded-2xl" on:click={checkIn}>Check In</button>
    {:else if checkedIn}
        <button class="bg-red-600 hover:bg-red-700 p-1 py-3 text-lg text-white w-full mt-2 flex-row rounded-2xl" on:click={checkOut}>Check Out</button>
    {/if}
</div>