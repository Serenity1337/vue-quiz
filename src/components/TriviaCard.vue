<template>
  <div class="trivia-card">
<slot />
  </div>
</template>

<script>
export default {
  name: 'TriviaCard',
  data () {
    return {

    }
  }

}
</script>
<style lang = "scss" scoped>
.trivia-card {
  background-color: #fff;
  color: #000;
  margin: 20px auto 0 auto;
  width: auto;
  height: 480px;
  border-radius: 15px;
  padding-bottom: 30px;
  -webkit-box-shadow: 0 3px 63px 0 rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0 3px 63px 0 rgba(0, 0, 0, 0.75);
  box-shadow: 0 3px 63px 0 rgba(0, 0, 0, 0.75);
}
</style>
