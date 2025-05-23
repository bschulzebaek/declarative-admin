declare module '*.yaml?raw' {
    const content: string;
    export default content;
}

declare module '*.html.twig' {
    const content: string;

    export default content;
}

declare module '*.html?raw' {
    const content: string;

    export default content;
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue';

    const component: DefineComponent<{}, {}, any>;
    export default component;
}
