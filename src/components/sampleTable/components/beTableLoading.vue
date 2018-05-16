<template>
    <md-progress-spinner class="be-table-spinner" :md-diameter="30" :md-stroke="3" md-mode="indeterminate"/>
</template>

<script>
    export default {
        name: "be-table-loading",
        mounted() {
            this.$nextTick(function () {
                let $spinner = $(this.$el)
                let $table = $spinner.parents('.be-table')

                $spinner.css({
                    top: ($table.outerHeight() - $spinner.outerHeight()) * 2 / 3,
                    left: ($table.outerWidth() - $spinner.outerWidth()) / 2,
                    visibility: "visible"
                })
            })
        }
    }
</script>

<style scoped>
    .be-table-spinner {
        position: absolute;
        visibility: hidden;
    }
</style>