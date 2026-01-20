<script lang="ts">
  import Button from '@/components/buttons/Button.svelte';
  import Icon from '@/components/Icon.svelte';

  interface Section {
    id: string;
    title: string;
  }

  interface Props {
    sections: Section[];
  }

  let { sections }: Props = $props();

  let isOpen = $state(false);
  let workSections = $derived([
    { id: 'summary', title: 'Summary' },
    ...sections,
  ]);
  let activeSection = $state('');

  $effect(() => {
    if (typeof window === 'undefined') return;

    isOpen = window.innerWidth > 1500;
    const workNav = document.getElementById('work-nav');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection = entry.target.id;

            workNav?.querySelector('.active')?.scrollIntoView({
              block: 'center',
              behavior: 'smooth',
            });
          }
        });
      },
      {
        rootMargin: '-55% 0% -25% 0%',
        threshold: 0.011,
      },
    );

    workSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  });

  const toggleMenu = () => {
    isOpen = !isOpen;
  };
</script>

<nav
  id="work-nav"
  class={['work-nav flex-layout column', isOpen ? 'menu-open' : 'menu-closed']}
  aria-roledescription="work navigation"
>
  <div
    class="toggle-button flex-layout gap gap-xl align-center justify-space-between"
  >
    <a href="/works" class="back-link flex-layout gap gap-2xs align-center">
      <Icon name="arrow_back" />
      <span>All Works</span>
    </a>

    <Button
      variant="primary"
      size="small"
      onclick={toggleMenu}
      icon={isOpen ? 'left_panel_close' : 'list_alt'}
      className={isOpen ? 'align-self-end' : 'align-self-start'}
    />
  </div>

  <ul class="section-list flex-layout column gap gap-xs">
    {#each workSections as section}
      <li class="section-item" class:active={activeSection === section.id}>
        <a
          href={`#${section.id}`}
          class="nav-link flex-layout gap gap-sm align-center"
        >
          <span>{section.title}</span>
          <span class="slash"></span>
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .work-nav {
    position: fixed;
    top: calc(var(--header-height) + var(--container-padding) / 2);
    max-width: max(16rem, 20vw);
    max-height: calc(100vh - var(--header-height) - var(--container-padding));
    background-color: var(--surface-2);
    border-block-start: var(--stroke-width-thin) solid var(--border-color);
    overflow-y: auto;
    transition: all var(--transition-fast);
    animation: slideInLeft 0.3s ease forwards;
    z-index: var(--z-sticky);

    &.menu-open {
      min-width: var(--full-bleed-padding);
      background-color: var(--surface-2);
      box-shadow: var(--shadow-near);
    }

    &.menu-closed {
      padding: var(--space-xs);

      .back-link,
      .section-list {
        display: none;
      }
    }

    .toggle-button {
      position: sticky;
      top: 0;
      width: 100%;
      min-width: min-content;
      z-index: var(--z-sticky);

      .menu-open & {
        padding: var(--space-sm) var(--space-md) var(--space-lg);
        background-color: var(--surface-2);
        mask-image: linear-gradient(
          to bottom,
          var(--surface-2) calc(100% - var(--space-lg)),
          rgba(255, 255, 255, 0)
        );
      }
    }
  }

  .section-list {
    max-width: 100%;
    min-width: 20ch;
    padding: 0 var(--space-lg) var(--space-2xl) var(--space-lg);

    .section-item .nav-link {
      padding: var(--space-xs);
      color: var(--text-muted);
      transition: all var(--transition-fast);

      .slash {
        opacity: 0;
        transform: translateX(-1em);
        visibility: hidden;
        transition: all var(--transition-fast) 0.05s;
      }

      .active & {
        font-weight: var(--font-weight-semibold);
        background-color: var(--surface-3);
        color: var(--text-primary);

        .slash {
          opacity: 1;
          transform: translateX(0);
          margin-inline-start: 0;
          visibility: visible;
        }
      }
    }
  }
</style>
