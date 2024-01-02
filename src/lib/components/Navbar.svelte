<script lang=ts>
    export let svg1: string | undefined = undefined;
    export let action: string | undefined | (() => void) = undefined;
    export let text: string;
    export let action2: string | undefined | (() => void) = undefined;
    export let svg2: string | undefined = undefined;
</script>

<div class="flex py-md text-white place-content-evenly">
    <div class="w-24 flex items-center justify-center">
        {#if svg1 != undefined && typeof action == "function"}
        <button on:click={action} class="hover:bg-[#00000033] rounded-xl p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2xl h-2xl">
                <path stroke-linecap="round" stroke-linejoin="round" d={svg1}/>
            </svg>
        </button>
        {:else if svg1 != undefined && typeof action == "string"}
        <a href={action} class="hover:bg-[#00000033] rounded-xl p-1" tabindex="0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2xl h-2xl">
                <path stroke-linecap="round" stroke-linejoin="round" d={svg1}/>
            </svg>
        </a>
        {/if}
    </div>
    <h1 class="text-white font-bold flex text-center mx-auto text-8xl">{text}</h1>
    <div class="w-24 flex items-center justify-center">
        {#if svg2 != undefined && typeof action2 == "function"}
        <button on:click={action2} class="hover:bg-[#00000033] rounded-xl p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2xl h-2xl">
                <path stroke-linecap="round" stroke-linejoin="round" d={svg2}/>
            </svg>
        </button>
        {:else if svg2 != undefined && typeof action2 == "string"}
        <a href={action2} class="hover:bg-[#00000033] rounded-xl p-1" tabindex="0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-2xl h-2xl">
                <path stroke-linecap="round" stroke-linejoin="round" d={svg2}/>
            </svg>
        </a>
        {/if}
    </div>
</div>