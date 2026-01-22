<script lang="ts">
  import Button from '@/components/buttons/Button.svelte';
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

  .preloader {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    pointer-events: none;
    opacity: 0;
  }
</style>
