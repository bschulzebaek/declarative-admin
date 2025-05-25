export default {
    computed: {
        product() {
            return Shopware.Store.get('generic-store').currentItem;
        },
        isChild() {
            return this.product?.parentId;
        },
        isLoading() {
            return Shopware.Store.get('generic-store').isLoading;
        },
    },
}
