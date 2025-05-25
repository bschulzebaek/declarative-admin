<script lang="ts">
export default Shopware.Component.wrapComponentConfig({
    inject: [
        'customFieldDataProviderService',
    ],
    mixins: [
        Shopware.Mixin.getByName('generic-module'),
    ],
    data() {
        return {
            customFieldSets: null,
        }
    },
    computed: {
        store() {
            return Shopware.Store.get('generic-store');
        },
        showCustomFields() {
            return this.customFieldSets && this.customFieldSets.length > 0;
        },
    },
    mounted() {
        this.onMounted();
    },
    methods: {
        async onMounted() {
            // Should properly implement a pending state to avoid unnecessary fetching when switching tabs
            await this.getEntity();

            void this.loadCustomFieldSets();
        },
        async loadCustomFieldSets() {
            try {
                this.customFieldSets = await this.customFieldDataProviderService.getCustomFieldSets(this.entityDefinition.entity);
            } finally {

            }
        },
    },
});
</script>

<template>
    <mt-card
        v-if="showCustomFields"
        title="Custom Fields"
    >
        <sw-custom-field-set-renderer
            :entity="store.currentItem"
            :sets="customFieldSets"
        />
    </mt-card>
</template>
