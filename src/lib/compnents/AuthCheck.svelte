<script lang="ts">
  import { user } from "$lib/firebase";
  import AnimatedRoute from "./AnimatedRoute.svelte";
</script>

{#if $user}
  <slot />
{:else}
  <p class="text-error">
    You must be signed in to view this page.AnimatedRoute
    <a class="btn btn-primary" href="/login">Sign in</a>
  </p>
{/if}
