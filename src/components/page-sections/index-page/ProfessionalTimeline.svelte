<script lang="ts">
  import Icon from "@/components/Icon.svelte";

  interface Props {
    concise?: boolean;
    orientation?: "vertical" | "horizontal";
    id?: string;
    className?: string;
  }

  let { concise, orientation = "horizontal", id, className }: Props = $props();

  const itemDetails = [
    {
      item: "comet",
      dateStart: "2022",
      dateEnd: "Present",
      title: "Product Lead",
      company: "COMET",
      link: "https://www.cometapp.net",
      conciseText:
        "Leading the strategic transition of a complex simulation engine from an offline basic tool to a scalable SaaS platform. By identifying user-reported logistical challenges, I led the redesign that resulted in a 23x software efficiency boost.",
      responsibilities: [
        "Leading the redesign of COMET, boosting software efficiency by 23x and increasing Simulations deployment by 267% per workshop.",
        "Defining product vision, strategy, and roadmap. Scoped and prioritized activities based on business and customer impact.",
        "Collaborating & Driving the execution of product lifecycle and sprints.",
        "Translating product strategy into requirements, wireframes, and functional prototypes that prioritize features and validate product designs.",
        "Leading and executing end-to-end User Experience/Interface Design & Front-end development processes.",
        "Building simple, elegant, data-driven, human-centric digital experiences and usable intuitive user interfaces, improving them based on user testing.",
      ],
    },
    {
      item: "enact",
      dateStart: "2020",
      dateEnd: "2022",
      title: "Senior Product Designer",
      company: "Energy Action Partners",
      link: "https://www.enactpartners.org",
      conciseText:
        "Oversaw the end-to-end development of community-focused digital products. I acted as the primary bridge between stakeholder vision and engineering execution, ensuring every design decision was rooted in user value and technical feasibility.",
      responsibilities: [
        "Leading and executing end-to-end User Experience Design process.",
        "Designing simple, elegant, data-driven, human-centric digital experiences and usable intuitive user interfaces, improve them based on user testing.",
        "Communicating digital design solutions to developers and stakeholders.",
      ],
    },
    {
      item: "tipping-point-1",
      dateStart: "2015",
      dateEnd: "2020",
      title: "Senior UX/UI Designer",
      company: "The Tipping Point",
      link: "http://www.ttphcc.com",
      conciseText:
        "Delivered high-impact interactive experiences for global healthcare leaders including Pfizer, Merck, and Abbott. I managed the full design-to-code workflow for complex CLM applications, balancing strict pharmaceutical compliance with advanced animations and storytelling.",
      responsibilities: [
        "Successfully designed and built 40+ interactive digital e-detailing CLM presentations, websites, and adaptive web applications.",
        "Conducted user research and designed responsive wireframes and high-fidelity prototypes to achieve reliable effective user experiences.",
        "Developed maintainable cross-platform solutions and improved them based on iterative usability testing, analytics, and user feedback.",
        "Utilized web animations and intuitive meaningful interactions to deliver complex data as creative infographics and illustrations to users.",
        "Veeva certified for CLM, Approved Emails, and Engage for 3 years.",
      ],
    },

    {
      item: "tipping-point-2",
      dateStart: "2013",
      dateEnd: "2015",
      title: "Web Designer & Digital Studio Liaison",
      company: "The Tipping Point",
      link: "http://www.ttphcc.com",
      conciseText:
        "Designed, developed, and deployed digital products for CLM and healthcare industry. I collaborated with external agencies and Pharma leading clients for global projects.",
      responsibilities: [
        "Conducted user interviews, surveys, and usability testing sessions.",
        "Conducted stakeholder discovery workshops, presented UX design concepts, and justified UX decisions that meet business goals.",
        "Designed, developed, and deployed digital products for CLM.",
        "Liaised with external agencies and Pharma leading clients for global projects.",
      ],
    },
  ];
</script>

{#snippet TimelineItem(
  item: {
    item: string;
    dateStart: string;
    dateEnd: string;
    title: string;
    company: string;
    link: string;
    conciseText: string;
    responsibilities: string[];
  },
  className?: string,
)}
  <li
    class={[
      "timeline-item flex-layout gap",
      item.dateEnd === "Present" && "current",
      orientation === "horizontal" && "column",
      orientation,
      className,
    ]}
  >
    <div class="timeline-dot" data-item={item.item}>
      <span class="dot"></span>
    </div>

    <div class="item-content">
      <p class="item-date meta-label">
        <time datetime={item.dateStart}>{item.dateStart}</time> -
        <time datetime={item.dateEnd}>{item.dateEnd}</time>
      </p>

      <h5 class="item-title flex-layout gap gap-xs align-center justify-start">
        <span class="slash" aria-hidden="true"></span>
        <span class="title">{item.title}</span>
      </h5>

      {#if concise}
        <div class="company emphasized">
          <a href={item.link} target="_blank" rel="noopener noreferrer"
            >{item.company}</a
          >
        </div>
        <p class="concise">{item.conciseText}</p>
      {/if}

      {#if !concise}
        <details
          name={item.item}
          class="item-details"
          open={item.item === "comet"}
        >
          <summary
            class={["flex-layout align-center", concise && "disabled"]}
            tabindex={concise ? -1 : 0}
          >
            <span>{item.company}</span>
            <Icon icon="keyboard_arrow_down" className="icon" />
          </summary>

          {#if !concise}
            <ul class="job-responsibilities">
              {#each item.responsibilities as responsibility}
                <li>{responsibility}</li>
              {/each}
            </ul>
          {/if}
        </details>
      {/if}
    </div>
  </li>
{/snippet}

<section
  {id}
  class={[
    "professional-timeline flex-layout column justify-center",
    orientation,
    className,
  ]}
>
  <h3>Professional Timeline</h3>

  <ol
    class={[
      "timeline flex-layout",
      orientation === "horizontal" && "full-bleed",
      orientation === "vertical" && "column",
    ]}
  >
    {#each itemDetails as item}
      {@render TimelineItem(item)}
    {/each}
  </ol>
</section>

<style>
  .professional-timeline {
    padding: var(--space-2xl) 0 max(5lvh, var(--space-xl));
    gap: 8lvh;
  }

  .timeline {
    position: relative;
    align-items: stretch;
    transition: all var(--transition-default);

    .horizontal & {
      mask-image: linear-gradient(
        to right,
        transparent 0,
        black var(--space-xl),
        black calc(100% - var(--space-xl)),
        transparent
      );
      padding-inline-start: calc((100vw - 100%) / 2);
      padding-inline-end: calc((100vw - 100%) / 2);
      overflow: auto;
    }

    .timeline-item {
      position: relative;
      max-width: 100%;

      &.horizontal {
        flex: 1 0 min(30rem, 80vw);
      }

      &.vertical {
        flex: 1 0 min(20rem, 25vh);
      }
    }

    .timeline-dot {
      position: relative;
      flex-shrink: 0;
      display: flex;
      align-items: center;

      .timeline-item:last-child & {
        &::after {
          mask-image: linear-gradient(
            to right,
            black 0,
            black var(--space-xl),
            black calc(100% - var(--space-xl)),
            transparent
          );
        }
      }

      &::after {
        content: "";
        flex: 1 1 0;
        display: block;
        background-color: var(--surface-3);
      }

      .vertical & {
        flex-direction: column;
        justify-content: center;

        &::after {
          width: var(--space-2xs);
        }
      }

      .horizontal & {
        &::after {
          height: var(--space-2xs);
        }
      }
    }

    .dot {
      position: relative;
      display: block;
      margin: 0.5rem 0.25rem;
      width: 1.5rem;
      height: 1.5rem;
      aspect-ratio: 1;
      border-radius: var(--radius-full);
      background-color: var(--surface-inverse);
      color: var(--surface-inverse);
      border: var(--space-2xs) solid var(--surface-0);

      .current & {
        background-color: var(--accent);
        color: var(--accent);

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          margin: auto;
          min-width: 100%;
          min-height: 100%;
          border-radius: var(--radius-full);
          outline: var(--space-2xs) solid rgb(from currentColor r g b / 0.22);
          outline-offset: var(--space-2xs);
          animation: growFadeInOut 1.5s linear infinite;
          z-index: -1;
        }
      }
    }

    .item-date {
      /* font-weight: var(--font-weight-medium); */
      color: var(--text-muted);

      .vertical & {
        line-height: 2.5rem;
      }
    }

    .item-content {
      flex: 1 1 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-md);

      .horizontal & {
        padding-inline-end: var(--space-xl);
      }

      .vertical & {
        padding-block-end: var(--space-xl);
      }
    }

    .company {
      align-self: start;
    }

    .concise {
      flex-grow: 1;
      align-items: start;
      justify-self: stretch;
      background-color: var(--surface-1);
      padding: var(--space-md);
    }

    details {
      flex: 1 1 0;
      max-width: 100%;
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: var(--space-sm);

      &:not([open]) {
        .job-responsibilities {
          display: none;
        }

        summary :global(.icon) {
          padding-block-start: 0.05em;
        }
      }

      &[open] {
        .job-responsibilities {
          display: flex;
        }

        summary :global(.icon) {
          transform: rotate(180deg);
          padding-bottom: 0.05em;
        }
      }

      summary {
        list-style: none;
        justify-items: start;
        align-self: start;
        padding: var(--space-2xs) var(--space-xs) var(--space-2xs)
          var(--space-sm);
        gap: var(--space-2xs);
        background-color: var(--surface-2);
        font-weight: var(--font-weight-medium);
        cursor: pointer;

        .concise & {
          cursor: initial;
        }

        :global(&:has(+ .icon):not(.disabled)) {
          cursor: pointer;
        }

        &.disabled {
          cursor: initial;
          pointer-events: none;
        }

        &::marker {
          content: "";
        }
      }
    }

    .job-responsibilities {
      position: relative;
      flex-direction: column;
      gap: var(--space-xs);
      padding: 0 var(--space-md) var(--space-md);
      transition: all var(--transition-default);

      li {
        list-style-type: square;
        list-style-position: inside;
      }
    }
  }
</style>
