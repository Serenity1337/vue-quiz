<template>
<div id="app">
<template v-if="!isPlaying && !isLoser">
  <h1 class = "ca-logo">ca trivia</h1>
<StartGameButton @click = "startPlaying"> lets play </StartGameButton>

</template>

<TriviaCard v-if="isPlaying && !isLoser">
<template v-if=" !isRequesting && this.currentQuestion">
{{ currentQuestion.correct_answer}}
  <h1 class = "points-amount">You currently have {{ points }} points</h1>
    <Timer class="timer"
     :isLoser="isLoser"
     @clicked="onClickChild"
    >
    </Timer>
       <circular-count-down-timer
            :initial-value="10"
            :size="80"
            :show-hour="false"
            :show-minute="false"
            :show-second="true"
            :padding="4"
            :style="center"
>
</circular-count-down-timer>
    <h2 class="category">{{ this.currentQuestion.category }}</h2>
    <h1 class="question">{{ this.currentQuestion.question }}</h1>
    <ul>

        <li
        v-for = "answer in currentAnswers"
        :key = "answer"
        >
          <button
          @click = "nextQuestion(answer)"
          class = "answers"
          >
            {{ answer }}

          </button>
        </li>

    </ul>
</template>

</TriviaCard>

<div v-if="isLoser">
  <h1 class = "ca-logo end-logo">ca trivia</h1>
  <h1 class = "end-screen"> Congratulations you have scored {{ points }} points</h1>
  <StartGameButton
  @click = "startPlaying"
  >
  next game

  </StartGameButton>
</div>

</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import StartGameButton from '@/components/StartGameButton'
import TriviaCard from '@/components/TriviaCard'
import Timer from '@/components/Timer'

export default {
  name: 'App',
  components: {
    StartGameButton,
    Timer,
    TriviaCard
  },
  data () {
    return {
      center: {
        'text-align': 'center'

      }
    }
  },
  computed: {
    ...mapGetters({
      currentIndex: 'currentIndex',
      isRequesting: 'isRequesting',
      questions: 'questions',
      points: 'points',
      isPlaying: 'isPlaying',
      isLoser: 'isLoser',
      currentQuestion: 'currentQuestion',
      currentAnswers: 'currentAnswers'

    })
  },
  created () {
    this.fetchQuestions()
  },
  methods: {
    ...mapActions({
      fetchQuestions: 'fetchQuestions',
      startPlaying: 'startPlaying',
      increment: 'increment'
    }),
    ...mapMutations({
      setQuestions: 'setQuestions',
      setRequesting: 'setRequesting',
      loserState: 'loserState',
      playingState: 'playingState',
      setPoints: 'setPoints'
    }),
    onClickChild (value) {
      this.loserState(value)
    },
    nextQuestion (answer) {
      if (answer === this.currentQuestion.correct_answer) {
        this.increment()
        this.fetchQuestions()
      } else {
        this.loserState(true)
      }
    }
  }
}

</script>
<style>
body {
  background: rgb(136, 13, 231);
  background: linear-gradient(90deg, rgba(136, 13, 231, 1) 0%, rgba(121, 9, 100, 1) 35%, rgba(217, 0, 255, 1) 100%);
}

.category {
  color: #b0babf;
  text-align: center;
  font-size: 14px;
}

.question {
  text-align: center;
  font-size: 20px;
}

li {
  list-style: none;
  margin: 0 auto;
}

.answers {
  border: 1px solid #b0babf;
  background-color: white;
  width: 220px;
  border-radius: 15px;
  height: 40px;
  margin: 10px auto 0 auto;
  cursor: pointer;
}

.ca-logo {
  text-align: center;
  text-transform: uppercase;
  padding: 200px 0 200px 0;
  color: #fff;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #0ff, 0 0 30px #0ff, 0 0 40px #0ff, 0 0 55px #0ff, 0 0 75px #0ff;
}

.end-logo {
  padding: 200px 0 100px 0;
}

.points-amount {
  padding: 15px 5px 0 5px;
  font-size: 24px;
}

.end-screen {
  margin: 0;
  padding: 0 0 50px 0;
  font-size: 26px;
  text-align: center;
}
</style>
