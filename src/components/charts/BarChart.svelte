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

  const bars = $derived(
    data.map((d, i) => {
      const barWidth = width / data.length;
      const h = (d.value / maxVal) * height;
      const lastBar = i === data.length - 1;

      return {
        x: i * barWidth + (lastBar ? 0 : gap / 2),
        y: height - h,
        width: barWidth - gap,
        height: h,
        label: d.label,
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
          y={height - 12}
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
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 100%;
      height: 100%;

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
    color: #999;
    font-style: italic;
  }
</style>
