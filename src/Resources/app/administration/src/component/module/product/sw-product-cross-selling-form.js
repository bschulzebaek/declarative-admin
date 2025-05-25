export default {
    computed: {
        product() {
            return Shopware.Store.get('generic-store').currentItem;
        },
        isLoading() {
            return Shopware.Store.get('generic-store').isLoading;
        },
    },
}
