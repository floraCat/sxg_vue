import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    type: '', // m | pc
    attr: 1, // 1->单一组件|2->组合组件|3->小部件|4->自定义表单
    frame: 'vue',
    style: 'scss',
    script: 'ES6'
}
const mutations = {
    type (state, opt) { state.type = opt },
    attr (state, opt) { state.attr = opt },
    frame (state, opt) { state.frame = opt },
    style (state, opt) { state.style = opt },
    script (state, opt) { state.script = opt }
}

const store = new Vuex.Store({
    strict: true, // process.env.NODE_ENV !== 'production',
    state: state,
    mutations: mutations
})

export default store
