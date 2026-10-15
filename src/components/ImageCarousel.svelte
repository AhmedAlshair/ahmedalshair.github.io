<script lang="ts">
  import Button from '@/components/buttons/Button.svelte';
  import { onDestroy } from 'svelte';
  import { sineOut } from 'svelte/easing';
  import { fade } from 'svelte/transition';

  interface Image {
    url: string;
    alt: string;
  }

  interface Props {
    images: Image[];
    objectFit?: 'cover' | 'contain';
    showCaption?: boolean;
    className?: string;
  }

  let {
    images = [],
    objectFit = 'cover',
    showCaption = true,
    className,
  }: Props = $props();

  let currentIndex = $state(0);
  let prevIndex = $derived((currentIndex - 1 + images.length) % images.length);
  let nextIndex = $derived((currentIndex + 1) % images.length);

  let direction = $state<'next' | 'prev'>('next');
  let enlargedDialog: HTMLDialogElement;
  let pageScrollY = 0;
  let pageScrollLocked = false;

  function lockPageScroll() {
    pageScrollY = window.scrollY;
    pageScrollLocked = true;
    document.documentElement.classList.add('carousel-dialog-open');
  }

  function unlockPageScroll() {
    if (typeof document === 'undefined' || !pageScrollLocked) {
      return;
    }

    const root = document.documentElement;
    root.classList.remove('carousel-dialog-open');
    pageScrollLocked = false;

    if (window.scrollY !== pageScrollY) {
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      window.scrollTo(0, pageScrollY);
      root.style.scrollBehavior = previousScrollBehavior;
    }
  }

  function enlarge() {
    if (!enlargedDialog.open) {
      lockPageScroll();
      enlargedDialog.showModal();
    }
  }

  function closeEnlarged() {
    enlargedDialog.close();
  }

  function closeOnBackdrop(event: MouseEvent) {
    if (event.target === enlargedDialog) {
      closeEnlarged();
    }
  }

  // Wrap index back to 0 at the end
  function next() {
    direction = 'next';
    currentIndex = (currentIndex + 1) % images.length;
  }

  // Wrap back to the last index
  function prev() {
    direction = 'prev';
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }

  onDestroy(unlockPageScroll);
</script>

<div class="image-carousel">
  <div class={['carousel-container container', objectFit, className]}>
    {#each images as img, i (img.url)}
      {#if i === currentIndex || i === prevIndex || i === nextIndex}
        <img
          src={img.url}
          alt={img.alt}
          class={[
            'carousel-img',
            i === prevIndex && 'prev',
            i === nextIndex && 'next',
          ]}
          class:active={i === currentIndex}
          loading="lazy"
        />
      {/if}
    {/each}
  </div>

  <div class="bottom-bar container padded">
    {#if showCaption}
      <div class="caption">
        <span class="slash"></span>

        {#key currentIndex}
          <span
            class="caption-text"
            in:fade={{ duration: 300, easing: sineOut }}
          >
            {images[currentIndex].alt}
          </span>
        {/key}
      </div>
    {/if}

    <div class="controls">
      <Button
        variant="secondary"
        size="small"
        onclick={enlarge}
        icon="open_in_full"
        aria-label={`Enlarge image: ${images[currentIndex].alt}`}
      />

      <Button
        variant="secondary"
        size="small"
        onclick={prev}
        icon="keyboard_arrow_left"
        aria-label="Previous image"
      />

      <div class="current-index">
        {currentIndex + 1} / {images.length}
      </div>

      <Button
        variant="secondary"
        size="small"
        onclick={next}
        icon="keyboard_arrow_right"
        aria-label="Next image"
      />
    </div>
  </div>

  <dialog
    bind:this={enlargedDialog}
    class="enlarged-dialog"
    aria-label={`Enlarged view: ${images[currentIndex].alt}`}
    onclick={closeOnBackdrop}
    onclose={unlockPageScroll}
  >
    <div class="enlarged-content">
      <div class="enlarged-actions">
        <Button
          variant="primary"
          size="small"
          className="enlarged-close"
          onclick={closeEnlarged}
          icon="close"
          aria-label="Close enlarged image"
        />
      </div>

      <img
        src={images[currentIndex].url}
        alt={images[currentIndex].alt}
        class="enlarged-img"
      />

      {#if showCaption}
        <p class="enlarged-caption">{images[currentIndex].alt}</p>
      {/if}
    </div>
  </dialog>
</div>

<style>
  .image-carousel {
    padding-block-start: var(--space-lg);
    padding-block-end: var(--space-lg);
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    background-color: var(--surface-2);
  }

  .carousel-container {
    position: relative;
    margin: auto;
    width: 100%;
    height: min(calc(90lvh - var(--header-height)), 40rem);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: var(--surface-1);
    overflow: hidden;

    @media (max-width: 768px) {
      height: min(60lvh, 24rem);
    }

    @media (max-width: 600px) {
      height: min(50lvh, 16rem);
    }
  }

  .carousel-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    transition: all var(--transition-default);

    .cover & {
      object-fit: cover;
    }

    .contain & {
      object-fit: contain;
    }

    &.prev {
      visibility: hidden;
      transform: translateX(-100%);
      z-index: 0;
    }

    &.next {
      visibility: hidden;
      transform: translateX(100%);
      z-index: 0;
    }

    &.active {
      visibility: visible;
      opacity: 1;
      pointer-events: initial;
      transform: translateX(0);
      z-index: 1;
    }
  }

  .bottom-bar {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-md);
    z-index: 1;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: stretch;
    }
  }

  .caption {
    display: flex;
    align-items: center;
    gap: 1ch;
    overflow-x: hidden;

    .caption-text {
      min-width: 12ch;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow-x: hidden;
    }
  }

  .controls {
    flex-shrink: 0;
    min-width: min-content;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: var(--space-md);

    .current-index {
      user-select: none;
      color: var(--text-muted);
    }
  }

  .enlarged-dialog {
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

  .enlarged-content {
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

  .enlarged-actions {
    position: sticky;
    top: var(--space-sm);
    padding-inline: var(--space-sm);
    width: 100%;
    display: flex;
    justify-content: flex-end;
    pointer-events: none;
    z-index: 1;
  }

  :global(.enlarged-close) {
    box-shadow: var(--shadow-far);
    pointer-events: auto;
    height: fit-content;
  }

  .enlarged-img {
    flex: 0 0 auto;
    width: 100%;
    max-width: none;
    height: auto;
    margin-block: auto;
    margin-block-start: -2.88rem;
  }

  .enlarged-caption {
    flex: 0 0 auto;
    max-width: 70ch;
    padding: var(--space-lg) var(--space-lg);
    color: var(--text-muted);
    text-align: center;
  }

  :global(html.carousel-dialog-open) {
    overflow: hidden;
  }

  .preloader {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    pointer-events: none;
    opacity: 0;
  }
</style>
