<script lang="ts">
  import "../app.css";
  import { userState } from "$lib/firebase";

</script>
<div class="h-screen u-container mx-auto w-full">
  {#if userState === undefined}
  <Loading />
  {:else if !userState}
    <Login />
  {:else}
    <slot />
  {/if}
</div>