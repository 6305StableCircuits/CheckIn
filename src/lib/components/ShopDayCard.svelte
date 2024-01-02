<script lang="ts">
    import type { Student } from "$lib/classes/Student";
    import { onMount } from "svelte";
    import { arrow, createFloatingActions } from "svelte-floating-ui";
    import { offset, flip, shift } from "svelte-floating-ui/dom";
    import { writable, type Writable } from "svelte/store";
    export let date: Date;
    export let student: Student;
    export let maxHours = 8;
    type CheckIn = {
        start: Date;
        end: Date;
    }

    const scanTimeTable = writable(student.scanTimes);
    
    let relevantScanTimes: number[] = [];

    $: relevantScanTimes = $scanTimeTable.filter((val) => {
        if (val > date.valueOf() && val < date.valueOf() + 60 * 60 * 24 * 1000) {
            return true;
        }
        return false;
    })

    let hours = 0;
    let i;
    let checkIns: Array<CheckIn> = []
    const updateCheckIn = (times: number[]) => {
    checkIns = [];
    hours = 0;
    for (i = 0; i < times.length - 1; i += 2) {
        hours += (times[i+1] - times[i]) / 3600000;
        checkIns = [({start: new Date(times[i]), end: new Date(times[i+1])}), ...checkIns];
    }}
    $: updateCheckIn(relevantScanTimes);
    

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
        if(!hoverLocked) {
            startTime = undefined;
            endTime = undefined;
        }
        endHover();
    }
    
    function endHover() {
        if(!hoverLocked) {
            clearTimeout(timer);
            showTooltip = false;
        }
    }

    async function removeCheckIn(checkIn: CheckIn) {
        scanTimeTable.update((cscantimes) => {
            cscantimes.splice(cscantimes.indexOf(checkIn.start.valueOf()), 1);
            cscantimes.splice(cscantimes.indexOf(checkIn.end.valueOf()), 1);

            student.scanTimes = cscantimes;
            return cscantimes;
        });
        await student.update();
    }

    let startTime: Date | undefined;
    let endTime: Date | undefined;

    async function addCheckIn(startTime: Date | undefined, endTime: Date | undefined) {
        if(startTime == undefined || endTime == undefined) {
            return;
        }
        scanTimeTable.update((cscantimes) => {
            cscantimes = student.scanTimes;
            cscantimes = [new Date(date.toLocaleDateString() + ' ' + endTime).valueOf(), ...cscantimes]
            cscantimes = [new Date(date.toLocaleDateString() + ' ' + startTime).valueOf(), ...cscantimes]

            student.scanTimes = cscantimes;
            return cscantimes;
        });
        await student.update();
    }

    onMount(() => {
        document.addEventListener('keyup', (key) => {
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
        <div class="max-w-fit text-lg text-slate-800" use:floatingContent>
            <div class="p-2xs bg-white rounded-xl">
                <div class="flex">
                    <h1 class="font-bold">{date.toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"})}</h1>
                    {#if hoverLocked && checkIns.length == 0}
                        <button class="ml-4 px-2 rounded-lg font-bold hover:bg-slate-200" on:click={toggleHover}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 stroke-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                        </button>
                    {:else if hoverLocked}
                        <button class="ml-auto px-2 rounded-lg font-bold hover:bg-slate-200" on:click={toggleHover}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 stroke-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                          </svg>
                        </button>
                    {/if}
                </div>
                {#if checkIns.length == 0}
                Absent<br>
                {#if hoverLocked}
                        <div class="flex">
                            <input bind:value={startTime} type="time" class="bg-slate-100 mr-2 rounded-lg">
                            <span class="mx-auto">-</span>
                            <input bind:value={endTime} type="time" class="bg-slate-100 ml-2 rounded-lg">
                            <button on:click={() => addCheckIn(startTime, endTime)} class="ml-auto px-2 rounded-lg font-bold hover:bg-slate-200"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 stroke-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                              </svg>                          
                            </button>
                        </div>
                    {/if}
                {:else}
                {#each checkIns as checkIn}
                    <div class="flex">
                        <span class="mr-2">{checkIn.start.toLocaleTimeString('en-us', { hour:"numeric", minute:"numeric"})}</span>
                        <span class="mx-auto">-</span>
                        <span class="ml-2">{checkIn.end.toLocaleTimeString('en-us', { hour:"numeric", minute:"numeric" })}</span>
                        {#if hoverLocked}
                            <button on:click={() => removeCheckIn(checkIn)} class="ml-8 px-2 rounded-lg font-bold hover:bg-slate-200"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 stroke-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                              </svg>
                            </button>
                        {/if}
                    </div>
                {/each}    
                    {#if hoverLocked}
                        <div class="flex">
                            <input bind:value={startTime} type="time" class="bg-slate-100 mr-2 rounded-lg">
                            <span class="mx-auto">-</span>
                            <input bind:value={endTime} type="time" class="bg-slate-100 ml-2 rounded-lg">
                            <button on:click={() => addCheckIn(startTime, endTime)} class="ml-auto px-2 rounded-lg font-bold hover:bg-slate-200"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 stroke-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                              </svg>                          
                            </button>
                        </div>
                    {/if}
                {/if}
            </div>
            <div class="absolute w-4 h-4 bg-white rotate-45" bind:this={$arrowRef} />
        </div>
    {/if}
</div>