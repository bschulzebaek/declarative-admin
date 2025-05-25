<script lang="ts">
/**
 * vue-router is keeping the component instance alive if the target route uses the same component.
 * Using the key here to force a new instance instead of resetting states manually.
 */
export default Shopware.Component.wrapComponentConfig({
    template: '<sw-page-declarative :key="$route.name" />',
    computed: {
        store() {
            return Shopware.Store.get('generic-store');
        },
    },
    beforeRouteEnter(_, _2, next) {
        next((vm) => {
            vm.store.$reset();
        });
    },
});
</script>
