<script lang="ts">
    import { goto } from "$app/navigation";
    import Navbar from "$lib/components/Navbar.svelte";
    import ShopDayCard from "$lib/components/ShopDayCard.svelte";
    import { db } from "$lib/firebase";
    import { setDefaultEventParameters } from "firebase/analytics";
    import { deleteDoc, doc } from "firebase/firestore";
    import { focusTrap } from "svelte-focus-trap";
    import { writable } from "svelte/store";

    export let data: import('./$types').PageData;

    const student = writable(data.student);

    const getDaysArray = (s: Date,e: Date) => {for(var a=[],d=new Date(s);d<=new Date(e);d.setDate(d.getDate()+1)){ a.push(new Date(d));}return a;};
    export let days = getDaysArray(new Date('8/20/2023'), new Date('3/30/2024'))

    let modaleShown: boolean = false;

    function toggleModale() {
        modaleShown = !modaleShown;
    }

    async function removeStudent() {
        await deleteDoc(doc(db, "students", data.student.id.toString()));
        toggleModale();
        goto('/adminView');
    }

    let date = "";
    student.subscribe((val) => {
        date = new Date(val.scanTimes[val.scanTimes.length - 1]).toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"});
    })

</script>
<svelte:head>
    <title>{$student.name}</title>
</svelte:head>
{#if modaleShown}
    <div class="h-screen w-screen top-0 left-0 absolute bg-black opacity-25" aria-hidden="true"></div>
    <div class="flex justify-center md:items-center items-end top-0 left-0 absolute h-screen w-screen" use:focusTrap>
        <div class="absolute bg-white h-auto p-2 lg:w-1/4 md:w-1/2 w-full md:rounded-xl rounded-t-xl">
            <div class="flex">
                <h1 class="text-4xl font-bold text-center mx-auto mt-sm">Remove {data.student.name}?</h1>
            </div>
            <p class="text-2xl text-center mt-md mb-lg">This action cannot be undone.</p>
            <div class="flex">
                <button on:click={removeStudent} class="px-md w-full py-2xs bg-green-500 hover:bg-green-600 font-bold text-white text-lg m-2 rounded-2xl">Confirm</button>
                <button on:click={toggleModale} class="px-md w-full py-2xs bg-red-600 hover:bg-red-700 font-bold text-white text-lg m-2 rounded-2xl">Cancel</button>
            </div>
        </div>
    </div>
{/if}
<div class="bg-slate-900 h-screen">
    <Navbar action="/adminView" svg1="M15.75 19.5 8.25 12l7.5-7.5" text={$student.name} action2={toggleModale} svg2="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
    <div class='w-full grid md:grid-cols-2 grid-cols-1 mx-auto my-md h-3/4 overflow-scroll'>
        <div class="grid grid-cols-7 border-slate-200 rounded-lg p-2 border w-full h-full md:order-1 order-2">
        {#each days as day}
            <ShopDayCard date={day} bind:student={$student} />
        {/each}
        </div>
        <div class="flex flex-col w-full h-min md:order-2 order-1">
            <h1 class="text-xl mx-auto text-white">Total Shop Hours</h1>
            <h1 class="text-5xl mx-auto text-white font-bold">{$student.shopHours.toFixed(2)}</h1>
            <h1 class="text-xl pt-xl mx-auto text-white">Last Check In</h1>
            <h1 class="text-5xl mx-auto text-white font-bold">
                {#if $student.scanTimes.length == 0}
                    Never
                {:else}
                    {date}
                {/if}
            </h1>
        </div>
    </div>
</div>