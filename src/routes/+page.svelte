<script lang="ts">
    import { goto } from "$app/navigation";
    import Navbar from "$lib/components/Navbar.svelte";
    import StudentCard from "$lib/components/StudentCard.svelte";
    import { onDestroy, onMount } from "svelte";
    import { focusTrap } from "svelte-focus-trap";
    import { writable } from "svelte/store";

	export let data: import('./$types').PageData;
    const students = data.students;
    let search = "";
    let modaleShown: boolean = false;
    let pin = "Bronco6305";
    let pinInput = "";
    
    let checkInSillyGuy = (event: KeyboardEvent): void => {
            if (event.key == "Enter") {
                students.forEach(async (student) => {
                    if (student.id == parseInt(search)) {
                        student.scanTimes = [...student.scanTimes, Date.now()];
                        await student.update();
                        search = "";
                    }
                })
            }
        }

    onMount(() => {
        addEventListener('keypress', checkInSillyGuy)
    })

    onDestroy(() => {
        removeEventListener('keypress', checkInSillyGuy);
    })

    function toggleModale() {
        modaleShown = !modaleShown;
    }

    function checkPIN() {
        if(pinInput == pin) {
            goto('/adminView');
        } else {
            pinInput = ""
            toggleModale();
        }
    }

</script>
<svelte:head>
    <title>Check In | 6305 Roster</title>
</svelte:head>
{#if modaleShown}
    <div class="h-screen w-screen top-0 left-0 absolute bg-black opacity-25" aria-hidden="true"></div>
    <div class="flex justify-center md:items-center items-end top-0 left-0 absolute h-screen w-screen" use:focusTrap>
        <div class="absolute bg-white h-auto p-2 lg:w-1/4 md:w-1/2 w-full md:rounded-xl rounded-t-xl">
            <div class="flex">
                <h1 class="text-4xl font-bold text-center mx-auto mt-sm">Go to Admin View</h1>
            </div>
            <div class="flex items-center mt-md mb-lg mx-auto md:w-1/2 w-full h-12 rounded-lg focus-within:shadow-xl bg-slate-100 overflow-hidden border border-slate-700 focus-within:border-2">
                <div class="grid place-items-center mx-3xs h-full min-w-min text-gray-300"/>
                <input type="password" bind:value={pinInput} class="peer h-full w-full outline-none text-lg text-gray-700 pr-2 bg-slate-100" placeholder="Enter PIN" autocomplete="off">
            </div>
            <div class="flex">
                <button on:click={checkPIN} class="px-md w-full py-2xs bg-green-500 hover:bg-green-600 font-bold text-white text-lg m-2 rounded-2xl">Confirm</button>
                <button on:click={toggleModale} class="px-md w-full py-2xs bg-red-600 hover:bg-red-700 font-bold text-white text-lg m-2 rounded-2xl">Cancel</button>
            </div>
        </div>
    </div>
{/if}
<div class="bg-slate-900 h-screen">
    <Navbar text="Check In" action2={toggleModale} svg2="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"/>
    <div class='w-full mx-auto h-3/4 overflow-scroll'>
        <div class="relative flex items-center mx-auto md:w-1/2 w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div class="grid place-items-center mx-3xs h-full min-w-min text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input bind:value={search} class="peer h-full w-full outline-none text-lg text-gray-700 pr-2" placeholder="Enter Name or ID Number" id="searchBar" autocomplete="off" data-search>
        </div>
        <div class='grid grid-cols-1 lg:grid-cols-2 pt-sm 2xl:grid-cols-4 gap-sm my-sm'>
            {#each students as student}
                {#if student.shown(search.toLowerCase())}
                    <StudentCard bind:student />
                {/if}
            {/each}
        </div>
    </div>
</div>