<script lang="ts">
  import Button from '@/components/buttons/Button.svelte';

  interface Testimonial {
    name: string;
    role: string;
    text: string;
    avatar: {
      src: string;
      alt?: string;
    };
  }

  interface Props {
    testimonials?: Testimonial[];
    className?: string;
  }

  let { testimonials = [], className }: Props = $props();
  let currentIndex = $derived(testimonials.length > 2 ? 1 : 0);

  const getItemId = (name: string) =>
    `testimonial-${name.replaceAll(' ', '-').toLowerCase()}`;

  const itemIds = $derived(testimonials.map((t) => getItemId(t.name)));
  const prevIndex = $derived(
    (currentIndex - 1 + testimonials.length) % testimonials.length,
  );
  const nextIndex = $derived((currentIndex + 1) % testimonials.length);

  const scrollToCard = (index: number) => {
    const cardId = itemIds[index];
    document.getElementById(cardId)?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  const navigate = (direction: 1 | -1) => {
    currentIndex =
      (currentIndex + direction + testimonials.length) % testimonials.length;
    scrollToCard(currentIndex);
  };

  $effect.pre(() => scrollToCard(currentIndex));
</script>

<div class="testimonials flex-layout column gap align-center">
  <div class="cards flex-layout">
    {#each testimonials as item}
      <div
        id={getItemId(item.name)}
        class="testimonial-card flex-layout column gap gap-lg"
      >
        <p class="quote">"{item.text}"</p>
        <div class="author flex-layout align-center justify-start gap">
          <img
            src={item.avatar.src}
            alt={item.avatar.alt || item.name}
            loading="lazy"
          />
          <div class="author-info flex-layout column">
            <strong>{item.name}</strong>
            <span>{item.role}</span>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <div class="controls flex-layout gap align-center justify-space-between">
    <Button
      className="prev-button"
      variant="secondary"
      size="small"
      onclick={() => navigate(-1)}
      icon="keyboard_arrow_left"
      aria-label="Previous testimonial"
    />
    <Button
      className="next-button"
      variant="secondary"
      size="small"
      onclick={() => navigate(1)}
      icon="keyboard_arrow_right"
      aria-label="Next testimonial"
    />
  </div>
</div>

<style>
  .testimonials {
    position: relative;
  }

  .cards {
    position: relative;
    padding: 0 var(--space-2xl);
    width: 100%;
    align-items: stretch;
    gap: var(--space-lg);
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    mask-image: linear-gradient(
      to right,
      transparent,
      black var(--space-2xl),
      black calc(100% - var(--space-2xl)),
      transparent
    );
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 600px) {
      padding: 0 var(--space-lg);
      gap: var(--space-md);
      mask-image: linear-gradient(
        to right,
        transparent,
        black var(--space-lg),
        black calc(100% - var(--space-lg)),
        transparent
      );
    }
  }

  .testimonial-card {
    flex: 1 0 100%;
    position: relative;
    padding: var(--space-xl);
    background-color: var(--surface-1);
    scroll-snap-align: center;

    @media (max-width: 600px) {
      padding: var(--space-lg);
    }

    .quote {
      font-style: italic;
      color: var(--text-muted);
    }

    .author {
      position: relative;

      img {
        width: var(--space-3xl);
        height: var(--space-3xl);
        background-color: var(--surface-3);
        filter: hue-rotate(-10deg);
        clip-path: polygon(15% 0, 100% 0%, 85% 100%, 0% 100%);
      }
    }

    .author-info {
      strong {
        font-size: var(--font-size-body);
        color: var(--text-secondary);
      }

      span {
        font-size: var(--font-size-h6);
        color: var(--text-muted);
        line-height: normal;
      }
    }
  }

  .controls {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);

    @media (max-width: 600px) {
      position: relative;
      top: auto;
      left: auto;
      transform: none;
      padding: 0 var(--space-lg);
    }
  }
</style>
