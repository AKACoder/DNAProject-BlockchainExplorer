// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)


import { LayoutHelper } from './js/utils/layout'

import BETasks from './js/utils/tasks';
Vue.use(BETasks)

// import {busForVue} from "./js/utils/eventBus";
// Vue.use(busForVue)

import {busForVue} from "be-eventbus";
Vue.use(busForVue)


import 'animate.css'
import {jQueryExtends} from './js/utils/jqueryExtends'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    mounted() {
        jQueryExtends.registerExtends()
        LayoutHelper.OrientationChangePageLayout()
        this.$BETasks.miscUpdate.start().resume()
    }
})
