<script lang="ts">
  interface Props {
    name: string;
    className?: string;
    [key: string]: any;
  }

  let { name, className, ...props }: Props = $props();
</script>

<span
  class={['material-symbols-rounded icon', className && className]}
  {...props}
>
  {name}
</span>

<style>
  .icon {
    transition: all var(--transition-fast);
  }
</style>
