import './store/generic.store';

/**
 * Page Slots
 */
Shopware.Component.register('sw-declarative-wrapper', () => import('./page/sw-declarative-wrapper.vue'));
Shopware.Component.register('sw-page-declarative', () => import('./page/sw-page-declarative.vue'));
Shopware.Component.register('declarative-header-list', () => import('./page-slots/declarative-header-list.vue'));
Shopware.Component.register('declarative-header-detail', () => import('./page-slots/declarative-header-detail.vue'));
Shopware.Component.register('declarative-content-list', () => import('./page-slots/declarative-content-list.vue'));
Shopware.Component.register('declarative-actions-list', () => import('./page-slots/declarative-actions-list.vue'));
Shopware.Component.register('declarative-actions-detail', () => import('./page-slots/declarative-actions-detail.vue'));
Shopware.Component.register('declarative-actions-detail-editMode', () => import('./page-slots/declarative-actions-detail-editMode.vue'));
Shopware.Component.register('declarative-language-switch', () => import('./page-slots/declarative-language-switch.vue'));
Shopware.Component.register('declarative-search-list', () => import('./page-slots/declarative-search-list.vue'));

/**
 * Page Content Cards
 */
Shopware.Component.register('declarative-card-placeholder', () => import('./cards/declarative-card-placeholder.vue'));
Shopware.Component.register('declarative-card-entity-form', () => import('./cards/declarative-card-entity-form.vue'));
Shopware.Component.register('declarative-card-custom-fieldset', () => import('./cards/declarative-card-custom-fieldset.vue'));

/**
 * Module Components
 */


// Promotion Module
import './module/promotion';
Shopware.Component.register('test-promotion-base-codes', () => import('./module/promotion/test-promotion-base-codes.vue'));

// Dashboard Module
Shopware.Component.register('test-dashboard-welcome', () => import('./module/dashboard/test-dashboard-welcome.vue'));
Shopware.Component.register('test-dashboard-help', () => import('./module/dashboard/test-dashboard-help.vue'));

// Product Module
Shopware.Component.register('test-product-form-prices', () => import('./module/product/test-product-form-prices.vue'));
Shopware.Component.override('sw-product-detail-cross-selling', () => import('./module/product/sw-product-detail-cross-selling'));
Shopware.Component.override('sw-product-cross-selling-form', () => import('./module/product/sw-product-cross-selling-form'));

// Review Module
Shopware.Component.register('test-review-card', () => import('./module/review/test-review-card.vue'));
