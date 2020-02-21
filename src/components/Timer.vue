<template>
<h1></h1>
</template>

<script>

export default {
  components: {
  },
  props: ['isLoser'],
  data () {
    return {
      answerTime: 10,
      fill: { gradient: ['red', 'green', 'blue'] }
    }
  },
  created: function () {
    this.countDownTimer()
  },
  methods: {
    countDownTimer () {
      if (this.answerTime > 0) {
        setTimeout(() => {
          this.answerTime -= 1
          this.countDownTimer()
        }, 1000)
      } else {
        this.$emit('clicked', 'true')
      }
    },
    progress (event, progress, stepValue) {
      console.log(stepValue)
    },
    progress_end (event) {
      console.log('Circle progress end')
    }
  }

}
</script>
<style lang = "scss" scoped>

.base-timer {
  position: relative;
  height: 40px;
  width: 40px;
}

.base-timer__circle {
  fill: none;
  stroke: none;
}

.base-timer__path-elapsed {
  stroke-width: 7px;
  stroke: grey;
}

.base-timer__label {
  position: absolute;
  width: 40px;
  height: 40px;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.remainingPathColor {
  color: grey;
}

.base-timer__path-remaining {
  stroke-width: 7px;
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  stroke: currentColor;
}

.base-timer__svg {
  transform: scaleX(-1);
}

.timer {
  color: black;
  position: absolute;
  left: 150px;
}
</style>
