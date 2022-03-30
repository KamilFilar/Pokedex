<template>
  <div class="wrapper">
    <p class="title">
      Poke
      <span class="title--color"> Details </span>
    </p>
    <div class="btn-wrapper">
      <Button :btnName="'Previous'" :btnIcon="'arrow-left'"/>
      <Button :btnName="'Next'" :btnIcon="'arrow-right'"/>
    </div>


    <div class="pokemonDetails-box">
      <div class="pokemonDetails-box__img">
        <img :src="pokemonObj.imgPath" />
      </div>
      <div class="pokemonDetails-box__title">
        <p>{{ firstLetterUp(pokemonObj.name) }}</p>
        <p>#{{ setPokedexNumber(pokemonObj.id) }}</p>
      </div>
      <p>Opis</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Button from "./Button.vue";

const API = "https://pokeapi.co/api/v2/";

export default {
//   props: ["pokemonID"],
  components: {
    Button
  },

  data() {
    return {
      pokemonID: 1,  
      pokemonObj: {
        id: "",
        name: "",
        description: "",
        imgPath: "",
        height: "",
        weight: "",
        pokeType1: "",
        pokeType2: "",
      },
    };
  },

  methods: {
    getPokemon(id) {
      axios.get(`${API}` + `pokemon/` + id)
        .then((res) => {
          console.log(res.data)
          this.pokemonObj.id = res.data.id;
          this.pokemonObj.name = res.data.species.name;
          this.pokemonObj.imgPath = res.data.sprites.front_default;  
          this.pokemonObj.height = res.data.height;
          this.pokemonObj.weight = res.data.weight;
          if ( res.data.types.length == 2 ) {
            this.pokeType1 = res.data.types[0].type.name;
            this.pokeType2 = res.data.types[1].type.name;
          }
          else {
            this.pokemonObj.pokeType1 = res.data.types[0].type.name;
            this.pokemonObj.pokeType2 = undefined;
          }
        })
        .catch((err) => {
          console.log(err);
        });

      axios.get(`${API}` + `pokemon-species/` + id)
        .then( (res) => {
          this.pokemonObj.description = res.data.flavor_text_entries[0].flavor_text;
        })
        .catch( (err) => {
          console.log(err);
        })
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
    this.getPokemon(this.pokemonID);
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  text-align: center;
  box-sizing: border-box;
  min-height: 100vh;

}

.pokemonDetails-box {
  // position: absolute;
  // top: 2%;
  // left:0;
  // right: 0;
  margin: 0 auto;
  width: 90%;
  padding: 7px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 3px black;
  border-radius: 3px;

  &__img {
    box-shadow: 0 0 6px black;
    border-radius: 5px;
    margin: 3px 10px 5px 3px;
    background: rgb(250, 250, 250);

    img {
      width: 80%;
      height: auto;
    }
  }
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

  &--color {
    color: rgb(210, 110, 0);
  }
}

.btn-wrapper {
  display: flex;
  gap: 30px;
  justify-content: center;
  margin: 0 0 20px;
}

@media screen and (max-width: 660px) {
  .title {
    font-size: 2rem;
  }
}
</style>
