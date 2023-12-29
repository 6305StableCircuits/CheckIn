<script lang="ts">
    import { writable } from "svelte/store";

    export let data: import('./$types').PageData;

</script>

<div class="bg-blue-300 h-screen">
    <div class="flex">
        <a href="/adminView" class="text-white font-bold flex text-left mt-12 text-8xl hover:bg-[#00000033] rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-24 h-24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
            </svg>
        </a>
        <h1 class="text-white font-bold flex text-center mx-auto pt-12 text-8xl">{data.student.firstName + " " + data.student.lastName}</h1>
    </div>
    <div class='w-2/3 grid md:grid-cols-2 grid-cols-1 mx-auto my-3xs-2xs p-3xs-xl bg-slate-900 h-3/4 rounded-lg overflow-scroll'>
        <div class="grid grid-cols-7 border-white border w-full h-full md:order-1 order-2">
        </div>
        <div class="flex flex-col w-full h-min md:order-2 order-1">
            <h1 class="text-xl mx-auto text-white">Total Shop Hours</h1>
            <h1 class="text-5xl mx-auto text-white font-bold">{data.student.shopHours}</h1>
        </div>
    </div>
</div>