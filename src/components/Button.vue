<template>
  <button>
    <span>{{ btnName }}</span>
    <font-awesome-icon :icon="appIcon" class="icon" />
  </button>
</template>

<script>
export default {
  props: ["btnName", "btnIcon"],

  computed: {
    appIcon() {
      return this.btnIcon;
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  padding: 8px 15px;
  border-top: 1px solid rgb(255, 132, 0);
  border-left: none;
  border-right: none;
  border-bottom: 1px solid rgb(255, 132, 0);
  background: none;
  outline: none;
  transition: .3s;

  span {
    font-family: "Raleway", Arial, sans-serif;  
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 2px;
    color: white;
    transition: .3s;
  }

  .icon {
    margin-left: 5px;
    color: rgb(255, 132, 0);
    font-size: 1.2rem;
    transition: .3s;
  }

  &:hover {
    cursor: pointer;  
    padding: 8px 20px;
    span {
        letter-spacing: 3px;
    }
  }
}
</style>
