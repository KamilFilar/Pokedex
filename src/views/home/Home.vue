<template>
  <div class="home">
    <p class="title">pokedex online</p>
    <form>
        <p class="form__title">What's your favorite pokemon: </p>
        <input type="text" placeholder="name..." />
        <button> Szukaj </button>
        <a>Or check list of pokemons</a>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
.home {
    position: relative;
    text-align: center;
    height: 100vh;
}

.title {
  font-family: "Bungee", Arial, sans-serif;
  font-size: 4rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: white;
  padding: 0 7px;
  margin: 0;
  transition-duration: .3s;
}

form {
  border: 1px solid blue;  
}

.form__title {
    font-family: "Cambria";
    color: white;
    font-size: 1.6rem;
}

@media screen and (max-width: 660px) {
    .title {
        font-size: 1.9rem;
    }
}
</style>