<template>
  <div class="wrapper">
    <p class="title">
      Poke
      <span class="title--color"> Details </span>
    </p>
    <div class="btn-wrapper">
      <Button
        :btnName="'Previous'"
        :btnIcon="'arrow-left'"
        @click="getPreviousPokemon()"
      />
      <Button
        :btnName="'Next'"
        :btnIcon="'arrow-right'"
        @click="getNextPokemon()"
      />
    </div>
    <div class="pokemonDetails-box">
      <div class="pokemonDetails-box__img">
        <img :src="pokemonObj.imgPath" />
      </div>
      <div class="pokemonDetails-box__content">
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
        <p class="body--desc">
          {{ removeSpecialChars(pokemonObj.description) }}
        </p>
        <div class="body__stats">
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
    <ButtonRoute 
      :target="'/list'" 
      :text="'Return to list'"
      :iconLeft="'angles-left'"
      :iconRight="'angles-left'"
    />
  </div>
</template>

<script>
import axios from "axios";
import Button from "./buttons/Button.vue";
import ButtonRoute from "./buttons/ButtonRoute.vue";

const API = "https://pokeapi.co/api/v2/";

export default {
  components: {
    Button,
    ButtonRoute
  },

  data() {
    return {
      pokemonID: this.$route.fullPath.replace(`/list/`, ""),
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
      axios
        .get(`${API}` + `pokemon/` + id)
        .then((res) => {
          // console.log(res.data)
          this.pokemonObj.id = this.currentPokemonID = res.data.id;
          this.pokemonObj.name = res.data.species.name;
          this.pokemonObj.imgPath = res.data.sprites.front_default;
          this.pokemonObj.height = res.data.height;
          this.pokemonObj.weight = res.data.weight;
          if (res.data.abilities.length == 2) {
            this.pokemonObj.abilities1 = res.data.abilities[0].ability.name;
            this.pokemonObj.abilities2 = res.data.abilities[1].ability.name;
          } else {
            this.pokemonObj.abilities1 = res.data.abilities[0].ability.name;
            this.pokemonObj.abilities2 = "---";
          }
          if (res.data.types.length == 2) {
            this.pokemonObj.pokeType1 = res.data.types[0].type.name;
            this.pokemonObj.pokeType2 = res.data.types[1].type.name;
          } else {
            this.pokemonObj.pokeType1 = res.data.types[0].type.name;
            this.pokemonObj.pokeType2 = undefined;
          }
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`${API}` + `pokemon-species/` + id)
        .then((res) => {
          // console.log(res.data)
          this.pokemonObj.description =
            res.data.flavor_text_entries[1].flavor_text;
          this.pokemonObj.generation = res.data.generation.name;
          axios
            .get(`${API}` + `generation/` + this.pokemonObj.generation)
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
      let nextPokemonName;
      this.currentPokemonID++;
      axios
        .get(`${API}` + `pokemon/` + this.currentPokemonID)
        .then((res) => {
          nextPokemonName = res.data.species.name;
          this.$router.push("/list/" + nextPokemonName);
          this.getPokemon(nextPokemonName);
        })
        .catch((err) => {
          console.log(err);
        });
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
      } else {
        let previousPokemonName;
        axios
          .get(`${API}` + `pokemon/` + this.currentPokemonID)
          .then((res) => {
            previousPokemonName = res.data.species.name;
            this.$router.push("/list/" + previousPokemonName);
            this.getPokemon(previousPokemonName);
          })
          .catch((err) => {
            console.log(err);
          });
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
@import "@/assets/styles/pokemonTypes.scss";

.wrapper {
  position: relative;
  text-align: center;
  box-sizing: border-box;
  min-height: 100vh;
  padding-bottom: 15px;
  margin: 0 10%;
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
  display: grid;
  grid-template-columns: 50% 50%;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 3px black;
  border-radius: 3px;

  &__img {
    margin: 10px;
      
    img {
      box-shadow: 0 0 7px black;
      border-radius: 3px;
      background: rgb(250, 250, 250);
      width: 100%;
      height: auto;
      transition: 0.3s;
    }
  }

  &__content {
    text-align: left;
    font-family: "Raleway", Arial, sans-serif;
    font-weight: bold;
    margin: 10px;
    font-size: 1.1rem;
    line-height: 1.4rem;

    .header-text {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;

      &--title {
        display: inherit;
        font-size: 2rem;
        font-weight: bold;
        letter-spacing: 1px;
        color: rgb(45, 45, 45);
      }

      &--id {
        margin: -15px 10px 0 0;
        font-size: 1.4rem;
        color: rgb(65, 65, 65);
      }
    }

    .header-types {
      display: flex;
      justify-content: center;
      margin: 20px 0;

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

    .body--desc {
      margin: 0 0 15px;
      padding: 5px 8px;
      color: rgb(25, 25, 25);
      text-align: left;
      text-indent: 10px;
      background: rgba(255, 255, 255, 0.7);
      box-shadow: 0 0 2px black;
      border-radius: 3px;
    }

    .body__stats {
      letter-spacing: 1px;
      margin: 10px 3px;

      p {
        margin: 8px 0;
        font-size: 1.1rem;
        color: rgb(65, 65, 65);

        span {
          color: black;
        }
      }
    }
  }
}

@media screen and (max-width: 730px) {
  .wrapper {
    margin: 0 5%;
  }
  
  .title {
    font-size: 2rem;
  }

  .pokemonDetails-box {
    display: block;
    padding-bottom: 10px;
    
    &__img {    
      img {
        margin-top: 10px;
      }
    }
  }
}
</style>
