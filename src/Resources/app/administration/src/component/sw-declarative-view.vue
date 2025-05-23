<script lang="ts">
import getPropMapping from '../utils/get-prop-mapping';

export default Shopware.Component.wrapComponentConfig({
    props: {
        isLoading: {
            type: Boolean,
            default: false,
        },
        entity: {
            type: Object,
            required: true,
        }
    },
    computed: {
        moduleDefinition() {
            // @ts-ignore
            return Shopware.Declarative.getDefinitionByRouteName(this.$route.name);
        },
        routeDefinition() {
            // @ts-ignore
            return Shopware.Declarative.getRouteConfigForRoute(this.$route.name);
        },
        viewConfig() {
            // @ts-ignore
            return Shopware.Declarative.getViewDefinitionByRouteName(this.$route.name);
        },
        entityDefinition() {
            return Shopware.EntityDefinition.get(this.moduleDefinition.entity);
        },
    },
    methods: {
        getFieldConfig(fieldName: string) {
            return {
                label: `entity.${this.entityDefinition.entity}.${fieldName}.label`,
            }
        },
        componentExists(name: string) {
            return Shopware.Component.getComponentRegistry().has(name);
        },
        getMappedProps() {
            const mapping = getPropMapping(this.$route.name, this)
            console.log('sw-declarative-view', mapping);
            return mapping;
        },
    },
});
</script>

<template>
    <template v-if="isLoading">
        <sw-skeleton v-for="_cards in viewConfig.cards"></sw-skeleton>
    </template>
    <template v-else>
        <template v-for="card in viewConfig.cards">
            <template v-if="card.component">
                <component
                    v-bind="getMappedProps()"
                    v-if="componentExists(card.component)"
                    :is="card.component"
                />
                <mt-card
                    v-else
                    title="PLACEHOLDER"
                >
                    Should render custom component "{{ card.component }}", as defined in module definition
                </mt-card>
            </template>

            <mt-card
                v-else
                :title="card.title"
            >
                <div class="sw-declarative-view__field-container">
                    <sw-form-field-renderer
                        v-for="field in card.properties"
                        v-model:value="entity[field]"
                        :type="entityDefinition.properties[field].type"
                        :config="getFieldConfig(field)"
                    />
                </div>
            </mt-card>
        </template>
    </template>
</template>

<style scoped>
.sw-declarative-view__field-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;

    > * {
        flex: 1 0 calc(50% - 8px);
    }
}
</style>
