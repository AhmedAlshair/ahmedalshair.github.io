<script lang="ts">
  import Button from '@/components/buttons/Button.svelte';
  import { onDestroy } from 'svelte';

  interface Props {
    src: string;
    alt: string;
    showCaption?: boolean;
    open?: boolean;
  }

  let {
    src,
    alt,
    showCaption = true,
    open = $bindable(false),
  }: Props = $props();

  let dialog: HTMLDialogElement;
  let content: HTMLDivElement;
  let pageScrollY = 0;
  let pageScrollLocked = false;

  function lockPageScroll() {
    pageScrollY = window.scrollY;
    pageScrollLocked = true;
    document.documentElement.classList.add('image-dialog-open');
  }

  function unlockPageScroll() {
    if (typeof document === 'undefined' || !pageScrollLocked) {
      return;
    }

    const root = document.documentElement;
    root.classList.remove('image-dialog-open');
    pageScrollLocked = false;

    if (window.scrollY !== pageScrollY) {
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      window.scrollTo(0, pageScrollY);
      root.style.scrollBehavior = previousScrollBehavior;
    }
  }

  function close() {
    if (dialog.open) {
      dialog.close();
    }
  }

  function handleClose() {
    open = false;
    unlockPageScroll();
  }

  function closeOnBackdrop(event: MouseEvent) {
    if (event.target === dialog) {
      close();
    }
  }

  $effect(() => {
    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      content.scrollTop = 0;
      lockPageScroll();
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  });

  onDestroy(unlockPageScroll);
</script>

<dialog
  bind:this={dialog}
  class="image-dialog"
  aria-label={`Enlarged view: ${alt}`}
  onclick={closeOnBackdrop}
  onclose={handleClose}
>
  <div bind:this={content} class="image-dialog-content">
    <div class="image-dialog-actions">
      <Button
        variant="primary"
        size="small"
        className="image-dialog-close"
        onclick={close}
        icon="close"
        aria-label="Close enlarged image"
      />
    </div>

    {#key src}
      <img {src} {alt} class="image-dialog-img" />
    {/key}

    {#if showCaption}
      <p class="image-dialog-caption">{alt}</p>
    {/if}
  </div>
</dialog>

<style>
  .image-dialog {
    position: fixed;
    inset: 0;
    width: min(calc(100vw - var(--space-xl)), 96rem);
    max-width: none;
    height: calc(100dvh - var(--space-xl));
    max-height: none;
    margin: auto;
    padding: 0;
    color: var(--text-primary);
    background-color: var(--surface-3);
    border: var(--stroke-width-thin) solid var(--border-color);
    box-shadow: var(--shadow-far);
    overflow: hidden;

    &[open] {
      display: grid;
    }

    &::backdrop {
      background-color: rgb(from var(--brand-onyx) r g b / 0.8);
      backdrop-filter: blur(0.25rem);
    }

    @media (max-width: 600px) {
      width: calc(100vw - var(--space-md));
      height: calc(100dvh - var(--space-md));
    }
  }

  .image-dialog-content {
    position: relative;
    min-width: 0;
    min-height: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    overscroll-behavior: contain;
  }

  .image-dialog-actions {
    position: sticky;
    top: var(--space-sm);
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-inline: var(--space-sm);
    pointer-events: none;
    z-index: 1;
  }

  :global(.image-dialog-close) {
    height: fit-content;
    box-shadow: var(--shadow-far);
    pointer-events: auto;
  }

  .image-dialog-img {
    flex: 0 0 auto;
    width: 100%;
    max-width: none;
    height: auto;
    margin-block: auto;
    margin-block-start: -2.88rem;
  }

  .image-dialog-caption {
    flex: 0 0 auto;
    max-width: 70ch;
    padding: var(--space-lg);
    color: var(--text-muted);
    text-align: center;
  }

  :global(html.image-dialog-open) {
    overflow: hidden;
  }
</style>
