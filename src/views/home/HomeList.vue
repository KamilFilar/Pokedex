<template>
  <div class="list-wrapper">
    <p class="title">
      Poke
      <span class="title--color"> List </span>
    </p>
    <div class="search-box">
      <input placeholder="Pick id or name pokemon..." type="text" />
    </div>
    <div class="list-box">
      <PokeCard
        v-for="pokemon in pokeArr"
        :key="pokemon.index"
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
    PokeCard
  },

  data() {
    return {
      pokeArr: [],
      current_page: 0
    };
  },

  methods: {
    getFirstPokemons() {
      axios.get(`${API}/?limit=12`)
        .then((res) => {
          for (let i = 0; i < 12; i++) {
            this.pokeArr.push({
              name: res.data.results[i].name,
              url: res.data.results[i].url,
            });
          }
        })
        .catch((err) => {
          console.log(err.data);
        });
    },

    getPokemons(scrollValue) {
      scrollValue--; // start load from index = 12 so first scroll value must be 0
      let pokemonIndex = 12 + (scrollValue * 12); // 12 'per display'

      axios.get(`${API}/?limit=12&offset=${pokemonIndex}`)
        .then((res) => {
          for (let i = 0; i < 100; i++) {
            this.pokeArr.push({
              name: res.data.results[i].name,
              url: res.data.results[i].url,
            });
          }
        })
        .catch((err) => {
          if (!err.data == undefined ) console.log(err);
        });
    },

    onScrollLoadContent() {
      window.addEventListener('scroll', () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if ( (scrollTop + clientHeight) >= scrollHeight) {
          this.current_page++;
          this.getPokemons(this.current_page);
        }
      })
    }
  },

  mounted() {
    this.getFirstPokemons();
    this.onScrollLoadContent();
  }
}
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

.search-box {
  margin-bottom: 30px;

  input {
    width: 60%;
    height: auto;
    min-height: 30px;
    padding: 10px 0px 5px 5px;
    background: rgba(0, 0, 0, 0.8);
    border-top: 1px solid rgb(210, 110, 0);
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgb(210, 110, 0);
    font-size: 1.2rem;
    color: white;
    transition: 0.3s;

    &:focus {
      outline: none;
      border-top: 1px solid rgb(255, 185, 100);
      border-bottom: 1px solid rgb(255, 185, 100);
    }

    &:hover {
      border-top: 1px solid rgb(255, 160, 60);
      border-bottom: 1px solid rgb(255, 160, 60);
    }
  }
}

.list-box {
  display: flex;
  flex-wrap: wrap;
  margin: 0 40px;
}

@media screen and (max-width: 660px) {
  .title {
    font-size: 2rem;
  }

  .list-box {
    margin: 0 15px;
  }
  .search-box {
    margin-bottom: 15px;

    input {
      width: 250px !important;
      font-size: 1rem;
      min-height: 20px;
    }
  }
}
</style>
