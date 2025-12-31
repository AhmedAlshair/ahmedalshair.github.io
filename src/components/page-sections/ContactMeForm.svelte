<script lang="ts">
  import Button from "@/components/buttons/Button.svelte";

  interface Props {
    formId: string;
    className?: string;
  }

  type Status = "initial" | "submitting" | "success" | "error";

  let { formId, className }: Props = $props();
  let formEndPoint = $derived(`https://formspree.io/f/${formId}`);

  let status = $state<Status>("initial");
  let error = $state<string | null>(null);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    status = "submitting";

    try {
      const response = await fetch(formEndPoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        status = "success";
        form.reset();
      } else {
        const data = await response.json();
        status = "error";
        error =
          data.errors?.map((e: any) => e.message).join(", ") ||
          "Submission failed.";
      }
    } catch (err) {
      status = "error";

      const message = err instanceof Error ? err.message : null;
      error = message || "Submission failed";
    }
  }
</script>

{#if ["initial", "submitting", "error"].includes(status)}
  <form
    id="contact-me-form"
    onsubmit={handleSubmit}
    class={["contact-me-form flex-layout column gap", className]}
  >
    <label for="email" class="half">Email:</label>
    <input
      class="half"
      type="email"
      name="email"
      required
      placeholder="Your email that I can reply to"
      autocomplete="email"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      disabled={status === "submitting"}
    />

    <label for="name" class="half">Name:</label>
    <input
      type="text"
      name="name"
      required
      placeholder="Your name"
      class="half"
      autocomplete="name"
      spellcheck="false"
      disabled={status === "submitting"}
    />

    <label for="message">Message:</label>
    <textarea
      name="message"
      required
      rows="4"
      maxlength="1200"
      placeholder="Type your message here ..."
      disabled={status === "submitting"}
    ></textarea>

    <Button
      variant="primary"
      type="submit"
      loading={status === "submitting"}
      icon="send"
      className="align-self-start submit-button"
    >
      {status === "submitting" ? "Sending" : "Send Message"}
    </Button>
  </form>
{/if}

{#if ["success", "error"].includes(status)}
  <div
    class="form-status initial flex-layout column gap justify-center"
    class:success={status === "success"}
    class:failure={status !== "success"}
  >
    <h4>Thanks for your message!</h4>
    <p>I'll get back to you as soon as I can.</p>
  </div>
{/if}

<style>
  .contact-me-form {
    position: relative;
  }

  .form-status {
    min-height: 20lvh;
    padding: var(--space-md);
    border: var(--stroke-width-thin) solid var(--surface-2);
    background-color: var(--surface-1);
    color: var(--text-primary);

    &.success {
      border-color: var(--status-success);
      background-color: hsl(from var(--status-success) h calc(s - 10) 95 / 10%);
    }

    &.failure {
      border-color: var(--status-error);
      background-color: hsl(from var(--status-error) h calc(s - 10) 95 / 10%);
    }

    p {
      color: var(--text-muted);
    }
  }

  :global(.submit-button) {
    margin-block-start: var(--space-md);
  }
</style>
