<template>
  <div class="pokemonDetails">
    <p class="title">
       Param: {{ $route.params.name }}
    </p>
  </div>
</template>

<script></script>

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
