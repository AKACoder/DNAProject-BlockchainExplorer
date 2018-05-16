import serverApi from '../js/utils/serverApi'
import {beEvents} from "../js/beEvents";
// import {bus} from 'be-eventbus'

export default {
    namespaced: true,
    state: {
        height: 0,
        txCount: 0,

        listHeight: 0,
        list: {data: []},

        inited: false,
        refreshTimerBaseCount: 0,

        forceUpdate: false
    },
    mutations: {
        refreshBlocks(state, newBlockList) {
            if(!state.inited) {
                state.inited = true
            }

            let maxHeight = newBlockList[0]["Height"]
            if(maxHeight <= state.listHeight && !state.forceUpdate) {
                return
            }

            state.forceUpdate = false

            state.refreshTimerBaseCount = 0
            state.listHeight = maxHeight
            state.list = {data: newBlockList}
        },
    },
    actions: {
        getBlockForPage(ctx, val) {
            let targetPage = val.page
            let blockHeight = val.height
            let blockPerPage = this.state.misc.rowCountPerRequest
            let eventFactory = val.eventFactory
            let component = val.component

            let targetHeight = blockHeight - ((targetPage - 1) * blockPerPage)
            if (targetHeight <= 0) {
                targetHeight = blockPerPage
            }

            serverApi.getBlockListForHeight(targetHeight, function (data) {
                ctx.state.forceUpdate = true
                ctx.commit("refreshBlocks", data)
                let successEvent = eventFactory.newEvent(beEvents.GET_PAGE_SUCCESS)
                component.$BEEventBus.bus.post(successEvent)

            }, function (data) {
                let errorEvent = eventFactory.newEvent(beEvents.GET_PAGE_FAILED, data)
                component.$BEEventBus.bus.post(errorEvent)
            })
        }
    }
}



