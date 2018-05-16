import serverApi from '../js/utils/serverApi'
import {beEvents} from "../js/beEvents";

export default {
    namespaced: true,
    state: {
        list: {data: []},
        inited: false,
        assetsNamed: false

    },
    mutations: {
        refreshAddressList(state, newList) {
            if(!state.inited) {
                state.inited = true
            }

            if(!newList) {
                state.list = {data: []}
                return
            }

            state.list = {data: newList}
        },
    },
    actions: {
        getAddressForPage(ctx, val) {
            let page = val.page || "0"
            let eventFactory = val.eventFactory
            let component = val.component

            serverApi.getAddressList(page, function (data) {
                ctx.commit("refreshAddressList", data)
                let successEvent = eventFactory.newEvent(beEvents.GET_PAGE_SUCCESS)
                component.$BEEventBus.bus.post(successEvent)
            }, function (data) {
                let errorEvent = eventFactory.newEvent(beEvents.GET_PAGE_FAILED, data)
                component.$BEEventBus.bus.post(errorEvent)
            })
        }
    }
}



