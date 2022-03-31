<template>
  <router-link :to="target" class="router-link">
    <font-awesome-icon :icon="appLeftIcon" class="fa-icon fa-icon--left" />
    <span> {{ text }} </span>
    <font-awesome-icon :icon="appRightIcon" class="fa-icon" />
  </router-link>
</template>

<script>
export default {
  props: ["target", "iconLeft", "iconRight", "text"],

  computed: {
    appLeftIcon() {
      return this.iconLeft;
    },

    appRightIcon() {
      return this.iconRight;
    },
  },
};
</script>

<style lang="scss" scoped>
.router-link {  
  font-family: "Raleway", Arial, sans-serif;
  font-weight: bold;
  font-size: 1.1rem;
  color: rgb(190, 190, 190);
  letter-spacing: 2px;
  text-decoration: none;

  &:hover {
    color: rgb(255, 132, 0);
  }

  &:hover .fa-icon {
    opacity: 1;
    transition: opacity 0.25s linear;
  }
}

.fa-icon {
  opacity: 0;
  margin: -1px 0 0 3px;

  &--left {
    margin: -1px 4px 0 0;
  }
}
</style>
