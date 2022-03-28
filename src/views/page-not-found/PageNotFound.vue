<template>
  <div class="pnf-wrapper">
    <h1 class="pnf-wrapper__text is-animation">
      <span v-for="value in errorChars" :key="value.index">
        {{ value }}
      </span>
    </h1>
    <h2>page not found</h2>
    <router-link :to="'/'" class="return-btn">
      <Button :btnName="'Return'" :btnIcon="'arrow-right-to-bracket'"/>
    </router-link>
  </div>
</template>

<script>
import Button from './../../components/Button.vue'  

export default {
  components: {
    Button
  },
 

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
  min-height: 100vh;

  h1,
  h2 {
    font-family: "Bungee", Arial, sans-serif;
    transition: .3s;
  }

  h2 {
    position: relative;
    margin-top: -70px;
    color: white;
    font-size: 3rem;
    letter-spacing: 2px;
  }

  h1 {
    color: rgb(255, 132, 0);
    font-size: 4rem;
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

  .return-btn {
    position: absolute;
    bottom: 60px;
    left: 0;
    right: 0;
  }
}

@media screen and (max-width: 660px) {
  .pnf-wrapper {
    h2 {
      margin-top: -40px;
      font-size: 2rem;
      letter-spacing: 2px;
    }

    h1 {
      font-size: 3.5rem;
      letter-spacing: 10px;
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
