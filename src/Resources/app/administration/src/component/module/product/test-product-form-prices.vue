<script lang="ts">
export default Shopware.Component.wrapComponentConfig({
    computed: {
        store() {
            return Shopware.Store.get('generic-store');
        },
    },
});
</script>

<template>
    <mt-card
        :title="$tc('sw-product.detailBase.cardTitlePrices')"
        :is-loading="store.isLoading"
    >
        PLACEHOLDER: Could copy "sw-product-price-form" and adjust code to work with the generic store.
    </mt-card>
</template>
