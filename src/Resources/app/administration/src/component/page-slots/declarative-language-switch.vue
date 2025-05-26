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
        onChangeLanguage() {
            if (this.isDetailPage) {
                void this.getEntity();
            } else if (this.isListPage) {
                void this.getList();
            }
        },
    },
});
</script>

<template>
    <sw-language-switch :disabled="isCreatePage || store.isLoading" @on-change="onChangeLanguage"/>
</template>
