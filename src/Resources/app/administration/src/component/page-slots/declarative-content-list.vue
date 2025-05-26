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

                let config = {
                    ...(typeof column === 'object' ? column : {}),
                    property: propertyName,
                    routerLink: column.detailLink ? this.detailRoute : false,
                };

                if (!column.label) {
                    config.label = propertyName;
                }

                hydrated.push(config);
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
