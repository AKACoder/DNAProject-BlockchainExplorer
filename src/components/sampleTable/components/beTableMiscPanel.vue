<template>
    <div class="be-table-misc-panel md-layout md-gutter md-alignment-center-left">
        <div class="md-layout-item md-layout md-alignment-center-left md-size-40 md-small-size-100">
            <span class="be-table-misc-title md-title">{{title}}</span>
            <md-switch class="md-primary md-caption" v-show="!noAutoRefresh"
                       @change="autoRefreshChanged"
                       v-model="autoRefresh">自动刷新 {{refreshTimerText}} </md-switch>
        </div>
        <div class="md-layout-item md-alignment-center md-size-20 md-small-size-50" v-for="info in miscInfo">
            <span class="md-caption">{{info.title}}{{info.joiner ? info.joiner : " "}}{{info.value}}</span>
        </div>
        <div v-show="this.lastPage > 1" class="be-table-paginate md-layout-item md-small-size-100 md-layout md-alignment-center-left">
            <div class="md-layout-item md-size-15">
                <md-button class="be-table-paginate-to-first md-primary md-icon-button md-dense" disabled="disabled"
                           @click="toFirstPage">{{'|<<'}}</md-button>
            </div>
            <div class="md-layout-item md-size-15">
                <md-button class="be-table-paginate-prev md-primary md-icon-button md-dense" disabled="disabled"
                           @click="toPrevPage">{{'<'}}</md-button>
            </div>

            <div class="md-layout-item md-size-15">
                <md-field class="be-table-paginate-input-container">
                    <md-input class="be-table-paginate-input"
                              ref="tablePageInput"
                              v-model="currentPageText"
                              v-fou
                              placeholder="页码"
                              @keydown="pageInput($event)"/>
                </md-field>
            </div>

            <div class="md-layout-item md-size-15">
                <md-button class="be-table-paginate-next md-primary md-icon-button md-dense" disabled="disabled"
                           @click="toNextPage">{{'>'}}</md-button>
            </div>
            <div class="md-layout-item md-size-15">
                <md-button class="be-table-paginate-to-last md-primary md-icon-button md-dense" disabled="disabled"
                           @click="toLastPage">{{'>>|'}}</md-button>
            </div>
        </div>
    </div>
</template>

<script>

    import {BETools} from "../../../js/utils/tools";
    import {beEvents} from "../../../js/beEvents";

    let currentPage = {}
    function setCurrentPageUnderNamespace(namespace, val) {
        currentPage[namespace] = val
    }

    function getCurrentPageUnderNamespace(namespace) {
        return currentPage[namespace] || 1
    }

    export default {
        name: "be-table-misc-panel",
        props: ["title", "miscInfo", "eventFactory", "noAutoRefresh",
            "paginateEnabled", "autoRefresh", "beNamespace",
            "lastPage", "refreshTimerBaseCount", "eventName"],
        mounted() {
            this.startRefreshTimer()

            this.$BEEventBus.bus.registerEventHandler(beEvents.ENABLE_PAGINATE, function () {
                this.enablePaginate()
            }, this, this.beNamespace)
        },
        data: function () {
            return {
                refreshTimerText: "",
                refreshTimer: null,
                pageInputFocus: false,
                currentPage: getCurrentPageUnderNamespace(this.beNamespace)
            }
        },

        watch: {
            autoRefresh: function (val) {
                this.$emit(this.eventName, val)
            },

            lastPage: function (val) {
                if(val > 1) {
                    let $this = $(this.$el)
                    let $next = $this.find('.be-table-paginate-next')
                    let $toLast = $this.find('.be-table-paginate-to-last')

                    $toLast.removeAttr('disabled')
                    $next.removeAttr('disabled')
                }
            },

            currentPage: function (val) {
                setCurrentPageUnderNamespace(this.beNamespace, val)
                if(this.autoRefresh && 1 === this.currentPage) {
                    this.enablePaginate()
                    return
                }

                this.disablePaginate()

                if(this.autoRefresh && 1 !== val) {
                    this.autoRefresh = false
                }

                this.$BEEventBus.bus.post(
                    this.eventFactory.newEvent(beEvents.TABLE_PAGE_CHANGED, val)
                )
            }
        },
        computed: {
            currentPageText() {
                return this.currentPage
            },
        },
        methods: {
            toLastPage() {
                this.currentPage = this.lastPage
            },

            toFirstPage() {
                this.currentPage = 1
            },

            toPrevPage() {
                if (1 >= this.currentPage) {
                    this.currentPage = 1
                    return
                }

                this.currentPage -= 1
            },

            toNextPage() {
                if (this.lastPage === this.currentPage) {
                    return
                }

                this.currentPage += 1
            },

            disablePaginate() {
                this.paginateEnabled = false

                let $this = $(this.$el)
                let $input = $(this.$refs.tablePageInput.$el)

                $input.attr("disabled", "disabled")

                let $toFirst = $this.find('.be-table-paginate-to-first')
                let $prev = $this.find('.be-table-paginate-prev')
                let $next = $this.find('.be-table-paginate-next')
                let $toLast = $this.find('.be-table-paginate-to-last')

                $toFirst.attr('disabled', 'disabled')
                $prev.attr('disabled', 'disabled')

                $toLast.attr('disabled', 'disabled')
                $next.attr('disabled', 'disabled')

            },

            enablePaginate() {
                let $this = $(this.$el)
                let $input = $(this.$refs.tablePageInput.$el)

                $input.removeAttr("disabled")

                let $toFirst = $this.find('.be-table-paginate-to-first')
                let $prev = $this.find('.be-table-paginate-prev')
                let $next = $this.find('.be-table-paginate-next')
                let $toLast = $this.find('.be-table-paginate-to-last')

                $toFirst.removeAttr('disabled')
                $prev.removeAttr('disabled')

                $toLast.removeAttr('disabled')
                $next.removeAttr('disabled')
            },

            pageInput(e) {
                let keyCode = e.keyCode
                if(BETools.keyCode.isInvalidNumberInputKey(keyCode)) {
                    e.preventDefault()
                    e.stopPropagation()
                    return
                }

                let $input = $(this.$refs.tablePageInput.$el)

                if (BETools.keyCode.isEnterCode(keyCode)) {
                    let _this = this
                    ;(function () {
                        $input.blur()
                        const targetPage = parseInt($input.val())
                        if (targetPage !== targetPage) {
                            return
                        }

                        if(targetPage === _this.currentPage) {
                            return
                        }


                        if (targetPage < 1) {
                            return
                        }

                        if (targetPage > _this.lastPage) {
                            _this.currentPage = _this.lastPage
                        }

                        _this.currentPage = targetPage

                    })();

                    $input.val(this.currentPage)
                } else if (BETools.keyCode.isEscCode(keyCode)) {
                    $input.blur()
                    $input.val(this.currentPage)
                }


            },

            startRefreshTimer() {
                if(null !== this.refreshTimer) {
                    return
                }

                let _this = this
                let thisData = this.$data
                this.refreshTimer = setInterval(function () {
                    if(!_this.autoRefresh) {
                        thisData.refreshTimerText = ""
                        return
                    }

                    thisData.refreshTimerText = _this.refreshTimerBaseCount + "s"
                    _this.refreshTimerBaseCount += 1
                }, 1000)
            },

            autoRefreshChanged() {
                if(this.autoRefresh && 1 !== this.currentPage) {
                    this.currentPage = 1
                }
            },
        }
    }
</script>

<style scoped>
    .md-layout.be-table-misc-panel {
        min-height: 46px;
        padding-bottom: 6px;
        border-bottom:  1px whitesmoke solid;
    }

    .be-table-misc-title {
        margin-right: 20px;
    }

    .be-table-paginate {
        z-index: 0;
    }

    .be-table-paginate-input-container {
        margin: 0 0 0 6px;
        padding: 0;
        font-size: 13px;
        height: 32px;
        min-height: auto;
        ime-mode:disabled !important;
    }

    .be-table-paginate-input {
        width: 100%;
        font-size: 13px !important;
        text-align: center;
        -webkit-text-fill-color: inherit !important;
        text-fill-color: inherit !important;
    }

    .be-table-paginate-input:disabled {
        color: lightgray !important;
    }


    .be-table-paginate-input::placeholder {
        font-size: 13px !important;
    }

    .be-table-paginate-input:-ms-input-placeholder {
        font-size: 13px !important;
    }


</style>