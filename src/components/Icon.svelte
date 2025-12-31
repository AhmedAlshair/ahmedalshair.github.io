<script lang="ts">
  interface Props {
    icon: string;
    className?: string;
  }

  let { icon, className }: Props = $props();
</script>

<span class={["material-symbols-rounded", className && className]}>
  {" "}{icon}{" "}
</span>

<style>
  .icon {
    transition: all var(--transition-fast);
  }
</style>
