<script lang="ts">
const getPropertyByString = (path, object) => {
    return path.split('.').reduce((o, i) => o[i], object)
}

export default Shopware.Component.wrapComponentConfig({
    mixins: [
        Shopware.Mixin.getByName('generic-module'),
    ],
    data() {
        return {
            activeTabName: null,
        }
    },
    metaInfo() {
        return {
            title: this.$createTitle(),
        };
    },
    computed: {
        store() {
            return Shopware.Store.get('generic-store');
        },
        slots() {
            return this.pageDefinition.slots || {};
        },
        slotSearch() {
            return this.getSlotOptions(this.slots.search);
        },
        slotHeader() {
            return this.getSlotOptions(this.slots.header);
        },
        slotLanguageSwitch() {
            return this.getSlotOptions(this.slots.languageSwitch);
        },
        slotActions() {
            return this.getSlotOptions(this.slots.actions);
        },
        slotContent() {
            return this.getSlotOptions(this.slots.content);
        },
        tabs() {
            return Object.keys(this.pageDefinition.tabs || {}).map((tabName) => ({
                name: tabName,
                label: this.pageDefinition.tabs[tabName]?.label || tabName,
            }));
        },
        activeTab() {
            return this.pageDefinition.tabs?.[this.activeTabName] || null;
        },
    },
    mounted() {
        this.setActiveTab(this.tabs?.[0]?.name);
        this.getData();
    },
    methods: {
        getData() {
            if (!this.moduleDefinition.entity) {
                return;
            }

            if (this.isListPage) {
                return; // Leave it to declarative-content-list
            } else {
                this.getEntity();
            }
        },
        getSlotOptions(slot) {
            if (!slot) {
                return null;
            } else if (typeof slot === 'string') {
                return {
                    component: slot,
                };
            } else {
                return slot;
            }
        },
        setActiveTab(viewName) {
            this.activeTabName = viewName;
        },

        getCardAttrs(card) {
            let attrs = structuredClone(card);

            delete attrs.props;

            /**
             * Workaround to use existing components without refactoring if all they need to be functional is props we have access to.
             * This way we can pass store/mixin data to the component as props.
             */
            Object.entries(card.props || {}).forEach(([target, source]) => {
                attrs[target] = getPropertyByString(source, this);
            });

            return attrs;
        },
    },
});
</script>

<template>
    <sw-page
        :header-border-color="moduleDefinition.color"
        :show-smart-bar="moduleDefinition.presentation?.smartBar !== false"
    >
        <template v-if="slotHeader" #smart-bar-header>
            <component :is="slotHeader.component" v-bind="slotHeader"/>
        </template>

        <template v-if="slotSearch" #search-bar>
            <component :is="slotSearch.component" v-bind="slotSearch"/>
        </template>

        <template v-if="slotLanguageSwitch" #language-switch>
            <component :is="slotLanguageSwitch.component" v-bind="slotLanguageSwitch" />
        </template>

        <template v-if="slotActions" #smart-bar-actions>
            <component :is="slotActions.component" v-bind="slotActions"/>
        </template>

        <template #content>
            <component v-if="slotContent" :is="slotContent.component" v-bind="slotContent"/>
            <sw-card-view v-else>
                <div
                    v-if="tabs.length > 1"
                    style="max-width: 770px; margin: 0 auto 1.5rem; padding: 1rem;"
                >
                    <mt-tabs
                        :default-item="tabs[0]?.name"
                        :items="tabs"
                        @new-item-active="setActiveTab"
                    />
                </div>

                <template v-if="activeTab">
                    <template v-if="activeTab.component">
                        <sw-skeleton v-if="store.isLoading && !store.currentItem"/>
                        <component
                            v-else
                            :is="activeTab.component"
                            :is-loading="isLoading"
                            v-bind="getCardAttrs(activeTab)"
                        />
                    </template>
                    <template v-if="activeTab.cards">
                        <sw-skeleton v-if="isLoading" v-for="_ in viewConfig.cards"/>
                        <component
                            v-else
                            v-for="card in activeTab.cards"
                            :is="card.component"
                            v-bind="getCardAttrs(card)"
                        />
                    </template>
                </template>
            </sw-card-view>
        </template>
    </sw-page>
</template>
