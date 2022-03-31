<template>
  <button>
    <font-awesome-icon :icon="appIcon" class="icon icon--left" v-if="isPrevious"/>
    <span>{{ btnName }}</span>
    <font-awesome-icon :icon="appIcon" class="icon icon--right" v-if="isNext"/>
    <font-awesome-icon :icon="appIcon" class="icon icon--right" v-if="isReturn"/>
  </button>
</template>

<script>
export default {
  props: ["btnName", "btnIcon"],

  data() {
    return {
      isReturn: false,
      isNext: false,
      isPrevious: false
    }
  },

  computed: {
    appIcon() {
      return this.btnIcon
    }
  },

  methods: {
    checkIcons() {
      if (this.btnIcon == 'arrow-right-to-bracket') this.isReturn = true;
      if (this.btnIcon == 'arrow-right') this.isNext = true;
      if (this.btnIcon == 'arrow-left') this.isPrevious = true;
    },
  },

  mounted() {
    this.checkIcons();
  }
};
</script>

<style lang="scss" scoped>
button {
  min-width: 120px;
  padding: 8px 15px;
  border-top: 1px solid rgb(255, 132, 0);
  border-left: none;
  border-right: none;
  border-bottom: 1px solid rgb(255, 132, 0);
  background: rgba(0, 0, 0, 0.7);
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
    color: rgb(255, 132, 0);
    font-size: 1.2rem;
    transition: .3s;

    &--right {
      margin-left: 5px;
    }

    &--left {
      margin-right: 5px;
    }
  }

  &:hover {
    cursor: pointer; 
    background: black;

    span {
      color: rgb(255, 132, 0);
    }

    .icon {
      color: white;
    }
  }
}
</style>
