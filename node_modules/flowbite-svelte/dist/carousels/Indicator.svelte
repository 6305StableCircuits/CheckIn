<script>export let name = '';
export let selected = false;
export let indicatorClass = '';
</script>

<button type="button" class={indicatorClass} class:active={selected} aria-label={name} on:click />

<!--
@component
[Go to docs](https://flowbite-svelte.com/)
## Props
@prop export let name: string = '';
@prop export let selected: boolean = false;
@prop export let indicatorClass: string = '';
-->

<style>
  .active {
    opacity: 1;
  }</style>
