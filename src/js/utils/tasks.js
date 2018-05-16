import store from '../../store/store';
import serverApi from './serverApi'

let beTask = function (api, paramGetter, interval, success, failed) {
    let timer = null
    let paused = true

    function callApi() {
        if(paramGetter instanceof Function) {
            api(paramGetter(),success, failed)
        } else {
            api(null,success, failed)
        }
    }

    return {
        isRunning: function () {
            return null !== timer
        },

        resume: function () {
            paused = false
            return this
        },

        pause: function () {
            paused = true
            return this
        },

        start: function () {
            if(this.isRunning()) {
                return
            }

            //get data at least once
            callApi()
            timer = setInterval(function() {
                if (paused) {
                    return
                }
                callApi()
            }, interval)

            return this
        }
    }
}

const BETasks = {
    blocksUpdate: new beTask(serverApi.getBlockListForHeight,
        function () {
            return 0
        },
        1000, function (data) {
        store.commit('blocks/refreshBlocks', data)
    }),
    miscUpdate:  new beTask(serverApi.getMiscInfo, null, 3000, function (data) {
        store.commit('misc/updateMisc', data)
    }),
}

export default {
    install: function (Vue, options) {
        Vue.prototype.$BETasks = BETasks
    }
};