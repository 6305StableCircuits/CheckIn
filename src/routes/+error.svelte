<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>404 + {$page.error?.message}</h1>