<template>
  <div class="wrapper">
    <div class="img-container">
      <img src="./../assets/images/background.jpg" />
    </div>
    <div class="description">
      <p class="description--id">#{{ pokeID }}</p>
      <p class="description--name">{{ pokeName }}</p>
      <p class="description--type-left" :class="pokeType1">{{ pokeType1 }}</p>
      <p class="description--type-right" :class="pokeType2">{{ pokeType2 }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["pokeID", "pokeName", "pokeType1", "pokeType2"],
};
</script>

<style lang="scss" scoped>
.wrapper {
  // to change
  width: 80%;

  background: rgba(245, 245, 245, 0.85);
  margin: 5px auto;
  padding: 7px;
  border-radius: 5px;

  .img-container {
    // border: 1px solid red;
    max-width: 100%;
    max-height: auto;
    margin: 0 auto;

    img {
      width: 100%;
      height: auto;
    }
  }

  .description {
    text-align: left;
    font-family: "Raleway", Arial, sans-serif;
    font-weight: bold;

    &--id {
      margin: 0 0 5px;
      font-size: 1rem;
      color: rgb(65, 65, 65);
    }

    &--name {
      margin: 0;
      // border: 1px solid red;
      padding: 3px;
      color: rgb(25, 25, 25);
      font-size: 1.3rem;
      letter-spacing: 1px;
    }

    &--type-left,
    &--type-right {
      display: inline-block;
      color: white;
      margin-bottom: 0;
      margin: 5px;
      padding: 5px 8px;
      font-size: 0.8rem;
      letter-spacing: 2px;
      border: none;
      outline: none;
    }

    &--type-left {
      margin-left: 3px; // same as &--name padding!
    }
  }
}

// types color classes
.normal {
  background: rgb(105, 105, 105);
}

.fire {
  background: rgb(250, 158, 0);
}

.water {
  background: rgb(0, 88, 219);
}

.ice {
  background: rgb(0, 210, 210);
}

.grass {
  background: rgb(0, 210, 0);
}

.electric {
  background: rgb(223, 189, 0);
}

.fighting {
  background: rgb(192, 0, 0);
}

.poision {
  background: rgb(173, 0, 173);
}

.ground {
  background: rgb(141, 98, 5);
}

.bug {
  background: rgb(0, 160, 0);
}

.flying {
  background: rgb(115, 179, 179);
}

.psychic {
  background: rgb(226, 171, 180);
}

.rock {
  background: rgb(129, 129, 93);
}

.ghost {
  background: rgb(94, 0, 94);
}

.dark {
  background: rgb(32, 32, 32);
}

.dragon {
  background: rgb(255, 113, 113);
}

.steel {
  background: steelblue;
}
</style>
