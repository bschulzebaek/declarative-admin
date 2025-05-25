<script lang="ts">
export default Shopware.Component.wrapComponentConfig({
    mixins: [
        Shopware.Mixin.getByName('listing'), // Note: Order of mixins matters for internal checks in listing mixin ("getList exists")
        Shopware.Mixin.getByName('generic-module'),
    ],
    props: {
        columns: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            sortBy: 'createdAt',
            sortDirection: 'DESC',
        }
    },
    computed: {
        hydratedColumns() {
            let hydrated: any = [];

            this.columns.forEach((column: string) => {
                const propertyName = column.property || column;

                hydrated.push({
                    property: propertyName,
                    label: column.label || propertyName,
                    // label: `entity.${this.moduleDefinition.entity}.${column}.label`,
                    inlineEdit: this.entityDefinition.properties[propertyName]?.type || false,
                    dataIndex: column.dataIndex || null,
                    routerLink: column.detailLink ? this.detailRoute : false,
                    primary: column.primary || false,
                    align: column.align,
                });
            });

            return hydrated;
        },
    },
});
</script>

<template>
    <sw-entity-listing
        :repository="entityRepository"
        :columns="hydratedColumns"
        :detail-route="detailRoute"
        :items="store.items"
        :is-loading="store.isLoading"
    />
</template>
