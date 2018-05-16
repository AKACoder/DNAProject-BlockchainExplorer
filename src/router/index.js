import Vue from 'vue'
import Router from 'vue-router'

import {Routers} from "../js/utils/routers";


Vue.use(Router)

export default new Router({
    mode: "hash",
    routes:Routers
})
