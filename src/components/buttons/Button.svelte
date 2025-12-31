<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import Icon from '@/components/Icon.svelte';
  import Loader from '@/components/Loader.svelte';

  interface Props {
    variant?: 'primary' | 'secondary';
    onclick?: () => void;
    icon?: string;
    loading?: boolean;
    disabled?: boolean;
    type?: HTMLButtonAttributes['type'];
    id?: string;
    className?: string;
    children: Snippet;
  }

  let {
    variant = 'primary',
    onclick,
    icon,
    loading,
    disabled,
    type,
    id,
    className,
    children,
  }: Props = $props();
</script>

<button
  {id}
  class={['button', variant, disabled, loading && 'disabled', className]}
  {onclick}
  {type}
  {disabled}
>
  {#if loading}
    <Loader />
  {/if}

  <span class="button-text">{@render children()}</span>

  {#if icon}
    <Icon {icon} className="icon button-icon" />
  {/if}
</button>

<style>
  .button {
    position: relative;
    padding: var(--space-sm);
    font-family: var(--font-headings);
    font-size: var(--font-size-h5);
    font-weight: var(--font-weight-medium);
    display: inline-flex;
    align-items: center;
    justify-content: start;
    gap: var(--space-xs);
    transition: all var(--transition-fast);

    > :global(.button-icon) {
      margin-inline-start: auto;
    }

    &.primary {
      background-color: var(--action-default);
      color: var(--text-inverse);
    }

    &.secondary {
      color: var(--action-default);
      border: 1px solid var(--action-default);
    }

    &:hover {
      &.primary {
        background-color: var(--action-hover);
        color: var(--text-inverse);
      }

      &.secondary {
        color: var(--action-hover);
        border-color: var(--action-hover);
        background-color: var(--surface-hover);
      }

      :global(.button-icon) {
        transform: translateX(0.2ch);
      }
    }

    &:active {
      &.primary {
        background-color: var(--action-active);
      }

      &.secondary {
        color: var(--action-active);
        border-color: var(--action-active);
      }
    }

    .button-text {
      display: inline-block;

      &:not(:only-child) {
        margin-inline-start: var(--space-xs);
      }
    }

    :global(.button-icon) {
      aspect-ratio: 1;
      flex-shrink: 0;
      transition: all var(--transition-fast);
    }
  }
</style>
