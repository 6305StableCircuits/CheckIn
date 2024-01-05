<script lang="ts">
  import "../app.css";
  import { userState } from "$lib/firebase";
    import Login from "$lib/components/Login.svelte";
    import Loading from "$lib/components/Loading.svelte";

</script>
<div class="h-screen u-container mx-auto w-full">
  {#if $userState === undefined}
  <Loading />
  {:else if !$userState}
    <Login />
  {:else}
    <slot />
  {/if}
</div>