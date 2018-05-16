<template>
    <md-content class="be-table md-alignment-center">
        <be-table-misc-panel v-if="hasMiscInfo()"
                             v-bind:title="miscInfo.title"
                             v-bind:event-name="'miscEvent'"
                             v-bind:misc-info="miscInfo.data"
                             v-bind:no-auto-refresh="miscInfo.noAutoRefresh"
                             v-bind:auto-refresh="autoRefresh"
                             v-bind:paginate-enabled="enablePaginate"
                             v-bind:be-namespace="beNamespace"
                             v-bind:last-page="lastPage"
                             v-bind:event-factory="eventFactory"
                             v-bind:refresh-timer-base-count="refreshTimerBaseCount"
                             @miscEvent="miscEventHandler"
        />

        <be-table-header v-if="hasHeader()"
                         v-bind:columns="columns"
        />

        <transition name="be-table-ani-fade">
            <be-table-loading  v-if="!loaded" v-bind:key="'be-table-loading-spinner'"/>

            <div class="be-table-body" v-else v-bind:key="'be-table-body'">
                <template v-for="(data,idx) in tableData.data">
                    <be-table-row
                            v-bind:columns="columns"
                            v-bind:idx="idx"
                            v-bind:row-data="data"/>
                </template>

                <div class="be-table-body-loading">
                    <md-progress-spinner class="be-table-spinner" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"/>
                </div>
            </div>
        </transition>
    </md-content>
</template>

<script>
    import beTableMiscPanel from './components/beTableMiscPanel'
    import beTableHeader from './components/beTableHeader'
    import beTableRow from './components/beTableRow'
    import beTableLoading from './components/beTableLoading'

    import Paginate from 'vuejs-paginate'

    export default {
        components: {beTableMiscPanel, beTableHeader, beTableRow, beTableLoading, Paginate},
        name: "be-table",
        props: ["miscInfo", "columns", "tableData", "enablePaginate", "beNamespace",
            "eventFactory", "lastPage", "loaded", "dataLoading", "refreshTimerBaseCount"],
        data: function () {
            return {
                jqThis: false,
                autoRefresh: false,
                paginateNoLi: true
            }
        },

        watch: {
            dataLoading: function (val) {
                if (false === this.jqThis) {
                    this.jqThis = $(this.$el)
                }

                let $bodyLoading = this.jqThis.find(".be-table-body-loading")
                let $bodyLoadingSpinner = $bodyLoading.find(".be-table-spinner")
                if(0 !== $bodyLoadingSpinner.length && !$bodyLoading.attr("bodyLoadingInited")) {
                    $bodyLoadingSpinner.css({
                        top: ($bodyLoading.outerHeight() - $bodyLoadingSpinner.outerHeight()) / 2,
                        left: ($bodyLoading.outerWidth() - $bodyLoadingSpinner.outerWidth()) / 2,
                        visibility: "visible"
                    })

                    $bodyLoading.hide().css({visibility: "visible"}).attr("bodyLoadingInited", true)
                }

                val ? $bodyLoading.stop(true, true).fadeIn() :  $bodyLoading.stop(true, true).fadeOut()
            }
        },
        methods: {
            hasMiscInfo() {
                return this.miscInfo instanceof Object
            },
            hasHeader() {
                return this.columns instanceof Array
            },
            miscEventHandler(data) {
                //only handle auto-refresh switch event for now
                this.autoRefresh = data
                this.$emit("autoRefreshChanged", data)
            }
        }
    }
</script>

<style>
    .be-table {
        width: 100%;
        min-height: 300px;
        position: relative;
        background-color: white;
        padding: 2% 4%;
    }

    @media screen and (max-width: 768px) {
        .be-table {
            width: 200%;
        }
    }

    .be-table-ani-fade-enter-active, .be-table-ani-fade-leave-active {
        transition: opacity .2s;
    }
    .be-table-ani-fade-enter, .be-table-ani-fade-leave-to {
        opacity: 0;
    }

    .be-link.be-paginate-link {
        display: inline-block;
        min-width: 30px;
        height: 20px;
        padding-right: 6px;
        margin-bottom: 6px;
    }

    .be-link.be-paginate-link.active,
    .be-link.be-paginate-link.disabled {
        color: gray;
        cursor: default;
        text-decoration: none;
    }
    .be-link.be-paginate-link.active:hover,
    .be-link.be-paginate-link.disabled:hover {
        text-decoration: none;
        color: gray;
    }

    .be-table-body {
        position: relative;
    }

    .be-table-body .be-table-body-loading {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #ffffff;
        opacity: 0.8;
        visibility: hidden;
    }

    .be-table-body .be-table-body-loading .be-table-spinner {
        position: absolute;
        visibility: hidden;
    }

</style>