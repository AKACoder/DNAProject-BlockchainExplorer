<template>
    <div class="be-table-row md-layout md-gutter animated"
    :class="">
        <be-table-cell v-for="col in columns"
                       v-bind:width="col.width"
                       v-bind:text="rowData[col.key]"/>
    </div>
</template>

<script>
    import beTableCell from './beTableCell'

    export default {
        components: {beTableCell},
        name: "be-table-row",
        props: ["columns", "rowData", "idx"],
        data: function () {
            return {
                aniClasses: {
                    animated: true,

                }
            }
        },
        methods: {
            isFirstRow() {
                return 0 === this.idx
            }
        },
        beforeUpdate() {
            let $el = $(this.$el)
            let aniClass = 'slideInDown'
            if (this.isFirstRow()) {
                aniClass = 'fadeInDown'
            }

            $el.animateCss(aniClass, function() {
                $el.removeClass(aniClass)
            });
        }
    }
</script>

<style scoped>
    .be-table-row {
        height: 26px;
        background-color: white;
    }
</style>