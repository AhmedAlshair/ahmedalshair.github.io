<script lang="ts">
  import Icon from '@/components/Icon.svelte';

  interface Props {
    before?: number;
    after?: number;
    columns?: number;
    colors?: string[];
    gap?: number;
    size?: number;
    icon?: string;
    className?: string;
  }

  let {
    before = 3,
    after = 70,
    columns = 10,
    colors,
    gap = 4,
    size = 12,
    icon,
    className,
  }: Props = $props();

  // Calculate grid positions for "After" (the larger set)
  const afterDots = $derived(
    Array.from({ length: after }, (_, i) => ({
      x: (i % columns) * (size + gap),
      y: Math.floor(i / columns) * (size + gap),
    })),
  );

  // Calculate grid positions for "Before"
  const beforeDots = $derived(
    Array.from({ length: before }, (_, i) => ({
      x: (i % columns) * (size + gap),
      y: Math.floor(i / columns) * (size + gap),
    })),
  );

  const differenceDots = $derived(
    Array.from({ length: after - before }, (_, i) => ({
      x: (i % columns) * (size + gap),
      y: Math.floor(i / columns) * (size + gap),
    })),
  );

  // Dynamic height based on rows
  const height = $derived(Math.ceil(after / columns) * (size + gap));
  const width = $derived(columns * (size + gap));
</script>

<div
  class={[
    'chart density-grid flex-layout gap align-center',
    !colors && 'no-fill',
    className,
  ]}
>
  <div class="group">
    <span class="label">Before: {before} sites</span>
    <svg {width} {height} viewBox="0 0 {width} {height}">
      {#each afterDots as dot}
        <rect
          class="pale"
          x={dot.x}
          y={dot.y}
          width={size}
          height={size}
          fill={'none'}
        />
      {/each}
      {#each beforeDots as dot}
        <rect
          class="before"
          x={dot.x}
          y={dot.y}
          width={size}
          height={size}
          fill={colors?.[1]}
        />
      {/each}
    </svg>
  </div>

  <div class="divider">
    <Icon name={'arrow_forward'} />
  </div>

  <div class="group">
    <span class="label highlight">After: {after} sites</span>
    <svg {width} {height} viewBox="0 0 {width} {height}">
      {#each afterDots as dot}
        <rect
          class="after"
          x={dot.x}
          y={dot.y}
          width={size}
          height={size}
          fill={colors?.[1]}
        />
      {/each}
      {#each beforeDots as dot}
        <rect
          class="before"
          x={dot.x}
          y={dot.y}
          width={size}
          height={size}
          fill={colors?.[0]}
        />
      {/each}
    </svg>
  </div>
</div>

<style>
  .group {
    display: flex;
    flex-direction: column;
    width: fit-content;
    height: 100%;
    min-width: max-content;
    gap: var(--space-md);
  }

  svg {
    overflow: visible;

    rect {
      .no-fill & {
        &.before {
          fill: var(--text-secondary);
        }

        &.after {
          fill: var(--accent);
        }

        &.pale {
          fill: var(--surface-3);
        }
      }
    }
  }

  .divider {
    margin-block-start: 12%;
    font-size: var(--font-size-h4);
    color: var(--text-primary);
  }
</style>
