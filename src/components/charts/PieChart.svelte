<script lang="ts">
  import { ThemeColors } from '@/utils/Constants.astro';

  interface Props {
    data: number[];
    size?: number;
    colors?: string[];
  }

  let {
    data = [],
    size = 200,
    colors = [
      ThemeColors.brandNavy,
      ThemeColors.brandAccent,
      ThemeColors.brandOnyx,
      ThemeColors.surface3,
    ],
  }: Props = $props();

  const total = $derived(data.reduce((a, b) => a + b, 0));
  const hasData = $derived(data.length > 0 && total > 0);

  const segments = $derived.by(() => {
    if (!hasData) return [];
    let currentAngle = -Math.PI / 2;
    return data.map((value, i) => {
      const angle = (value / total) * Math.PI * 2;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      const r = size / 2;
      const x1 = r + r * Math.cos(startAngle);
      const y1 = r + r * Math.sin(startAngle);
      const x2 = r + r * Math.cos(endAngle);
      const y2 = r + r * Math.sin(endAngle);
      const largeArc = angle > Math.PI ? 1 : 0;

      return {
        path: `M ${r},${r} L ${x1},${y1} A ${r},${r} 0 ${largeArc} 1 ${x2},${y2} Z`,
        color: colors[i % colors.length],
      };
    });
  });
</script>

<div class="chart pie-chart">
  {#if hasData}
    <svg width={size} height={size} viewBox="0 0 {size} {size}">
      {#each segments as segment}
        <path
          d={segment.path}
          fill={segment.color}
          stroke="white"
          stroke-width="1"
        />
      {/each}
    </svg>
  {:else}
    <!-- Render custom snippet if provided, otherwise show default -->
    {#if !data}
      <p>No data provided</p>
    {:else}
      <div class="default-empty">
        <svg width={size} height={size} viewBox="0 0 {size} {size}">
          <circle cx={size / 2} cy={size / 2} r={size / 2} fill="#eee" />
        </svg>
        <p>No data available</p>
      </div>
    {/if}
  {/if}
</div>

<style>
  .chart {
    position: relative;
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .default-empty {
    text-align: center;
    color: var(--text-muted);
  }
  .default-empty p {
    position: absolute;
    font-size: 0.8rem;
    margin: 0;
  }
</style>
