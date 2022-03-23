<template>
  <div class="app">
    <router-view />
  </div>
</template>

<style>
@font-face {
  font-family: "Bungee";
  src:
    local("Bungee"), 
    url('./assets/fonts/Bungee-Regular.ttf') format("truetype");
}

/* Global background */
#app {
  background-image: url('./assets/images/background.png');
  background-repeat: no-repeat;
  background-position: 40%;
  background-size: cover;
  height: 100vh;
}
</style>
