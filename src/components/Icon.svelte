<script lang="ts">
  interface Props {
    icon: string;
    className?: string;
    [key: string]: any;
  }

  let { icon, className, ...props }: Props = $props();
</script>

<span class={['material-symbols-rounded', className && className]} {...props}>
  {' '}{icon}{' '}
</span>

<style>
  .icon {
    transition: all var(--transition-fast);
  }
</style>
