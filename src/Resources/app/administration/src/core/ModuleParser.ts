import type { ModuleDefinition, ModulePage } from './ModuleDefinition';
import { ModuleManifest, ModuleTypes } from 'src/core/factory/module.factory';
import type { App } from 'vue';
import type { NavigationGuard, RouteRecordRedirectOption, RouterLinkProps } from 'vue-router';

type SwRouteConfig = {
    path: string;
    name?: string;
    component?: string | App<Element>;
    components?:
        | Record<string, App<Element>>
        | {
        default: string;
    };
    redirect?: RouteRecordRedirectOption;
    alias?: string | string[];
    children?: SwRouteConfig[] | Record<string, SwRouteConfig>;
    meta?: any;
    beforeEnter?: NavigationGuard;
    props?: boolean | object | RouterLinkProps;
    caseSensitive?: boolean;
    coreRoute?: boolean;
    type?: ModuleTypes;
    flag?: string;
    routeKey?: string;
    isChildren?: boolean;
};

export default class ModuleParser {
    static PAGE_COMPONENT = 'sw-declarative-wrapper';

    public register = (definition: ModuleDefinition) => {
        Shopware.ModuleConfig.add(definition);
        const manifest = this.buildModuleManifest(definition);

        Shopware.Module.register(definition.id, manifest);
    }

    private buildModuleManifest(definition: ModuleDefinition): ModuleManifest {
        const cloned = structuredClone(definition);

        return {
            name: cloned.id,
            title: cloned.title,

            description: cloned.description,

            type: cloned.type,
            color: cloned.presentation?.color,
            favicon: cloned.presentation?.favicon,
            icon: cloned.presentation?.icon,
            entity: cloned.entity,
            routes: this.transformPages(cloned.pages),
            navigation: cloned.navigation ?? [],
        };
    }

    private transformPages(pageDefinitions: ModulePage[]): { [key: string]: SwRouteConfig } {
        const pages: { [key: string]: SwRouteConfig } = {};

        pageDefinitions.forEach((page) => {
            const name = page.name;
            const _page = {
                name,
                path: page.path || name,
                component: page.component || ModuleParser.PAGE_COMPONENT,
                meta: page.meta,
            };

            this.getRouteHandler(_page);

            pages[name] = _page;
        });

        return pages;
    }

    private getRouteHandler(route: SwRouteConfig): void {
        if (!route.path.includes(':id')) {
            return;
        }

        route.props = (to: any) => {
            return {
                id: to.params.id,
            }
        };
    }
}
