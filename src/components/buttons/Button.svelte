<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { Snippet } from 'svelte';
  import Icon from '@/components/Icon.svelte';
  import Loader from '@/components/Loader.svelte';

  interface Props {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    onclick?: () => void;
    icon?: string;
    loading?: boolean;
    disabled?: boolean;
    type?: HTMLButtonAttributes['type'];
    id?: string;
    className?: string;
    children?: Snippet;
    [key: string]: any;
  }

  let {
    variant = 'primary',
    size = 'medium',
    onclick,
    icon,
    loading,
    disabled,
    type,
    id,
    className,
    children,
    ...props
  }: Props = $props();
</script>

<button
  {id}
  class={[
    'button',
    variant,
    size,
    disabled && 'disabled',
    loading && 'disabled',
    !children && icon && 'icon-only',
    className,
  ]}
  {onclick}
  {type}
  {disabled}
  {...props}
>
  {#if loading}
    <Loader />
  {/if}

  {#if children}
    <span class="button-text">{@render children()}</span>
  {/if}

  {#if icon}
    <Icon name={icon} className="icon button-icon" />
  {/if}
</button>

<style>
  .button {
    position: relative;
    font-family: var(--font-headings);
    font-weight: var(--font-weight-semibold);
    display: inline-flex;
    align-items: center;
    justify-content: start;
    user-select: none;
    transition: all var(--transition-fast);

    &.small {
      padding: var(--space-xs);
      font-size: var(--font-size-h6);
      gap: var(--space-xs);
    }

    &.medium {
      padding: var(--space-sm);
      font-size: var(--font-size-body);
      gap: var(--space-xs);
    }

    &.large {
      padding: var(--space-md);
      font-size: var(--font-size-h5);
      gap: var(--space-sm);
    }

    &.primary {
      background-color: var(--action-default);
      color: var(--text-inverse);
    }

    &.secondary {
      color: var(--action-default);
      border: var(--stroke-width-thin) solid var(--action-default);
    }

    &.ghost {
      background-color: transparent;
      color: var(--action-default);
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

      &:not(.icon-only) {
        :global(.button-icon) {
          transform: translateX(0.2ch);
        }
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

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    .button-text {
      display: inline-block;

      &:not(:only-child) {
        margin-inline-start: var(--space-xs);
      }
    }

    :global(.button-icon) {
      margin-inline-start: auto;
      aspect-ratio: 1;
      flex-shrink: 0;
      transition: all var(--transition-fast);
    }
  }
</style>
