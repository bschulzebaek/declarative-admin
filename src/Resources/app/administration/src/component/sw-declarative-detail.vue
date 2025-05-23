<script lang="ts">
import DetailReadyEvent from './DetailReadyEvent';
import getPropMapping from '../utils/get-prop-mapping';

export default Shopware.Component.wrapComponentConfig({
    data() {
        return {
            isLoading: true,
            isSaveSuccessful: false,
            entity: null,
            editMode: false,
        }
    },
    props: {
        entityId: {
            type: String,
            default() {
                return null;
            },
        },
    },
    metaInfo() {
        return {
            title: this.$createTitle(this.entity?.name ?? ''),
        };
    },
    computed: {
        headerTitle() {
            return this.entity?.translated?.name || this.entity?.name || '';
        },
        moduleDefinition() {
            // @ts-ignore
            return Shopware.Declarative.getDefinitionByRouteName(this.$route.name);
        },
        routeDefinition() {
            // @ts-ignore
            return Shopware.Declarative.getRouteConfigForRoute(this.$route.name);
        },
        entityRepository() {
            return Shopware.Service('repositoryFactory').create(this.moduleDefinition.entity);
        },
        views() {
            const { children } = this.routeDefinition;

            if (!children) {
                return [];
            }

            return Object.values(children).map((child) => ({
                ...child,
                path: child.path || child.name,
            }));
        },
        entityCriteria() {
            const criteria = new Shopware.Data.Criteria(1, 25);

            this.routeDefinition.associations?.forEach((association) => {
                criteria.addAssociation(association);
            });

            return criteria;
        },
        useEditMode() {
            return this.moduleDefinition.useEditMode ?? false;
        },
    },
    created() {
        if (this.entityId) {
            this.loadEntity();
        } else {
            this.createEntity();
        }
    },
    methods: {
        createEntity() {
            this.entity = this.entityRepository.create(Shopware.Context.api);

            window.dispatchEvent(new DetailReadyEvent(this.moduleDefinition.entity, this.entity));

            this.isLoading = false;
        },
        async loadEntity() {
            this.isLoading = true;

            try {
                this.entity = await this.entityRepository.get(this.entityId, Shopware.Context.api, this.entityCriteria);
                window.dispatchEvent(new DetailReadyEvent(this.moduleDefinition.entity, this.entity));
            } finally {
                this.isLoading = false;
            }
        },
        onCancel() {
            const basePath = this.$route.name.split('.').slice(0, 2).join('.');
            this.$router.push({ name: basePath + '.list' });
        },
        async onSave() {
            this.isLoading = true;
            try {
                await this.entityRepository.save(this.entity);

                if (this.entity._isNew) {
                    this.redirectToDetail();
                }
            } finally {
                this.isLoading = false;
            }
        },
        onSaveFinish() {
            this.isSaveSuccessful = false;
        },
        onChangeLanguage() {
            this.loadEntity();
        },
        redirectToDetail() {
            this.$router.push({
                name: this.$route.name.replace('create', 'detail'),
                params: {
                    id: this.entity.id,
                },
            });
        },

        getMappedProps() {
            return getPropMapping(this.$route.name, this);
        },
    },
});
</script>

<template>

    <sw-page :header-border-color="moduleDefinition.color">
        <template #smart-bar-header>
            <h2>{{ headerTitle }}</h2>
        </template>

        <template #smart-bar-actions>
            <template v-if="useEditMode">
                <template v-if="editMode">
                    <mt-button
                        :disabled="isLoading"
                        variant="secondary"
                        size="default"
                        @click="editMode = false"
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
                        @click="editMode = true"
                    >
                        {{ $t('global.default.edit') }}
                    </mt-button>
                </template>
            </template>
            <template v-else>
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
        </template>

        <template #language-switch>
            <sw-language-switch
                :disabled="!entityId"
                @on-change="onChangeLanguage"
            />
        </template>

        <template #content>
            <sw-card-view>
                <!-- Could use mt-tabs with manual event handling + some styling -->
                <sw-tabs v-if="views.length > 1">
                    <sw-tabs-item
                        v-for="view in views"
                        :route="{ name: view.fullName, params: { id: entityId } }"
                    >
                        {{ view.fullName }}
                    </sw-tabs-item>
                </sw-tabs>

                <router-view v-slot="{ Component }" v-if="!isLoading">
                    <component
                        v-bind="getMappedProps()"
                        :is="Component"
                        :is-loading="isLoading"
                        :entity="entity"
                    />
                </router-view>
            </sw-card-view>
        </template>
    </sw-page>
</template>
