<template>
    <be-table v-bind:misc-info="tableMiscInfo"
              v-bind:columns="tableColumns"
              v-bind:table-data="this.$store.state.transactions.list"
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
        title: "交易列表列表",
        noAutoRefresh: true,
        data: [
            {title: "说明", joiner: ": ", value: "已忽略记账交易"},
            {title: "", joiner: "", value: "共 . 页"},
        ]
    }

    const tableColumns = [
        {"name": "高度", "width": 10, "key": "Height"},
        {"name": "类型", "width": 20, "key": "TxTypeName"},
        {"name": "时间", "width": 20, "key": "Timestamp"},
        {"name": "哈希", "width": 50, "key": "Hash"},
    ]

    export default {
        components: {beTable},
        name: beNamespace.TRANSACTIONS,
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
                this.$store.dispatch(this.beNamespace + "/getTransactionForPage",
                    {
                        component:this,
                        eventFactory: this.eventFactory
                    },
                    this, this.beNamespace)

                this.$BEEventBus.bus.registerEventHandler(
                    beEvents.TABLE_PAGE_CHANGED,
                    function (targetPage) {
                        this.dataLoading = true
                        this.$store.dispatch(this.beNamespace + "/getTransactionForPage",
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
                if(this.$store.state.transactions.inited) {
                    this.enablePaginate = true
                }
                return this.$store.state.transactions.inited
            },
            tableLastPage() {
                let lastPage = Math.ceil(this.$store.state.misc.txCount / this.$store.state.misc.rowCountPerRequest)
                tableMiscInfo.data[1].value = "共 " + lastPage + " 页"
                return lastPage
            }
        },

        data: function () {
            return {
                beNamespace: beNamespace.TRANSACTIONS,
                tableMiscInfo: tableMiscInfo,
                tableColumns: tableColumns,
                dataLoading: false,
                enablePaginate: false,
                eventFactory: new beEvents.factory(beNamespace.TRANSACTIONS, this.$BEEventBus.eventType.UNICAST)
            }
        },
    }
</script>

<style scoped>

</style>