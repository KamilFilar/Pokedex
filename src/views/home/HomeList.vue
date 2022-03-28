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
      <PokeCard v-for="(pokemon) in pokeArr" :key="pokemon.index"
        :pokeName="pokemon.name"
        :pokeURL="pokemon.url"
      />
    </div>
  </div>
</template>

<script>
import PokeCard from "./../../components/PokeCard.vue";
import axios from "axios";

const API = "https://pokeapi.co/api/v2/pokemon";

export default {
  components: {
    PokeCard,
  },
  data() {
    return {
      pokeArr: [],
    };
  },
  methods: {
    getAllPokemon() {
      axios
        .get(`${API}/?limit=12`)
        .then((res) => {
          for (let i = 0; i < 100; i++) {
            this.pokeArr.push({
              name: res.data.results[i].name,
              url: res.data.results[i].url
            });
          }
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
  },
  mounted() {
    this.getAllPokemon();
  },
};
</script>

<style lang="scss" scoped>
.list-wrapper {
  position: relative;
  text-align: center;
  box-sizing: border-box;
  min-height: 100vh;
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

.list-box {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid red;
}

@media screen and (max-width: 660px) {
  .title {
    font-size: 2rem;
  }
}
</style>
