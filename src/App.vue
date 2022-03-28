<template>
  <div class="app">
    <router-view />
  </div>
</template>

<style>
/* Global background */
#app {
  background-image: url('./assets/images/background.png');
  background-repeat: no-repeat;
  background-position: 40%;
  background-size: cover;
}

@font-face {
  font-family: "Bungee";
  src:
    local("Bungee"), 
    url('./assets/fonts/Bungee-Regular.ttf') format("truetype");
}

@font-face {
  font-family: "Raleway-Italic";
  src:
    local("Raleway-Italic"), 
    url('./assets/fonts/Raleway-Italic.ttf') format("truetype");
}

@font-face {
  font-family: "Raleway";
  src:
    local("RedHatMono"), 
    url('./assets/fonts/Raleway.ttf') format("truetype");
}


</style>
