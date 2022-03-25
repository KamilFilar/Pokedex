<template>
  <div class="home">
    <p class="title">
      pokedex
      <span class="title--color"> 
        online
      </span>
    </p>
    <div class="home__form">
      <p class="home__form--title">
        Search pokemon:
      </p>
      <form @submit.prevent>
        <input
          type="text"
          placeholder="Pokemon name..."
          class="form__input"
          v-model="searchValue"
          @keyup.enter="searchPokemon"
        />
        <button class="form__btn" @click="searchPokemon">
          <font-awesome-icon icon="magnifying-glass" class="fa-search-icon" />
        </button>
      </form>
      <router-link :to="'/list'" class="home__form--href">
        <font-awesome-icon icon="angles-right" class="fa-icon fa-icon--left" />
        <span> Or check list of all pokemons </span>
        <font-awesome-icon icon="angles-right" class="fa-icon" />
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const API = "https://pokeapi.co/api/v2/pokemon";

export default {
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    searchPokemon() {
      axios
        .get(`${API}/${this.searchValue}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
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

.home__form {
  position: absolute;
  bottom: 85px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  transition-duration: 0.3s;

  &--href,
  &--title {
    font-family: "Raleway", Arial, sans-serif;
  }

  &--title {
    color: white;
    margin: 0 0 7px 0;
    font-size: 1.35rem;
    font-weight: bold;
    letter-spacing: 2.5px;
    cursor: context-menu;
  }

  &--href {
    width: 280px;
    color: rgb(190, 190, 190);
    padding: 5px 0;
    margin: 15px auto;
    font-size: 0.9rem;
    letter-spacing: 1px;
    text-decoration: none;
    transition: 0.5s;

    &:hover {
      color: rgb(210, 110, 0);
    }

    &:hover .fa-icon {
      opacity: 1;
      transition: opacity 0.25s linear;
    }
  }

  form {
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .form__input {
      width: 300px;
      height: auto;
      padding: 10px 0px 5px 5px;
      background: rgba(0, 0, 0, 0.5);
      border-top: none;
      border-left: none;
      border-right: none;
      border-bottom: 1px solid rgb(210, 110, 0);
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      font-size: 1.15rem;
      color: white;
      transition: 0.3s;

      &:focus {
        outline: none;
        border-bottom: 1px solid rgb(255, 160, 60);
      }

      &:hover {
        border-bottom: 1px solid rgb(255, 160, 60);
      }
    }

    .form__btn {
      padding: 0;
      margin: 10px 0 0 10px;
      background: none;
      border: none;
      outline: none;
      font-size: 1.9rem;
    }
  }
}

.fa-icon {
  opacity: 0;
  margin: -1px 0 0 3px;

  &--left {
    margin: -1px 4px 0 0;
  }
}

.fa-search-icon {
  color: rgb(210, 110, 0);
  transition: color, 1s;

  &:hover {
    color: rgb(255, 160, 60);
    cursor: pointer;
  }
}

@media screen and (max-width: 660px) {
  .title {
    font-size: 2rem;
    padding-top: 35px;
  }

  .home__form {
    bottom: 30px;
  }

  form {
    .form__input {
      width: 250px !important;
    }
  }
}
</style>
