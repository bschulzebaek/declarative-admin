<script lang="ts">
export default Shopware.Component.wrapComponentConfig({
    mixins: [
        Shopware.Mixin.getByName('generic-module'),
    ],
    computed: {
        store() {
            return Shopware.Store.get('generic-store');
        },
    },
});
</script>

<template>
    <h2>{{ moduleDefinition.title }} <span v-if="!store.isLoading" class="sw-page__smart-bar-amount">({{ store.listTotal }})</span></h2>
</template>
