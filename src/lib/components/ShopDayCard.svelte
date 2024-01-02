<script lang="ts">
    import { onMount } from "svelte";
    import { arrow, createFloatingActions } from "svelte-floating-ui";
    import { offset, flip, shift } from "svelte-floating-ui/dom";
    import { writable, type Writable } from "svelte/store";
    export let date: Date;
    export let scanTimes: Array<number>;
    export let maxHours = 8;
    type CheckIn = {
        start: Date;
        end: Date;
    }
    
    const relevantScanTimes = scanTimes.filter((val) => {
        if (val > date.valueOf() && val < date.valueOf() + 60 * 60 * 24 * 1000) {
            return true;
        }
        return false;
    })

    let hours = 0;
    let i;
    export let checkIns: Array<CheckIn> = [];
    for (i = 0; i < relevantScanTimes.length - 1; i += 2) {
        hours += (relevantScanTimes[i+1] - relevantScanTimes[i]) / 3600000;
        checkIns.push({start: new Date(relevantScanTimes[i]), end: new Date(relevantScanTimes[i+1])});
        console.log(checkIns);
    }
    

    let arrowRef: Writable<HTMLElement | null> = writable(null);
    const [ floatingRef, floatingContent ] = createFloatingActions({
        strategy: 'absolute',
        placement: 'top',
        middleware: [
            arrow({element: arrowRef}),
            offset(6),
            flip(),
            shift(),
        ],
        onComputed({ placement, middlewareData }) {
            if ($arrowRef == null) {
                return
            }
            const arrowPos = middlewareData.arrow!;
            const staticSide = {
                top: 'bottom',
                right: 'left',
                bottom: 'top',
                left: 'right',
            }[placement.split('-')[0]];

            Object.assign($arrowRef.style, {
                left: arrowPos.x != null ? `${arrowPos.x}px` : "",
                top: arrowPos.y != null ? `${arrowPos.y}px` : "",
                [staticSide!]: "-4px"
            });
        },
        
    });
    let showTooltip: boolean = false;

    let hoverLocked: boolean = false;
    let timer = setTimeout(function() {}, 300);
    clearTimeout(timer);

    function setHover() {
        timer = setTimeout(function() {
            showTooltip = true;
        }, 300);
    }

    function toggleHover() {
        hoverLocked = !hoverLocked;
        endHover();
    }
    
    function endHover() {
        if(!hoverLocked) {
            clearTimeout(timer);
            showTooltip = false;
        }
    }

    onMount(() => {
        document.addEventListener('keyup', (key) => {
            console.log(key.key)
            if (key.key == "Escape") {
                hoverLocked = false;
                endHover();
            }
        })
    })
</script>


{#if showTooltip && hoverLocked}
    <div class="h-screen w-screen top-0 left-0 absolute bg-black opacity-25" on:click={toggleHover} aria-hidden="true"></div>
{/if}
<div class="p-[2px]">
    <div on:mouseenter={setHover} on:click={toggleHover} on:keyup={(key) => {key.key == 'Space' ? toggleHover() : ""} } on:mouseleave={endHover}  use:floatingRef role="button" tabindex="0" class="w-full h-full rounded-md border border-slate-400 hover:backdrop-brightness-150 hover:cursor-pointer" id={`h-` + date.valueOf()} style="background-color: rgb(132 204 22 / {hours == 0 ? 0 : hours / maxHours + 0.1 > 1 ? 1 : hours / maxHours + 0.1});"></div>
    {#if showTooltip}
        <div class="w-fit text-lg text-slate-800" style="" use:floatingContent>
            <div class="p-2xs bg-white rounded-xl">
                <h1 class="font-bold">{date.toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"})}</h1>
                {#if checkIns.length == 0}
                Absent
                {:else}
                {#each checkIns as checkIn}
                    <div class="flex">
                        <span class="mr-2">{checkIn.start.toLocaleTimeString('en-us', { hour:"numeric", minute:"numeric"})}</span>
                        <span class="mx-auto">-</span>
                        <span class="ml-2">{checkIn.end.toLocaleTimeString('en-us', { hour:"numeric", minute:"numeric" })}</span>
                    </div>
                {/each}
                {/if}
            </div>
            <div class="absolute w-4 h-4 bg-white rotate-45" bind:this={$arrowRef} />
        </div>
    {/if}
</div>