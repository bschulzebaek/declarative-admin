import { defineComponent } from 'vue';
import DetailReadyEvent from '../component/DetailReadyEvent';

let detailPromise: Promise<any> | null = null;

export default Shopware.Mixin.register('generic-module', defineComponent({
    computed: {
        store() {
            return Shopware.Store.get('generic-store');
        },
        moduleDefinition() {
            return Shopware.ModuleConfig.getModuleByRoute(this.$route.name);
        },
        pageDefinition() {
            return Shopware.ModuleConfig.getPageByRoute(this.$route.name);
        },
        entityDefinition() {
            return Shopware.EntityDefinition.get(this.moduleDefinition.entity);
        },
        entityRepository() {
            return Shopware.Service('repositoryFactory').create(this.moduleDefinition.entity);
        },
        isListPage() {
            return this.$route.name?.endsWith('.list');
        },
        listRoute() {
            return this.convertRoute('list');
        },
        isDetailPage() {
            return this.$route.name?.endsWith('.detail');
        },
        detailRoute() {
            return this.convertRoute('detail');
        },
        isCreatePage() {
            return this.$route.name?.endsWith('.create');
        },
        createRoute() {
            return this.convertRoute('create');
        },
        listCriteria() {
            const criteria = new Shopware.Data.Criteria(this.page, this.limit);
            criteria
                .setTerm(this.term)
                .addSorting(Shopware.Data.Criteria.sort(this.sortBy, this.sortDirection));

            this.pageDefinition.associations?.forEach((association: string) => {
                criteria.addAssociation(association);
            });

            return criteria;
        },
        detailCriteria() {
            const criteria = new Shopware.Data.Criteria(1, 1);

            this.pageDefinition.associations?.forEach((association: string) => {
                criteria.addAssociation(association);
            });

            return criteria;
        },
    },
    methods: {
        async getList() {
            this.store.isLoading = true;

            try {
                const searchResult = await this.entityRepository.search(this.listCriteria);

                this.store.listTotal = searchResult.total;
                this.store.items = searchResult;
            } finally {
                this.store.isLoading = false;
            }
        },
        async getEntity() {
            if (this.$route.params.id) {
                return this.loadEntity();
            } else {
                return this.createEntity();
            }
        },
        createEntity() {
            if (!this.moduleDefinition.entity) {
                return;
            }

            this.store.currentItem = this.entityRepository.create(Shopware.Context.api);
            window.dispatchEvent(new DetailReadyEvent(this.moduleDefinition.entity, this.store.currentItem));
            this.store.isLoading = false;
        },
        async loadEntity() {
            if (!this.moduleDefinition.entity) {
                return;
            }

            if (detailPromise) {
                return detailPromise;
            }

            this.store.isLoading = true;

            try {
                detailPromise = this.entityRepository.get(this.$route.params.id, Shopware.Context.api, this.detailCriteria);
                this.store.currentItem = await detailPromise;
                window.dispatchEvent(new DetailReadyEvent(this.moduleDefinition.entity, this.store.currentItem));
            } finally {
                detailPromise = null;
                this.store.isLoading = false;
            }
        },
        convertRoute(name: string) {
            const basePath = (this.$route.name as string).split('.').slice(0, 2).join('.');

            return `${basePath}.${name}`;
        },
    },
}));
