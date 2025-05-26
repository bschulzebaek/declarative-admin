<script lang="ts">
export default Shopware.Component.wrapComponentConfig({
    mixins: [
        Shopware.Mixin.getByName('generic-module'),
    ],
    data() {
        return {
            isSaveSuccessful: false,
        }
    },
    shortcuts: {
        'SYSTEMKEY+S': 'onSave',
        ESCAPE: 'onCancel',
    },
    computed: {
        store() {
            return Shopware.Store.get('generic-store');
        },
    },
    methods: {
        onSaveFinish() {
            this.isSaveSuccessful = false;
        },
        async onSave() {
            this.store.isLoading = true;
            try {
                await this.entityRepository.save(this.store.currentItem);

                if (this.store.currentItem._isNew) {
                    this.redirectToDetail();
                } else {
                    await this.loadEntity();
                }
            } finally {
               this.store.isLoading = false;
            }
        },
        redirectToDetail() {
            this.$router.push({
                name: this.detailRoute,
                params: {
                    id: this.store.currentItem.id,
                },
            });
        },
        onCancel() {
            this.store.editMode = false;
        }
    },
});
</script>

<template>
    <template v-if="store.editMode">
        <mt-button
            :disabled="isLoading"
            variant="secondary"
            size="default"
            @click="onCancel"
        >
            {{ $t('global.default.cancel') }}
        </mt-button>

        <sw-button-process
            variant="primary"
            :is-loading="isLoading"
            :disabled="isLoading"
            :process-success="isSaveSuccessful"
            @update:process-success="onSaveFinish"
            @click="onSave"
        >
            {{ $t('global.default.save') }}
        </sw-button-process>
    </template>
    <template v-else>
        <mt-button
            variant="primary"
            size="default"
            @click="store.editMode = true"
        >
            {{ $t('global.default.edit') }}
        </mt-button>
    </template>

</template>
