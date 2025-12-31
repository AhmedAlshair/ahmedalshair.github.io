<div class="loader">
  <span class="slash shadow"></span>
  <span class="slash"></span>
</div>

<style>
  .loader {
    position: relative;
    width: 1.5em;
    height: 1em;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    color: inherit;

    > .slash {
      width: 50%;
      height: 100%;
      color: currentColor;
      animation: move 0.6s ease-in-out infinite alternate;
      animation-fill-mode: both;

      &.shadow {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        opacity: 0.4;
        animation-delay: 0.6s;
      }
    }
  }

  @keyframes move {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(50%);
    }
  }
</style>
