<script lang="ts">
  import Icon from "@/components/Icon.svelte";
  import { normalizeUrlPath, toTitleCase } from "@/utils/Helpers.svelte";

  interface Props {
    links: string[];
    currentPage: string;
    className?: string;
  }

  let { links, currentPage, className }: Props = $props();
  let menuOpen = $state(false);

  let activePage = $derived(normalizeUrlPath(currentPage));

  const toggleMenu = () => {
    menuOpen = !menuOpen;
  };

  $inspect("currentPage", currentPage);
  $inspect("menuOpen", menuOpen);
</script>

<nav
  class={["header-nav flex-layout gap", className]}
  aria-roledescription="main navigation"
>
  <button class="menu-button" onclick={toggleMenu}>
    <Icon icon="menu" className="icon" />
  </button>
  <div
    class={["menu flex-layout gap gap-xs", menuOpen && "open"]}
    aria-expanded={menuOpen}
  >
    {#each links as link, index}
      {@const normalizedPath = normalizeUrlPath(link)}
      <a
        id={`nav-link-${index}`}
        href={activePage === normalizedPath ? undefined : `/${normalizedPath}`}
        class={["nav-link", activePage === normalizedPath && "active"]}
      >
        {toTitleCase(link)}
      </a>
    {/each}
  </div>
</nav>

<style>
  nav {
    position: relative;

    :global(a.nav-link) {
      font-family: var(--font-headings);
      font-size: var(--font-size-h5);
      font-weight: var(--font-weight-medium);
      padding: var(--space-xs) var(--space-sm);

      &.active {
        background-color: var(--surface-3);
        text-shadow: var(--shadow-inverse);
        cursor: initial;
      }
    }
  }

  .menu {
    width: 100%;
    display: none;
  }

  @media screen and (min-width: 636px) {
    .menu {
      display: flex;
    }
  }

  @media screen and (max-width: 635px) {
    .menu {
      &.open {
        display: flex;
        flex-direction: column;
        position: absolute;
        padding: var(--space-sm) var(--space-md);
        top: calc(100% + var(--space-2xs));
        right: 0;
        width: fit-content;
        background-color: var(--surface-2);
        box-shadow: var(--shadow-near);
        border: 1px solid var(--border-color);
        z-index: 1;

        &.gap-2xs {
          gap: var(--space-sm);
        }
      }
    }
  }

  .menu-button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-primary);

    &:hover {
      color: var(--action-hover);
    }

    @media screen and (min-width: 636px) {
      display: none;
    }

    :global(.icon) {
      color: currentColor;
      font-size: var(--input-height-sm);
    }
  }
</style>
