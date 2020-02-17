<template>
  <button
  class = "start-game-button"
  @click="onClick"
  >
  <slot />
  </button>

</template>

<script>
export default {
  name: 'StartGameButton',
  methods: {
    onClick (event) {
      this.$emit('click', event)
    }
  }

}
</script>

<style lang = "scss" scoped>

.start-game-button {
  color: black;
  border-radius: 15px;
  box-shadow: none;
  outline: 0;
  background-color: white;
  border: 0;
  width: 180px;
  height: 40px;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0 0 0 60px;
  text-align: center;
  padding: 0 auto;
  cursor: pointer;
  letter-spacing: 2px;
}
</style>
