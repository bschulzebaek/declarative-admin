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
    methods: {
        onSearch(term: string) {
            // this.store.setTerm(term);
            // this.store.getList(this.entityRepository, this.entityCriteria);
        },
    },
});
</script>

<template>
    <sw-search-bar
        :initial-search-type="moduleDefinition.entity"
        :initial-search-term="store.term"
        @search="onSearch"
    />
</template>
