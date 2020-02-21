import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/packages/axios'
import shuffle from 'lodash.shuffle'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  state: () => ({
    currentIndex: 0,
    isRequesting: false,
    questions: [],
    points: 0,
    isPlaying: false,
    isLoser: false,
    answerTime: 10,
    index: 0
  }),
  getters: {
    currentIndex: state => state.currentIndex,
    isRequesting: state => state.isRequesting,
    questions: state => state.questions,
    points: state => state.points,
    isPlaying: state => state.isPlaying,
    isLoser: state => state.isLoser,
    answerTime: state => state.answerTime,

    currentQuestion: (state, getters) => {
      if (state.questions.length > 0) {
        return state.questions[0]
      }
      return null
    },
    currentAnswers: (state, getters) => {
      if (getters.currentQuestion) {
        const answers = [...state.questions[0].incorrect_answers, state.questions[0].correct_answer]
        return shuffle(answers)
      }
      return []
    }
  },

  mutations: {
    setQuestions (state, payload) {
      state.questions = payload
    },
    setRequesting (state, payload) {
      state.isRequesting = payload
    },
    loserState (state, payload) {
      state.isLoser = payload
    },
    playingState (state, payload) {
      state.isPlaying = payload
    },
    setPoints (state, payload) {
      state.points = payload
    },
    setTimer (state, payload) {
      state.answerTime = payload
    }
  },
  actions: {
    async fetchQuestions ({ commit }) {
      commit('setRequesting', true)
      try {
        const { data } = await axios.get('/api.php?amount=1')
        commit('setQuestions', data.results)
        commit('setRequesting', false)
        console.log(this.state.isRequesting)
      } catch (error) {
        commit('setRequesting', false)
      }
    },
    increment ({ commit }) {
      const skaicius = this.state.points + 1
      commit('setPoints', skaicius)
    },
    startPlaying ({ commit }) {
      commit('playingState', true)
      commit('loserState', false)
      commit('setPoints', 0)
      commit('setRequesting', false)
    }
  }
})
