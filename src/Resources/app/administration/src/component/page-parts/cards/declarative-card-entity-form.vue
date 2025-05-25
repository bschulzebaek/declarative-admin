<script lang="ts">
export default Shopware.Component.wrapComponentConfig({
    mixins: [
        Shopware.Mixin.getByName('generic-module'),
    ],
    props: {
        title: {
            type: String,
            required: false,
            default: '',
        },
        fields: {
            type: Array,
            required: true,
        },
    },
    computed: {
        store() {
            return Shopware.Store.get('generic-store');
        },
    },
    methods: {
        getFieldConfig(field) {
            const { entity } = this.entityDefinition;
            const fieldName = typeof field === 'string' ? field : field.name;

            return {
                label: field.label || `entity.${entity}.${fieldName}.label`,
            };
        },
        getField(field) {
            if (typeof field === 'string') {
                return this.store.currentItem[field];
            }

            return this.store.currentItem[field.name];
        },
        getType(field) {
            let type: string = this.entityDefinition.properties[field.name || field].type;

            if (type === 'boolean') {
                type = 'bool';
            }

            return type;
        }
    },
});
</script>

<template>
    <sw-skeleton v-if="store.isLoading"/>
    <sw-card
        v-else
        :title="$t(title)"
    >
        <div class="declarative-card-entity-form__field-container">
            <sw-form-field-renderer
                v-for="field in fields"
                v-model:value="store.currentItem[field.name || field]"
                :type="getType(field)"
                :config="getFieldConfig(field)"
            />
        </div>
    </sw-card>
</template>

<style scoped>
.declarative-card-entity-form__field-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;

    > * {
        flex: 1 0 calc(50% - 8px);
    }
}
</style>
