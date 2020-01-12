import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { UPDATE_CURRENT, UPDATE_BOOK } from './mutation-types'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    //レビューと書籍情報
    books: [],
    //現在の書籍
    current: null
  },
  getters: {
    //レビュー数
    bookCount(state) {
      return state.books.length
    },
    //全レビュー
    allBooks(state){
      return state.books 
    },
    //指定したページのレビュー
    getRangeByPage(state){
      return page => {
        const SIZE = 10
        return state.books.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE)
      }
    },
    //指定したidのレビュー
    getBookById(state) {
      return id => {
        return state.books.find(book => book.id === id)
      }
    },
    //現在編集中の書籍
    current(state){
      return state.current
    }
  },
  mutations: {
    //編集中の書籍(current)を更新
    [UPDATE_CURRENT](state, payload){
      state.current = payload
    },
    //レビューを更新
    [UPDATE_BOOK](state, payload){
      //id値で既存レビューを検索
      let b = this.getters.getBookById(payload.id)
      if(b){
        //既存レビューがあれば、更新情報(payload)で上書き
        Object.assign(b, payload)
      } else {
        //既存レビューがなければ、新規でstate.booksに追加
        state.books.push(payload)
      }
    }
  },
  //mutationsに対応する同名のactions(実質、空のアクション)
  actions: {
    [UPDATE_CURRENT]({ commit }, payload){
      commit(UPDATE_CURRENT, payload)
    },
    [UPDATE_BOOK]({ commit }, payload){
      commit(UPDATE_BOOK, payload)
    }
  }, 
  //ストレージ保存のプラグイン(vuex-persistedstate)を有効化
  plugins: [createPersistedState({
    key: 'reading-recorder',
    storage: localStorage
  })]
})
