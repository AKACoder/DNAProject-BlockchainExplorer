<template>
    <div class="be-table-cell md-layout-item be-word-overflow-dash"
         :class="'md-size-' + width">
        <span class="md-caption">{{text}}</span>
    </div>
</template>

<script>
    export default {
        name: "be-table-cell",
        props: ["text", "width"]
    }
</script>

<style scoped>

</style>