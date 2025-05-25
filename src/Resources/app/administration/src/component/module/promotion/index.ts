// @ts-nocheck
import DetailReadyEvent from '../../../component/DetailReadyEvent';

/**
 * "sw-promotion-detail-discounts" relies on the VUEX swPromotionDetail store, which is hydrated in the sw-promotion-detail component.
 * Shouldn't be necessary if we just pass the promotion entity to the component and handle the hydration locally.
 */
window.addEventListener(DetailReadyEvent.NAME, (event) => {
    if (event.entityType !== 'promotion') {
        return;
    }
    if (event.entity._isNew) {
        event.entity.hasOrders = false;
    } else {
        event.entity.hasOrders = event.entity.orderCount !== null ? event.entity.orderCount > 0 : false;
    }

    Shopware.Store.get('swPromotionDetail').promotion = event.entity;
})
