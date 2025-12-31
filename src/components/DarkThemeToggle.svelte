<script lang="ts">
  import Switch from "@/components/buttons/Switch.svelte";
  import { onMount } from "svelte";

  let theme: string | null = $state(null);
  const icon = $derived(
    theme ? (theme === "dark" ? "dark_mode" : "light_mode") : null,
  );

  $inspect("theme", theme);

  onMount(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved && (saved === "light" || saved === "dark")) {
        theme = saved;
        document.documentElement.setAttribute("data-theme", theme);
      }
    } catch (e) {
      // ignore restricted environments
    }
  });

  function toggleTheme() {
    theme = theme === "light" ? "dark" : "light";
    try {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    } catch (e) {}
    console.log("toggleTheme ->", theme);
  }
</script>

<Switch
  onclick={toggleTheme}
  icon={icon || undefined}
  checked={theme === "light"}
  loading={!theme}
/>
