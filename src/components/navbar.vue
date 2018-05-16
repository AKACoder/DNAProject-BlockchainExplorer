<template>
    <div id="be-navbar" class="md-layout md-alignment-center md-elevation-2">
        <div id="be-nav-lg" class="md-layout-item md-gutter md-layout md-alignment-center-center
         md-size-90 md-large-size-80 md-xlarge-size-70" >
            <div class="md-layout-item">
                <span class="md-title">BE</span>
            </div>
            <div class="md-layout-item">
                <div class="md-toolbar-section-end">
                    <md-tabs class="md-transparent" md-sync-route @md-changed="pageChange">
                        <md-tab v-for="router in routers"
                                v-bind:id="router.name"
                                v-bind:to="router.path"
                                v-bind:md-label="router.text"/>
                    </md-tabs>

                    <md-field v-show="enableSearch" class="be-lg-search">
                        <md-input class="be-search-input" v-model="searchKey" placeholder="高度/哈希/地址"/>
                    </md-field>
                </div>
            </div>
        </div>

        <div id="be-nav-sm" class="md-layout-item">
            <div class="md-toolbar-row">
                <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
                    <md-icon>menu</md-icon>
                </md-button>
                <span class="md-title">BE</span>

            </div>
            <div class="md-toolbar-row">
                <md-field class="be-sm-search" v-show="enableSearch">
                    <md-input class="be-search-input" v-model="searchKey" placeholder="高度/哈希/地址"/>
                </md-field>
            </div>
        </div>

        <md-drawer :md-active.sync="menuVisible">
            <md-toolbar class="md-transparent" md-elevation="0">&nbsp;</md-toolbar>

            <md-list>
                <md-list-item v-for="router in routers"
                              v-bind:id="router.name"
                              v-bind:to="router.path"
                              v-bind:md-label="router.text"
                              @click="menuVisible = false">
                    <span class="md-list-item-text">{{router.text}}</span>
                </md-list-item>
            </md-list>
        </md-drawer>
    </div>
</template>

<script>

    import {Routers} from "../js/utils/routers";

    export default {
        name: "navbar",
        data: function () {
            return {
                menuVisible: false,
                searchKey: null,
                enableSearch: false,
                routers: Routers
            }
        },
        methods: {
            pageChange(page) {
                this.activeTab = page
            }
        }
    }
</script>

<style scoped>
    #be-nav-sm {
        display: none;
    }

    #be-nav-lg .be-lg-search {
        margin-left: 60px;
        width: 240px;
    }

    .be-sm-search {
        margin: 0 12px;
    }

    .be-search-input {
        font-size: 13px !important;
    }
    .be-search-input::placeholder {
        font-size: 13px !important;
    }

    #be-navbar {
        margin-bottom: 20px;
    }

    @media screen and  (max-width: 720px) {
        #be-nav-sm {
            display: block;
        }

        #be-nav-lg {
            display: none;
        }

        #be-navbar {
            margin-bottom: 10px;
        }
    }



</style>