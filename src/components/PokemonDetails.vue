<template>
  <div class="pokemonDetails">
    <p class="title">Param: {{ $route.params.name }}</p>
  </div>
</template>

<script>
import axios from "axios";

const API = "https://pokeapi.co/api/v2/";

export default {
//   props: ["pokemonID"],

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
          this.id = res.data.id;
          this.name = res.data.species;
          this.imgPath = res.data.sprites.front_default;  
          this.height = res.data.height;
          this.weight = res.data.weight;
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

      axios.get(`${API}` + `pokemon-species/` + id)
            .then( (res) => {
                this.description = res.data.flavor_text_entries[0].flavor_text;
            })
            .catch( (err) => {
                console.log(err);
            })
    },
  },

  mounted() {
    this.getPokemon(this.pokemonID);
  },
};
</script>

<style lang="scss" scoped>
.pokemonDetails {
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
}
</style>
