import Vue from 'vue'
import vuex from 'vuex'
import {beNamespace} from "../js/beNamespace";

Vue.use(vuex)

import blocks from './blocks'
import misc from './misc'
import transactions from './transactions'
import transfer from './transfer'
import address from './address'

let modules = {}
modules[beNamespace.BLOCKS] = blocks
modules[beNamespace.MISC] = misc
modules[beNamespace.TRANSACTIONS] = transactions
modules[beNamespace.TRANSFER] = transfer
modules[beNamespace.ADDRESS] = address

export default new vuex.Store({
    modules: modules
})