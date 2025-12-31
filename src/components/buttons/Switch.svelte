<script lang="ts">
  import Icon from "@components/Icon.svelte";

  interface Props {
    onclick?: () => void;
    checked: boolean;
    icon?: string;
    loading?: boolean;
    id?: string;
    className?: string;
  }

  let { onclick, checked, icon, loading, id, className }: Props = $props();
</script>

<button
  {id}
  class={[
    "switch-button theme-toggle",
    { checked: checked },
    { loading: loading },
    { skeleton: loading },
    className,
  ]}
  onclick={() => {
    checked = !checked;
    onclick && onclick();
  }}
  aria-label="Toggle theme"
>
  {#if icon}
    <Icon {icon} className="icon" />
  {:else}
    <span class="icon"></span>
  {/if}
  <input type="checkbox" bind:checked hidden aria-hidden="true" />
</button>

<style>
  .switch-button {
    --switch-size: var(--input-height-sm);
    position: relative;
    height: var(--switch-size);
    aspect-ratio: 2 / 1.12;
    border: none;
    display: flex;
    align-items: center;
    border-radius: var(--radius-pill);
    background-color: var(--action-default);
    cursor: pointer;

    &.skeleton {
      pointer-events: none;
      background-color: var(--action-disabled);

      > :global(.icon) {
        visibility: hidden;
      }
    }

    &:hover {
      background-color: var(--action-hover);

      > :global(.icon) {
        color: var(--action-hover);
      }
    }

    > :global(.icon) {
      position: absolute;
      top: 0;
      left: 0;
      margin: var(--space-3xs);
      padding: var(--space-3xs);
      height: calc(var(--switch-size) - var(--space-3xs) * 2);
      width: calc(var(--switch-size) - var(--space-3xs) * 2);
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--icon-md);
      color: var(--action-default);
      background-color: var(--surface-1);
      border-radius: var(--radius-full);
      transition: all var(--transition-fast);

      :global(.checked) & {
        left: calc(100% - var(--switch-size));
      }
    }
  }
</style>
