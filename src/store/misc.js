export default {
    namespaced: true,
    state: {
        blockHeight: 0,
        txCount: 0,
        transferCoount: 0,
        assetCount: 0,
        addrCount: 0,
        rowCountPerRequest: 15,
        assetsList: []
    },

    mutations: {
        updateMisc(state, miscInfo) {
            state.blockHeight = parseInt(miscInfo.block_height)
            state.txCount = parseInt(miscInfo.transaction_count)
            state.transferCoount = parseInt(miscInfo.transfer_count)
            state.assetCount = parseInt(miscInfo.asset_count)
            state.addrCount = parseInt(miscInfo.addr_count)
            state.rowCountPerRequest = parseInt(miscInfo.row_count_per_request)

            if(miscInfo.assets_list.length !== state.assetsList.length) {
                this.commit("transfer/updateTransferAssetName")
                state.assetsList = miscInfo.assets_list
            }
        }
    }
}