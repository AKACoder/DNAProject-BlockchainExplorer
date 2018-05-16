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
        refreshTransferList(state, newList) {
            if(!state.inited) {
                state.inited = true
            }

            if(!newList) {
                state.list = {data: []}
                return
            }

            let aTransfer = newList[0]
            let assetName = aTransfer.AssetId
            let named = false
            for(let i = 0; i < this.state.misc.assetsList.length; i++) {
                if (assetName === this.state.misc.assetsList[i].Hash) {
                    assetName = this.state.misc.assetsList[i].Name
                    named = true
                    break
                }
            }

            if(named) {
              for(let i = 0; i < newList.length; i++) {
                  newList[i].AssetId = assetName
              }
            }

            state.list = {data: newList}
        },
    },
    actions: {
        getTransferForPage(ctx, val) {
            let page = val.page || "0"
            let eventFactory = val.eventFactory
            let component = val.component

            serverApi.getTransferList(page, function (data) {
                ctx.commit("refreshTransferList", data)
                let successEvent = eventFactory.newEvent(beEvents.GET_PAGE_SUCCESS)
                component.$BEEventBus.bus.post(successEvent)
            }, function (data) {
                let errorEvent = eventFactory.newEvent(beEvents.GET_PAGE_FAILED, data)
                component.$BEEventBus.bus.post(errorEvent)
            })
        },
        updateTransferAssetName(ctx) {
            if(!ctx.list.data) {
                return
            }

            ctx.commit("refreshTransferList", ctx.list.data)
        }
    }
}



