<template>
  <div class="list-wrapper">
    <p class="title">
      Poke
      <span class="title--color"> List </span>
    </p>
    <div class="search-box">
      <input placeholder="Pick id or name pokemon..." type="text" />
      <button>Search</button>
    </div>
    <div class="list-box">
      <PokeCard
        :pokeID="'001'"
        :pokeName="'Dupozaur'"
        :pokeType1="'fire'"
        :pokeType2="'fighting'"
      />
    </div>
  </div>
</template>

<script>
import PokeCard from "./../../components/PokeCard.vue";

export default {
  components: {
    PokeCard,
  },

  data() {
    return {
      btnArray: [
        "normal",
        "fire",
        "water",
        "grass",
        "electric",
        "ice",
        "fighting",
        "poision",
        "ground",
        "flying",
        "psychic",
        "bug",
        "rock",
        "ghost",
        "dark",
        "dragon",
        "steel",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.list-wrapper {
  position: relative;
  text-align: center;
  box-sizing: border-box;
  height: 100vh;
}

.title {
  font-family: "Bungee", Arial, sans-serif;
  font-size: 4rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: white;
  margin: 0;
  cursor: context-menu;
  transition-duration: 0.3s;

  &--color {
    color: rgb(210, 110, 0);
  }
}

@media screen and (max-width: 660px) {
  .title {
    font-size: 2rem;
  }
}
</style>
