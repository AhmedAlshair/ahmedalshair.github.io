<script lang="ts">
  import ImageDialog from '@/components/ImageDialog.svelte';
  import { onMount } from 'svelte';

  let open = $state(false);
  let src = $state('');
  let alt = $state('');

  onMount(() => {
    function openImage(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const trigger = event.target.closest<HTMLElement>('[data-image-viewer]');
      const imageSrc = trigger?.dataset.imageViewerSrc;
      const imageAlt = trigger?.dataset.imageViewerAlt;

      if (!imageSrc || !imageAlt) {
        return;
      }

      event.preventDefault();
      src = imageSrc;
      alt = imageAlt;
      open = true;
    }

    document.addEventListener('click', openImage);

    return () => document.removeEventListener('click', openImage);
  });
</script>

{#if src}
  <ImageDialog {src} {alt} bind:open />
{/if}
