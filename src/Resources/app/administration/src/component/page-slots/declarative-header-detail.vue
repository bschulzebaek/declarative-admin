<script lang="ts">
export default Shopware.Component.wrapComponentConfig({
    mixins: [
        'placeholder',
    ],
    metaInfo() {
        return {
            title: this.$createTitle(this.identifier),
        };
    },
    computed: {
        store() {
            return Shopware.Store.get('generic-store');
        },
        identifier() {
            return this.placeholder(this.store.currentItem, 'name');
        },
        header() {
            return this.placeholder(this.store.currentItem, 'name', this.$t('test.title.edit'));
        },
    },
});
</script>

<template>
    <h2>{{ header }}</h2>
</template>
