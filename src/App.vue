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

/* Sweet alert style */
.sweet-alert-button-wrong {
  background: none;
  border: 1px solid rgb(220, 0, 0);
  border-radius: 5px;
  outline: none;
  color: rgb(220, 0, 0);
  padding: 3px 5px;
  font-family: "Raleway", Arial, sans-serif;
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: 2px;
  transition: 0.3s;
}

.sweet-alert-button-wrong:hover {
  border: 1px solid red;
  color: red;
}

.sweet-alert-popup-wrong {
  color: white !important;
  background: rgba(0, 0, 0, 0.9) !important;
  box-shadow: 0 0 5px rgb(220, 0, 0);
}

.swal2-html-container {
  text-align: left !important;
  text-indent: 10px;
}

</style>
