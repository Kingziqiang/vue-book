/*
 * @Author: Lexuec
 * @Date:   2018/8/9 17:50
 * @Last Modified by:   Lexuec
 * @Last Modified time: 2018/8/9 17:50
 */
"use strict";
import Vue from 'vue';
import Vuex from 'vuex';
import logger from 'vuex/dist/logger';
import getters from '../store/getters';
const state = {bookList:[],count:{}};
Vue.use(Vuex);
Vue.use(logger);
import mutations from '../store/mutation';
export default new Vuex.Store({
  strict:true,
  plugins:[logger()],
  state,
  mutations,
  getters


})

