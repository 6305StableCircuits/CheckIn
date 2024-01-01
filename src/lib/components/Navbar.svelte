<script lang=ts>
    export let svg1: string | undefined = undefined;
    export let route1: string | undefined = undefined;
    export let text: string;
    export let route2: string | undefined = undefined;
    export let svg2: string | undefined = undefined;
</script>

<div class="flex py-md text-white place-content-evenly">
    <div class="w-24 flex items-center justify-center">
        {#if svg1 != undefined && route1 != undefined}
        <a href={route1} class="hover:bg-[#00000033] rounded-xl p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2xl h-2xl">
                <path stroke-linecap="round" stroke-linejoin="round" d={svg1}/>
            </svg>
        </a>
        {/if}
    </div>
    <h1 class="text-white font-bold flex text-center mx-auto text-8xl">{text}</h1>
    <div class="w-24 flex items-center justify-center">
        {#if svg2 != undefined && route2 != undefined}
        <a href={route2} class="hover:bg-[#00000033] rounded-xl p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2xl h-2xl">
                <path stroke-linecap="round" stroke-linejoin="round" d={svg2}/>
            </svg>
        </a>
        {/if}
    </div>
</div>