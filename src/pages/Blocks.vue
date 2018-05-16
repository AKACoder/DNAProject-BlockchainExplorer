<template>
    <be-table v-bind:misc-info="tableMiscInfo"
              v-bind:columns="tableColumns"
              v-bind:table-data="this.$store.state.blocks.list"
              v-bind:loaded="tableLoaded"
              v-bind:data-loading="dataLoading"
              v-bind:last-page="tableLastPage"
              v-bind:event-factory="eventFactory"
              v-bind:enable-paginate="enablePaginate"
              v-bind:be-namespace="this.beNamespace"
              v-bind:refresh-timer-base-count="this.$store.state.blocks.refreshTimerBaseCount"
    @autoRefreshChanged="autoRefreshChanged"/>
</template>

<script>
    import beTable from '../components/sampleTable/beTable'
    import {beEvents} from "../js/beEvents";
    import {beNamespace} from "../js/beNamespace";

    const tableMiscInfo = {
        title: "区块列表",
        noAutoRefresh: false,
        data: [
            {title: "当前高度", joiner: ": ", value: 0},
            {title: "累计交易", joiner: ": ", value: 0},
        ]
    }

    const tableColumns = [
            {"name": "高度", "width": 10, "key": "Height"},
            {"name": "交易", "width": 10, "key": "TxCount"},
            {"name": "体积", "width": 10, "key": "Size"},
            {"name": "时间", "width": 20, "key": "Timestamp"},
            {"name": "哈希", "width": 50, "key": "Hash"},
        ]

    export default {
        components: {beTable},
        name: beNamespace.BLOCKS,
        methods: {
            autoRefreshChanged(data) {
                if(data) {
                    this.$BETasks.blocksUpdate.resume()
                } else {
                    this.$BETasks.blocksUpdate.pause()
                }
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                //start only get data once.
                this.$BEEventBus.bus.post(
                    this.eventFactory.newEvent(beEvents.ENABLE_PAGINATE)
                )

                this.autoRefreshChanged(false)
                if(this.tableLoaded) {
                    return
                }


                this.$BETasks.blocksUpdate.start()

                this.$BEEventBus.bus.registerEventHandler(
                    beEvents.TABLE_PAGE_CHANGED,
                    function (targetPage) {
                        this.dataLoading = true
                        this.$store.dispatch("blocks/getBlockForPage",
                            {
                                component:this,
                                page:targetPage,
                                height:this.blockHeight,
                                eventFactory: this.eventFactory
                            })
                    },
                    this,
                    beNamespace.BLOCKS
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
                    beNamespace.BLOCKS
                )

                this.$BEEventBus.bus.registerEventHandler(
                    beEvents.GET_PAGE_FAILED,
                    function (data) {
                        //todo: show alert message
                    },
                    this,
                    beNamespace.BLOCKS
                )
            })
        },

        computed: {
            blockHeight() {
                return this.$store.state.misc.blockHeight
            },
            tableLoaded() {
                if(this.$store.state.blocks.inited) {
                    this.enablePaginate = true
                }
                return this.$store.state.blocks.inited
            },
            tableLastPage() {
                this.tableMiscInfo.data[1].value = this.$store.state.misc.txCount
                this.tableMiscInfo.data[0].value = this.$store.state.misc.blockHeight
                return Math.ceil(this.$store.state.misc.blockHeight / this.$store.state.misc.rowCountPerRequest)
            }
        },

        data: function () {
            return {
                beNamespace: beNamespace.BLOCKS,
                tableMiscInfo: tableMiscInfo,
                tableColumns: tableColumns,
                dataLoading: false,
                enablePaginate: false,
                eventFactory: new beEvents.factory(beNamespace.BLOCKS, this.$BEEventBus.eventType.UNICAST)
            }
        },
    }
</script>

<style scoped>

</style>