<template>
    <div class="be-table-header md-layout md-gutter">
        <div v-for="col in columns"
             class="be-table-header-cell md-layout-item be-word-overflow-dash"
             :class="'md-size-' + col.width">
            <span class="md-body-2">{{col.name}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "be-table-header",
        props: ["columns"],
        mounted() {

        }

    }
</script>

<style scoped>
    .be-table-header {
        min-height: 26px;
    }
</style>