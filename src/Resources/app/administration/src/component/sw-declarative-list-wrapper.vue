<script lang="ts">
/**
 * vue-router is keeping the component instance alive if the target route uses the same component.
 * Using the key here to force a new instance instead of resetting states manually.
 */
export default Shopware.Component.wrapComponentConfig({
    template: '<sw-declarative-list :key="$route.name" />',
});
</script>
