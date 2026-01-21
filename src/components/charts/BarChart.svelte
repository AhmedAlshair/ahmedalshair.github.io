<script lang="ts">
  interface Props {
    data: { label: string; value: number }[];
    width?: number;
    height?: number;
    gap?: number;
    colors?: string[];
    className?: string;
  }

  let {
    data = [],
    width = 400,
    height = 240,
    gap = 10,
    colors,
    className,
  }: Props = $props();

  const maxVal = $derived(
    data.length ? Math.max(...data.map((d) => d.value)) : 0,
  );
  const hasData = $derived(data.length > 0 && maxVal > 0);

  // const bars = $derived(
  //   data.map((d, i) => {
  //     const barWidth = width / data.length;
  //     const h = (d.value / maxVal) * height;
  //     const firstBar = i === 0;
  //     const lastBar = i === data.length - 1;

  //     return {
  //       x: i * barWidth + (lastBar ? 0 : gap / 2),
  //       y: height - h,
  //       width: barWidth - gap,
  //       height: h,
  //       label: d.label,
  //       gap,
  //     };
  //   }),
  // );

  const bars = $derived(
    data.map((d, i) => {
      const barWidth = width / data.length;
      const totalBarsWidth = data.length * barWidth - gap;
      const offsetX = (width - totalBarsWidth) / 2;
      const h = (d.value / maxVal) * height;

      return {
        x:
          offsetX +
          i * barWidth +
          (i === data.length - 1 || i === 0 ? 0 : gap / 2),
        y: height - h,
        width: barWidth - gap,
        height: h,
        label: d.label,
        gap,
      };
    }),
  );
</script>

<div class={['chart bar-chart', !colors && 'no-fill', className]}>
  {#if hasData}
    <svg {width} {height}>
      {#each bars as bar, i}
        <rect
          class={`bar-${i + 1}`}
          x={bar.x}
          y={bar.y}
          width={bar.width}
          height={bar.height}
          fill={colors?.[i % colors.length] || 'none'}
        />
        <text
          x={bar.x + bar.width / 2}
          y={height - Math.max(gap / 2, 12)}
          text-anchor="middle"
          class="bar-label"
        >
          {bar.label}
        </text>
      {/each}
    </svg>
  {:else}
    <div class="empty">No data to display</div>
  {/if}
</div>

<style>
  .chart.bar-chart {
    position: relative;
    min-width: min-content;
    min-width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 100%;
      height: 100%;
      min-width: min-content;
      min-height: min-content;
      overflow: visible;

      rect {
        transition:
          height var(--transition-default),
          y var(--transition-default);

        .no-fill & {
          &:nth-of-type(n + 1) {
            fill: var(--text-secondary);
          }

          &:nth-of-type(2n) {
            fill: var(--accent);
          }
        }
      }

      text.bar-label {
        fill: var(--text-inverse);
      }
    }
  }

  .empty {
    color: var(--text-muted);
    font-style: italic;
  }
</style>
