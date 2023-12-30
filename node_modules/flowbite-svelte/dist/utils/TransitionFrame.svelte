<script>import { fade } from 'svelte/transition';
import Frame from './Frame.svelte';
import { createEventDispatcher } from 'svelte';
// Export a prop through which you can set a desired svelte transition
export let transition = fade;
// Pass in extra transition params
export let params = {};
export let open = true;
export let dismissable = false;
const dispatch = createEventDispatcher();
$: dispatch(open ? 'open' : 'close');
function close(ev) {
    if (ev?.stopPropagation)
        ev.stopPropagation();
    open = false;
}
</script>

{#if dismissable}
  {#if open}
    <div transition:transition={params}>
      <Frame {...$$restProps}><slot {close} /></Frame>
    </div>
  {/if}
{:else}
  <Frame {...$$restProps}><slot {close} /></Frame>
{/if}

<!--
@component
[Go to docs](https://flowbite-svelte.com/)
## Props
@prop export let transition: TransitionFunc = fade;
@prop export let params: object = {};
@prop export let open: boolean = true;
@prop export let dismissable: boolean = false;
-->
