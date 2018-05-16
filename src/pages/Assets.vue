<template>
    <be-table id="be-assets-list-table" v-bind:misc-info="tableMiscInfo"
              v-bind:columns="tableColumns"
              v-bind:table-data="assetsList"
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
        title: "资产列表",
        noAutoRefresh: true,
        data: [

        ]
    }

    const tableColumns = [
        {"name": "注册高度", "width": 10, "key": "Height"},
        {"name": "资产名称", "width": 10, "key": "Name"},
        {"name": "资产ID", "width": 40, "key": "Hash"},
        {"name": "注册数量", "width": 20, "key": "Amount"},
        {"name": "注册时间", "width": 20, "key": "Timestamp"},
    ]

    export default {
        components: {beTable},
        name: beNamespace.ASSETS,
        methods: {

        },
        mounted: function () {
            this.$nextTick(function () {
                $("#be-assets-list-table").css({"minHeight":  "auto"})
            })
        },

        computed: {
            assetsList() {
                return {data: this.$store.state.misc.assetsList}
            }
        },

        data: function () {
            return {
                beNamespace: beNamespace.ASSETS,
                tableMiscInfo: tableMiscInfo,
                tableColumns: tableColumns,
                tableLastPage: 0,
                tableLoaded: true,
                dataLoading: false,
                enablePaginate: false,
                eventFactory: new beEvents.factory(beNamespace.ASSETS, this.$BEEventBus.eventType.UNICAST)
            }
        },

        watch: {

        }
    }
</script>

<style scoped>

</style>