<script lang="ts">
  import Switch from '@/components/buttons/Switch.svelte';
  import { onMount } from 'svelte';

  type Theme = 'light' | 'dark';

  let theme: Theme | null = $state(null);
  let followsSystemTheme = true;
  const isDark = $derived(theme === 'dark');
  const icon = $derived(
    theme ? (theme === 'dark' ? 'light_mode' : 'dark_mode') : null,
  );
  const label = $derived(
    theme
      ? `Switch to ${isDark ? 'light' : 'dark'} theme`
      : 'Theme preference is loading',
  );

  const isTheme = (value: string | null): value is Theme =>
    value === 'light' || value === 'dark';

  function applyTheme(nextTheme: Theme) {
    theme = nextTheme;
    document.documentElement.setAttribute('data-theme', nextTheme);
  }

  onMount(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    let savedTheme: string | null = null;

    try {
      savedTheme = localStorage.getItem('theme');
    } catch {
      // Storage can be unavailable in privacy-restricted browsing contexts.
    }

    followsSystemTheme = !isTheme(savedTheme);

    const documentTheme = document.documentElement.getAttribute('data-theme');
    applyTheme(
      isTheme(documentTheme)
        ? documentTheme
        : systemTheme.matches
          ? 'dark'
          : 'light',
    );

    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (followsSystemTheme) {
        applyTheme(event.matches ? 'dark' : 'light');
      }
    };

    systemTheme.addEventListener('change', handleSystemThemeChange);

    return () => {
      systemTheme.removeEventListener('change', handleSystemThemeChange);
    };
  });

  function toggleTheme() {
    if (!theme) return;

    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light';
    followsSystemTheme = false;
    applyTheme(nextTheme);

    try {
      localStorage.setItem('theme', nextTheme);
    } catch {
      // The theme still applies for this page when persistence is unavailable.
    }
  }
</script>

<Switch
  type="button"
  onclick={toggleTheme}
  icon={icon || undefined}
  checked={isDark}
  loading={!theme}
  disabled={!theme}
  className="theme-toggle"
  role="switch"
  aria-checked={isDark}
  aria-label={label}
  title={label}
/>
