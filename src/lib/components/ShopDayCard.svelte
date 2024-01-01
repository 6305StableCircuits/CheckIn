<script lang="ts">
    import { Popover } from "flowbite-svelte";
    export let date: Date;
    export let scanTimes: Array<number>;
    export let maxHours = 8;
    
    const relevantScanTimes = scanTimes.filter((val) => {
        if (val > date.valueOf() && val < date.valueOf() + 60 * 60 * 24 * 1000) {
            return true;
        }
        return false;
    })

    let hours = 0;
    let i;
    let startTime: string;
    let endTime: string;
    for (i = 0; i < relevantScanTimes.length - 1; i += 2) {
        hours += (relevantScanTimes[i+1] - relevantScanTimes[i]) / 3600000;
        startTime = new Date(relevantScanTimes[i]).toLocaleTimeString('en-us', { hour:"numeric", minute:"numeric" });
        endTime = new Date(relevantScanTimes[i+1]).toLocaleTimeString('en-us', { hour:"numeric", minute:"numeric" });
    }
</script>

<div class="p-[2px]">
    <div role="button" tabindex="0" class="w-full h-full rounded-md border border-slate-400 hover:backdrop-brightness-150 hover:cursor-pointer" id={`h-` + date.valueOf()} style="background-color: rgb(132 204 22 / {hours == 0 ? 0 : hours / maxHours + 0.1 > 1 ? 1 : hours / maxHours + 0.1});"></div>
    <Popover class="w-fit p-2xs text-lg font-bold text-slate-800" trigger="hover" title={date.toLocaleDateString('en-us', { year:"numeric", month:"long", day:"numeric"})}>
        {#if startTime == undefined || endTime == undefined}
        Absent
        {:else}
        {startTime + ' - ' + endTime}
        {/if}
    </Popover>
</div>