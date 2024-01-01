<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import ShopDayCard from "$lib/components/ShopDayCard.svelte";
    import { writable } from "svelte/store";

    export let data: import('./$types').PageData;


    const getDaysArray = (s: Date,e: Date) => {for(var a=[],d=new Date(s);d<=new Date(e);d.setDate(d.getDate()+1)){ a.push(new Date(d));}return a;};
    export let days = getDaysArray(new Date('8/20/2023'), new Date('3/30/2024'))

</script>

<div class="bg-slate-900 h-screen">
    <Navbar route1="/adminView" svg1="M15.75 19.5 8.25 12l7.5-7.5" text={data.student.firstName + " " + data.student.lastName} route2="/adminView" svg2="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
    <div class='w-full grid md:grid-cols-2 grid-cols-1 mx-auto my-md h-3/4 overflow-scroll'>
        <div class="grid grid-cols-7 border-slate-200 rounded-lg p-2 border w-full h-full md:order-1 order-2">
        {#each days as day}
            <ShopDayCard date={day} scanTimes={data.student.scanTimes} />
        {/each}
        </div>
        <div class="flex flex-col w-full h-min md:order-2 order-1">
            <h1 class="text-xl mx-auto text-white">Total Shop Hours</h1>
            <h1 class="text-5xl mx-auto text-white font-bold">{data.student.shopHours.toFixed(2)}</h1>
            <h1 class="text-xl pt-xl mx-auto text-white">Last Check In</h1>
            <h1 class="text-5xl mx-auto text-white font-bold">
                {#if data.student.scanTimes.length == 0}
                    Never
                {:else}
                    {new Date(data.student.scanTimes[data.student.scanTimes.length - 1]).toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"})}
                {/if}
            </h1>
        </div>
    </div>
</div>