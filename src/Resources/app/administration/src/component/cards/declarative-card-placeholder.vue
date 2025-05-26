<script lang="ts">
export default Shopware.Component.wrapComponentConfig({
    props: {
        title: {
            type: String,
            default: 'PLACEHOLDER'
        },
        subtitle: {
            type: String,
            required: false,
        },
        message: {
            type: String,
            default: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
        },
    },
});
</script>

<template>
    <mt-card :title="$t(title)">
        {{ message }}
    </mt-card>
</template>
