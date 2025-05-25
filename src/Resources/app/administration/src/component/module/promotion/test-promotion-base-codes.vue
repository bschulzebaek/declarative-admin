<script lang="ts">
export default Shopware.Component.wrapComponentConfig({
    mixins: [
        Shopware.Mixin.getByName('generic-module'),
    ],
    computed: {
        store() {
            return Shopware.Store.get('generic-store');
        },
        isCreateMode() {
            return this.$route.name.includes('create');
        },
    },
});
</script>

<template>
    <mt-card
        v-if="store.currentItem && !isCreateMode"
        :is-loading="store.isLoading"
        :title="$tc('sw-promotion-v2.detail.base.codes.cardTitle')"
    >
    PLACEHOLDER: just need to copy some local state variables and methods to extract the card into a separate component
<!--    <mt-select-->
<!--        :label="$tc('sw-promotion-v2.detail.base.codes.codeTypeLabel')"-->
<!--        :disabled="!acl.can('promotion.editor')"-->
<!--        :model-value="selectedCodeType"-->
<!--        :options="codeTypeOptions"-->
<!--        @update:model-value="onChangeCodeType"-->
<!--    />-->

<!--    <template v-if="selectedCodeType === CODE_TYPES.FIXED">-->
<!--        <mt-text-field-->
<!--            v-model="promotion.code"-->
<!--            class="sw-promotion-v2-detail-base__fixed-field-code"-->
<!--            :disabled="!acl.can('promotion.editor')"-->
<!--            :label="$tc('sw-promotion-v2.detail.base.codes.fixed.codeLabel')"-->
<!--            :placeholder="$tc('sw-promotion-v2.detail.base.codes.fixed.codePlaceholder')"-->
<!--            copyable-->
<!--        />-->
<!--        <sw-button-process-->
<!--            class="sw-promotion-v2-detail-base__fixed-generate-button"-->
<!--            :is-loading="isGenerating"-->
<!--            :disabled="!acl.can('promotion.editor')"-->
<!--            :process-success="isGenerateSuccessful"-->
<!--            @update:process-success="generateFinish"-->
<!--            @click.prevent="onGenerateCodeFixed"-->
<!--        >-->
<!--            {{ $tc('sw-promotion-v2.detail.base.codes.fixed.generateButton') }}-->
<!--        </sw-button-process>-->

<!--    </template>-->

<!--    <template v-else-if="selectedCodeType === CODE_TYPES.INDIVIDUAL">-->

<!--        <sw-promotion-v2-individual-codes-behavior-->
<!--            :promotion="promotion"-->
<!--            @generate-finish="$emit('generate-individual-codes-finish')"-->
<!--            @delete-finish="$emit('delete-individual-codes-finish')"-->
<!--        />-->

<!--    </template>-->
    </mt-card>
</template>
