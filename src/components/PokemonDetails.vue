<template>
  <div class="wrapper">
    <p class="title">
      Poke
      <span class="title--color"> Details </span>
    </p>
    <div class="btn-wrapper">
      <Button :btnName="'Previous'" :btnIcon="'arrow-left'" @click="getPreviousPokemon()"/>
      <Button :btnName="'Next'" :btnIcon="'arrow-right'" @click="getNextPokemon()"/>
    </div>
    <div class="pokemonDetails-box">
      <div class="pokemonDetails-box__img">
        <img :src="pokemonObj.imgPath" />
      </div>
      <div class="pokemonDetails-box__header">
        <div class="header-text">
          <p class="header-text--title">
            {{ firstLetterUp(pokemonObj.name) }}
          </p>
          <p class="header-text--id">#{{ setPokedexNumber(pokemonObj.id) }}</p>
        </div>
        <div class="header-types">
          <p class="header-types--left" :class="pokemonObj.pokeType1">
            {{ pokemonObj.pokeType1 }}
          </p>
          <p
            class="header-types--right"
            :class="pokemonObj.pokeType2"
            v-if="pokemonObj.pokeType2 != undefined"
          >
            {{ pokemonObj.pokeType2 }}
          </p>
        </div>
      </div>
      <div class="pokemonDetails-box__body">
        <p class="pokemonDetails-box__body--desc">
          {{ removeSpecialChars(pokemonObj.description) }}
        </p>
        <div class="pokemonDetails-box__body__stats">
          <p>
            Region:
            <span> {{ firstLetterUp(pokemonObj.region) }} </span>
          </p>
          <p>
            Weight:
            <span> {{ pokemonObj.weight }} </span>
          </p>
          <p>
            Height:
            <span> {{ pokemonObj.height }} </span>
          </p>
          <p>
            Abilities 1:
            <span> {{ firstLetterUp(pokemonObj.abilities1) }} </span>
          </p>
          <p>
            Abilities 2:
            <span> {{ firstLetterUp(pokemonObj.abilities2) }} </span>
          </p>
        </div>
      </div>
    </div>
    <router-link :to="'/list'" class="router-link">
      <font-awesome-icon icon="angles-left" class="fa-icon fa-icon--left" />
      <span> Back to list </span>
      <font-awesome-icon icon="angles-left" class="fa-icon" />
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
import Button from "./Button.vue";

const API = "https://pokeapi.co/api/v2/";

export default {
  //   props: ["pokemonID"],
  components: {
    Button,
  },

  data() {
    return {
      pokemonID: 4,
      currentPokemonID: 0,
      pokemonObj: {
        id: "",
        name: "",
        description: "",
        imgPath: "",
        height: "",
        weight: "",
        pokeType1: "",
        pokeType2: "",
        abilities1: "",
        abilities2: "",
        generation: "",
        numberOfGeneration: "",
        region: "",
      },
    };
  },

  methods: {
    getPokemon(id) {
      this.currentPokemonID = id;
      axios.get(`${API}` + `pokemon/` + id)
        .then((res) => {
          // console.log(res.data)
          this.pokemonObj.id = res.data.id;
          this.pokemonObj.name = res.data.species.name;
          this.pokemonObj.imgPath = res.data.sprites.front_default;
          this.pokemonObj.height = res.data.height;
          this.pokemonObj.weight = res.data.weight;
          if (res.data.abilities.length == 2) {
            this.pokemonObj.abilities1 = res.data.abilities[0].ability.name;
            this.pokemonObj.abilities2 = res.data.abilities[1].ability.name;
          } 
          else {
            this.pokemonObj.abilities1 = res.data.abilities[0].ability.name;
            this.pokemonObj.abilities2 = '---';
          }
          if (res.data.types.length == 2) {
            this.pokemonObj.pokeType1 = res.data.types[0].type.name;
            this.pokemonObj.pokeType2 = res.data.types[1].type.name;
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
        .then((res) => {
          // console.log(res.data)
          this.pokemonObj.description = res.data.flavor_text_entries[1].flavor_text;
          this.pokemonObj.generation = res.data.generation.name;
          axios.get(`${API}` + `generation/` + this.pokemonObj.generation)
            .then((res) => {
              this.pokemonObj.region = res.data.main_region.name;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getNextPokemon() {
      this.currentPokemonID++;
      this.getPokemon(this.currentPokemonID);
    },

    getPreviousPokemon() {
      this.currentPokemonID--;
      if (this.currentPokemonID <= 0) {
        this.$swal({
          customClass: {
            confirmButton: "sweet-alert-button-wrong",
            popup: "sweet-alert-popup-wrong",
            text: "sweet-alert-title",
          },
          text: "Previous Pokemon not exist! 😥",
          buttonsStyling: false,
          icon: "error",
          iconColor: "rgb(220, 0, 0)",
          confirmButtonText: "Close",
        });
      }
      else {
        this.getPokemon(this.currentPokemonID);
      }
    },

    removeSpecialChars(string) {
      return string.replace("\f", " ");
    },

    firstLetterUp(string) {
      if (!string) return; // check for null, undefined, empty etc.
      return string.match("^[a-z]")
        ? string.charAt(0).toUpperCase() + string.substring(1)
        : string;
    },

    setPokedexNumber(pokemon_id) {
      return ("000" + pokemon_id).slice(-3);
    },
  },

  mounted() {
    this.getPokemon(this.pokemonID);
  },
};
</script>

<style lang="scss" scoped>
@import "./../assets/styles/pokemonTypes.scss";
.router-link {
width: 280px;
    color: rgb(190, 190, 190);
    padding: 5px 0;
    margin: 15px auto;
    font-size: 1.2rem;
    letter-spacing: 1px;
    text-decoration: none;
    transition: 0.5s;

    &:hover {
      color: rgb(255, 132, 0);
    }

    &:hover .fa-icon {
      opacity: 1;
      transition: opacity 0.25s linear;
    }
}

.fa-icon {
  opacity: 0;
  margin: -1px 0 0 3px;

  &--left {
    margin: -1px 4px 0 0;
  }
}

.wrapper {
  position: relative;
  text-align: center;
  box-sizing: border-box;
  min-height: 100vh;
  padding-bottom: 15px;
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

.pokemonDetails-box {
  margin: 15px auto;
  padding: 7px;
  width: 90%;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 3px black;
  border-radius: 3px;

  &__img {
    box-shadow: 0 0 7px black;
    border-radius: 3px;
    background: rgb(250, 250, 250);

    img {
      width: 80%;
      height: auto;
    }
  }

  &__header {
    font-family: "Raleway", Arial, sans-serif;
    margin: 10px;

    .header-text {
      display: flex;
      justify-content: space-between;

      &--title {
        display: inherit;
        align-items: center;
        font-size: 2rem;
        font-weight: bold;
        letter-spacing: 1px;
        color: rgb(45, 45, 45);
      }

      &--id {
        font-size: 1.3rem;
        color: rgb(65, 65, 65);
      }
    }

    .header-types {
      display: flex;
      justify-content: center;

      &--left,
      &--right {
        display: inline-block;
        color: white;
        margin: 10px 8px;
        padding: 6px 8px;
        font-size: 1rem;
        letter-spacing: 2px;
        border: none;
        outline: none;
        box-shadow: 0 0 3px black;
      }

      &--left {
        margin-left: 3px; // same as &--name padding!
      }
    }

    p {
      margin: 0;
    }
  }

  &__body {
    text-align: left;
    font-family: "Raleway", Arial, sans-serif;
    font-weight: bold;
    margin: 10px 0;
    font-size: 1.1rem;
    line-height: 1.4rem;

    &--desc {
      margin: 0;
      padding: 5px 8px;
      color: rgb(25, 25, 25);
      text-align: left;
      text-indent: 10px;
      background: rgba(255, 255, 255, 0.7);
      box-shadow: 0 0 2px black;
      border-radius: 3px;
    }

    &__stats {
      letter-spacing: 1px;
      margin: 10px 3px;

      p {
        margin: 7px 0;
        font-size: 1.1rem;
        color: rgb(65, 65, 65);

        span {
          color: black;
        }
      }
    }
  }
}

@media screen and (max-width: 660px) {
  .title {
    font-size: 2rem;
  }
}
</style>
