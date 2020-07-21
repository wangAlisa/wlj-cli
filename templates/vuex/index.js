import Vue from 'vue';
import Vuex from 'vuex';
import Module from './modules/module'

Vue.use(Vuex);
const store = new Vuex.Store({ // 注意这里的Store的s要大写，不然会报错
    modules: {
        Module
    }
});

export default store;