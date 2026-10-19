<script lang="ts">
  import { onMount } from 'svelte';
  import Button from '@/components/buttons/Button.svelte';

  let { targetId, hideButton }: { targetId: string; hideButton?: boolean } = $props();
  let animationContainer: HTMLElement | null = null;
  let ready = $state(false);
  let paused = $state(false);

  onMount(() => {
    animationContainer = document.getElementById(targetId);
    if (!animationContainer) return;

    ready = true;
    animationContainer.classList.add('is-animated');

    return () => {
      animationContainer?.classList.remove('is-animated', 'is-paused');
    };
  });

  function toggleMotion() {
    if (!animationContainer) return;
    paused = animationContainer.classList.toggle('is-paused');
  }
</script>

{#if ready && !hideButton}
  <Button
    type="button"
    icon={paused ? 'play_arrow' : 'pause'}
    variant="ghost"
    onclick={toggleMotion}
    className="hero-motion-toggle"
    aria-label={paused ? 'Play hero animation' : 'Pause hero animation'}
    aria-controls={targetId}
  />
{/if}

<style>
  :global(.hero-motion-toggle) {
    flex-shrink: 0;
    min-width: 2.75rem;
    min-height: 2.75rem;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(button.button.hero-motion-toggle) {
      display: none;
    }
  }
</style>
