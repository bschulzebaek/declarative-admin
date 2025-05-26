<script lang="ts">
export default Shopware.Component.wrapComponentConfig({
    mixins: [
        Shopware.Mixin.getByName('generic-module'),
    ],
});
</script>

<template>
    <mt-button
        variant="primary"
        size="default"
        @click="$router.push({ name: createRoute })"
    >
        {{ $t('global.default.add') }} {{ moduleDefinition.entity }}
    </mt-button>
</template>
