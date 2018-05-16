<template>
    <be-table v-bind:misc-info="tableMiscInfo"
              v-bind:columns="tableColumns"
              v-bind:table-data="this.$store.state.transfer.list"
              v-bind:loaded="tableLoaded"
              v-bind:data-loading="dataLoading"
              v-bind:last-page="tableLastPage"
              v-bind:event-factory="eventFactory"
              v-bind:enable-paginate="enablePaginate"
              v-bind:be-namespace="this.beNamespace"/>
</template>

<script>
    import beTable from '../components/sampleTable/beTable'
    import {beEvents} from "../js/beEvents";
    import {beNamespace} from "../js/beNamespace";

    const tableMiscInfo = {
        title: "资产转账",
        noAutoRefresh: true,
        data: [
            {title: "说明", joiner: ": ", value: "UTXO清算结果"},
            {title: "", joiner: "", value: "共 . 页"},
        ]
    }

    const tableColumns = [
        {"name": "高度", "width": 10, "key": "Height"},
        {"name": "资产", "width": 10, "key": "AssetId"},
        {"name": "转出地址", "width": 30, "key": "FromAddr"},
        {"name": "转入地址", "width": 30, "key": "ToAddr"},
        {"name": "数量", "width": 20, "key": "Value"},
    ]

    export default {
        components: {beTable},
        name: beNamespace.TRANSFER,
        methods: {

        },
        mounted: function () {
            this.$nextTick(function () {
                //start only get data once.
                if (this.tableLoaded) {
                    this.$BEEventBus.bus.post(
                        this.eventFactory.newEvent(beEvents.ENABLE_PAGINATE)
                    )
                    return
                }
                this.$store.dispatch(this.beNamespace + "/getTransferForPage",
                    {
                        component:this,
                        eventFactory: this.eventFactory
                    },
                    this, this.beNamespace)

                this.$BEEventBus.bus.registerEventHandler(
                    beEvents.TABLE_PAGE_CHANGED,
                    function (targetPage) {
                        this.dataLoading = true
                        this.$store.dispatch(this.beNamespace + "/getTransferForPage",
                            {
                                component:this,
                                page:targetPage - 1,
                                eventFactory: this.eventFactory
                            })
                    },
                    this,
                    this.beNamespace
                )

                this.$BEEventBus.bus.registerEventHandler(
                    beEvents.GET_PAGE_SUCCESS,
                    function () {
                        this.dataLoading = false
                        this.$BEEventBus.bus.post(
                            this.eventFactory.newEvent(beEvents.ENABLE_PAGINATE)
                        )
                    },
                    this,
                    this.beNamespace
                )

                this.$BEEventBus.bus.registerEventHandler(
                    beEvents.GET_PAGE_FAILED,
                    function (data) {
                        //todo: show alert message
                    },
                    this,
                    this.beNamespace
                )
            })
        },

        computed: {
            tableLoaded() {
                if(this.$store.state.transfer.inited) {
                    this.enablePaginate = true
                }
                return this.$store.state.transfer.inited
            },
            tableLastPage() {
                let lastPage = Math.ceil(this.$store.state.misc.transferCoount / this.$store.state.misc.rowCountPerRequest)
                tableMiscInfo.data[1].value = "共 " + lastPage + " 页"
                return lastPage
            }
        },

        data: function () {
            return {
                beNamespace: beNamespace.TRANSFER,
                tableMiscInfo: tableMiscInfo,
                tableColumns: tableColumns,
                dataLoading: false,
                enablePaginate: false,
                eventFactory: new beEvents.factory(beNamespace.TRANSFER, this.$BEEventBus.eventType.UNICAST)
            }
        },
    }
</script>

<style scoped>

</style>