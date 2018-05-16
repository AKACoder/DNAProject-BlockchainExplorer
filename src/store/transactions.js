import serverApi from '../js/utils/serverApi'
import {beEvents} from "../js/beEvents";


const txTypeNames = [
    {name: "记账", val:0x00 },
    {name: "资产发行", val:0x01 },
    {name: "添加记账人", val:0x02 },
    {name: "私有交易", val:0x20 },
    {name: "资产注册", val:0x40 },
    {name: "资产转账", val:0x80 },
    {name: "存证", val:0x81 },
    {name: "部署合约", val:0xd0 },
    {name: "执行合约", val:0xd1 },
    {name: "数据存储", val:0x12 },
]

export default {
    namespaced: true,
    state: {
        list: {data: []},
        inited: false,

    },
    mutations: {
        refreshTransactionsList(state, newList) {
            if(!state.inited) {
                state.inited = true
            }

            for (let i = 0; i < newList.length; i++) {
                newList[i]["txTypeName"] = "未知交易"

                for (let j = 0; j < txTypeNames.length; j++) {
                    if(newList[i].TxType === txTypeNames[j].val) {
                        newList[i]["TxTypeName"] = txTypeNames[j].name
                        break
                    }
                }
            }

            state.list = {data: newList}
        },
    },
    actions: {
        getTransactionForPage(ctx, val) {
            let page = val.page || "0"
            let eventFactory = val.eventFactory
            let component = val.component

            serverApi.getTransactionsList(page, function (data) {
                ctx.commit("refreshTransactionsList", data)
                let successEvent = eventFactory.newEvent(beEvents.GET_PAGE_SUCCESS)
                component.$BEEventBus.bus.post(successEvent)

            }, function (data) {
                let errorEvent = eventFactory.newEvent(beEvents.GET_PAGE_FAILED, data)
                component.$BEEventBus.bus.post(errorEvent)
            })
        }
    }
}



