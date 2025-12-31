<script lang="ts">
  import Switch from '@/components/buttons/Switch.svelte';
  import { onMount } from 'svelte';

  let theme: string | null = $state(null);
  const icon = $derived(
    theme ? (theme === 'dark' ? 'dark_mode' : 'light_mode') : null,
  );

  onMount(() => {
    try {
      let saved = localStorage.getItem('theme');

      if (!saved || (saved !== 'light' && saved !== 'dark')) {
        saved = document.documentElement.getAttribute('data-theme');
      }

      if (!saved) {
        saved = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
      }

      theme = saved;
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
      theme = 'light'; // Fallback
    }
  });

  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
    try {
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
    $inspect('theme', theme);
  }
</script>

<Switch
  onclick={toggleTheme}
  icon={icon || undefined}
  checked={theme === 'light'}
  loading={!theme}
/>
