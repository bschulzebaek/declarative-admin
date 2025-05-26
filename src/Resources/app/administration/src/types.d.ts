import type ModuleConfigRegistry from './core/ModuleConfigRegistry';

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

declare global {
    interface Window {
        Shopware: typeof Shopware;
    }

    const Shopware: Shopware & {
        Mixin: {
            register: <T>(name: string, mixin: T) => T;
        };
        ModuleConfig: ModuleConfigRegistry;
        EntityDefinition: {
            get: (entityName: any) => any;
        };
        Store: {
            get: (name: string) => any;
        };
    }
}
