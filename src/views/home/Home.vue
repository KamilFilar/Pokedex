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
          placeholder="Pokemon name or id..."
          class="form__input"
          v-model="searchValue"
          @keyup.enter="searchPokemon"
        />
        <button class="form__btn" @click="searchPokemon">
          <font-awesome-icon icon="magnifying-glass" class="fa-search-icon" />
        </button>
      </form>
      <ButtonRoute 
        :target="'/list'" 
        :text="'Return to list'"
        :iconLeft="'angles-right'"
        :iconRight="'angles-right'"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ButtonRoute from "@/components/buttons/ButtonRoute.vue";

const API = "https://pokeapi.co/api/v2/pokemon";

export default {
  components: {
    ButtonRoute
  },

  data() {
    return {
      searchValue: "",
    };
  },

  methods: {
    searchPokemon() {
      axios.get(`${API}/${this.searchValue}`)
        .then((res) => {
          this.$router.push('/list/'+res.data.species.name);
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            customClass: {
              confirmButton: 'sweet-alert-button-wrong',
              popup: "sweet-alert-popup-wrong",
              text: "sweet-alert-title"
            },
            text: 'Pokemon not found! Please enter a valid name or ID. 😥',
            buttonsStyling: false,
            icon: 'error',
            iconColor: 'rgb(220, 0, 0)',
            confirmButtonText: 'Close'
          });
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
  min-height: 100vh;
  height: 100%;
}

.title {
  margin: 0;
  font-family: "Bungee", Arial, sans-serif;
  font-size: 4rem;
  font-weight: bold;
  letter-spacing: 3px;
  color: white;
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
    margin: 0 0 7px;
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
    margin: 0 0 15px;
    padding: 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .form__input {
      width: 300px;
      height: 28px;
      padding: 10px 0px 2px 5px;
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
