<template>
  <div class="wrapper">
    <div class="img-container">
      <img :src="pokeImg" />
    </div>
    <div class="description">
      <p class="description--id">
        #{{ setPokedexNumber(pokeID) }}
      </p>
      <p class="description--name">
        {{ firstLetterUp(pokeName) }}
      </p>
      <p class="description--type-left" :class="pokeType1">
        {{ pokeType1 }}
      </p>
      <p class="description--type-right" :class="pokeType2" v-if="pokeType2 != undefined">
        {{ pokeType2 }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["pokeName", "pokeURL"],

  data() {
    return {
      pokeID: "",
      pokeImg: "",
      pokeType1: "",
      pokeType2: "",
    };
  },

  methods: {
    getPokemonData(url) {
      axios.get(url)
        .then((res) => {
          this.pokeID = res.data.order;
          this.pokeImg = res.data.sprites.front_default;
          if ( res.data.types.length == 2 ) {
            this.pokeType1 = res.data.types[0].type.name;
            this.pokeType2 = res.data.types[1].type.name;
          }
          else {
            this.pokeType1 = res.data.types[0].type.name;
            this.pokeType2 = undefined;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    firstLetterUp(string) {
      if (!string) return; // check for null, undefined, empty etc.
      return string.match("^[a-z]")
        ? string.charAt(0).toUpperCase() + string.substring(1)
        : string;
    },

    setPokedexNumber(pokemon_id) {
      return ('000' + pokemon_id).slice(-3);
    }
  },

  mounted() {
    this.getPokemonData(this.pokeURL);
  }
};
</script>

<style lang="scss" scoped>
@import './../assets/styles/pokemonTypes.scss';

.wrapper {
  width: 280px;
  background: rgba(245, 245, 245, 0.85);
  box-shadow: 0 0 3px black;
  margin: 10px auto;
  padding: 7px;
  border-radius: 5px;

  .img-container {
    box-shadow: 0 0 5px black;
    background: rgba(245, 245, 245, .6);
    border-radius: 5px;
    max-width: 100%;
    max-height: auto;
    margin: 0 auto;

    img {
      width: 75%;
      height: auto;
    }
  }

  .description {
    text-align: left;
    font-family: "Raleway", Arial, sans-serif;
    font-weight: bold;

    &--id {
      margin: 10px 0 5px;
      font-size: 1rem;
      color: rgb(65, 65, 65);
    }

    &--name {
      margin: 5px 0;
      padding: 3px;
      color: rgb(25, 25, 25);
      font-size: 1.3rem;
      letter-spacing: 1px;
    }

    &--type-left,
    &--type-right {
      display: inline-block;
      color: white;
      margin-bottom: 0;
      margin: 5px;
      padding: 5px 8px;
      font-size: 0.8rem;
      letter-spacing: 2px;
      border: none;
      outline: none;
    }

    &--type-left {
      margin-left: 3px; // same as &--name padding!
    }
  }
}

@media (max-width: 359px) {
  .wrapper {
    width: 90%;
  }
}
</style>
