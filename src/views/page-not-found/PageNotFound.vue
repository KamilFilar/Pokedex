<template>
  <div class="pnf-wrapper">
    <h1 class="pnf-wrapper__text is-animation">
      <span v-for="(value, index) in errorChars" :key="index">
        {{ value }}
      </span>
    </h1>
    <h2>page not found</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorChars: ["4", "0", "4"],
    };
  },
};
</script>

<style lang="scss" scoped>
// Why?? I don't know... This remvoe 8px margin in body :/
* {
  margin: 0;
}

.pnf-wrapper {
  position: relative;
  text-align: center;
  box-sizing: border-box;
  height: 100vh;

  h1,
  h2 {
    font-family: "Bungee", Arial, sans-serif;
  }

  h2 {
    position: relative;
    margin-top: -40px;
    color: white;
    font-size: 2rem;
    letter-spacing: 1px;
  }

  h1 {
    color: rgb(255, 132, 0);
    font-size: 3.5rem;
    letter-spacing: 10px;
  }

  h1 span {
    display: inline-block;
    animation: wave-text 1s ease-in-out infinite;
  }

  &__text.is-animation {
    @for $i from 1 through 3 {
        span:nth-of-type(#{$i}) {
            animation-delay: $i* 0.1s;
        }
    }
  }
}

@keyframes wave-text {
  0% {
    transform: translateY(0em);
  }
  60% {
    transform: translateY(-0.3em);
  }
  100% {
    transform: translateY(0em);
  }
}
</style>
