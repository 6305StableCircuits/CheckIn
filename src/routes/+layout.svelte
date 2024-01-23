<script lang="ts">
  import "../app.css";
  import { loaded, userState } from "$lib/firebase";
    import Login from "$lib/components/Login.svelte";
    import Loading from "$lib/components/Loading.svelte";

</script>
<div class="h-screen u-container mx-auto w-full">
  {#if $loaded == false}
    <Loading />
  {:else if $userState == undefined}
    <Login />
  {:else}
    <slot />
  {/if}
</div>