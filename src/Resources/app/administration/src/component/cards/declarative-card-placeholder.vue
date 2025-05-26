<script lang="ts">
export default Shopware.Component.wrapComponentConfig({
    props: {
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: false,
        },
        message: {
            type: String,
            required: true,
        },
    },
});
</script>

<template>
    <mt-card :title="$t(title)">
        {{ message }}
    </mt-card>
</template>
