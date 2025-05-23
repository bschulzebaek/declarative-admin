<script lang="ts">
export default Shopware.Component.wrapComponentConfig({
    mixins: [
        Shopware.Mixin.getByName('listing'),
    ],
    data() {
        return {
            isLoading: true,
            sortBy: 'createdAt',
            sortDirection: 'DESC',
            items: [],
        }
    },
    computed: {
        headerTitle() {
            return `${this.moduleDefinition.title} (${this.total})`;
        },
        moduleDefinition() {
            return Shopware.Declarative.getDefinitionByRouteName(this.$route.name);
        },
        routeDefinition() {
            return Shopware.Declarative.getRouteConfigForRoute(this.$route.name);
        },
        entityDefinition() {
            return Shopware.EntityDefinition.get(this.moduleDefinition.entity);
        },
        entityRepository() {
            return Shopware.Service('repositoryFactory').create(this.moduleDefinition.entity);
        },
        entityCriteria() {
            return new Shopware.Data.Criteria(this.page, this.limit)
                .setTerm(this.term)
                .addSorting(Shopware.Data.Criteria.sort(this.sortBy, this.sortDirection));
        },
        columns() {
            let columns: any = [];

            this.routeDefinition.columns.forEach((column: string) => {
                columns.push({
                    property: column,
                    label: column,
                    // label: `entity.${this.moduleDefinition.entity}.${column}.label`,
                    routerLink: this.detailRoute,
                    inlineEdit: this.entityDefinition.properties[column]?.type || false,
                });
            });

            return columns;
        },
        detailRoute() {
            return this.$route.name.replace('list', 'detail');
        },
        createRoute() {
            return this.$route.name.replace('list', 'create');
        },
    },
    created() {
        console.log(this.$router)
    },
    methods: {
        async getList() {
            this.isLoading = true;
            try {
                const searchResult = await this.entityRepository.search(this.entityCriteria);
                this.total = searchResult.total;
                this.items = searchResult;
            } finally {
                this.isLoading = false;
            }
        },
        onChangeLanguage() {
            void this.getList();
        },
    },
})
</script>

<template>
    <sw-page>
        <template #smart-bar-header>
            <h2>{{ headerTitle }}</h2>
        </template>

        <template #search-bar>
            <sw-search-bar
                :initial-search-type="moduleDefinition.entity"
                :initial-search="term"
                @search="onSearch"
            />
        </template>

        <template #language-switch>
            <sw-language-switch @on-change="onChangeLanguage"/>
        </template>

        <template #smart-bar-actions>
            <mt-button
                variant="primary"
                size="default"
                @click="$router.push({ name: createRoute })"
            >
                {{ $t('global.default.add') }} {{ moduleDefinition.entity }}
            </mt-button>
        </template>

        <template #content>
            <sw-entity-listing
                :repository="entityRepository"
                :detail-route="detailRoute"
                :columns="columns"
                :items="items"
                :is-loading="isLoading"
            />
        </template>
    </sw-page>
</template>
