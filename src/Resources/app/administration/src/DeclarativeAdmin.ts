import { ModuleManifest } from 'src/core/factory/module.factory';

type CustomManifest = ModuleManifest & {
    id: string;
}

type DefaultRouteName = 'list' | 'detail' | 'create';
type DefaultViewName = 'view';

const defaultComponents: Record<DefaultRouteName | DefaultViewName, string> = {
    list: 'sw-declarative-list-wrapper',
    detail: 'sw-declarative-detail',
    create: 'sw-declarative-detail',
    view: 'sw-declarative-view',
};

const defaultRoutePaths: Record<string, string> = {
    index: 'index',
    detail: 'detail/:id?',
};


export default class DeclarativeAdmin {
    private definitions = new Map<string, ModuleManifest>();

    constructor() {
        // @ts-ignore
        Shopware.Declarative = this;
    }

    public register = (manifest: CustomManifest) => {
        console.groupCollapsed('DeclarativeAdmin.register', manifest.name);

        this.parseRoutes(manifest);
        this.parseNavigation(manifest);

        this.definitions.set(manifest.id, manifest);
        const cloned = structuredClone(manifest);

        this.addPropHandler(cloned);

        Shopware.Module.register(manifest.id, cloned);

        console.log('Custom manifest', manifest);
        console.log('Module config', cloned);
        console.groupEnd();
    }

    private parseRoutes(manifest: CustomManifest) {
        if (!manifest.routes) {
            return;
        }

        Object.keys(manifest.routes).forEach((routeName) => {
            const route = manifest.routes[routeName];

            route.fullName = this.getFullName(manifest.id, routeName);

            if (!route.path) {
                route.path =  defaultRoutePaths[routeName] ?? routeName;
            }

            if (!route.component) {
                const component = defaultComponents[routeName];

                if (!component) {
                    throw new Error(`Route ${routeName} does not have a component defined`);
                }

                route.component = component;
            }

            if (route.children) {
                Object.entries(route.children).forEach(([name, child]) => {
                    child.fullName = this.getFullName(manifest.id, routeName, name);

                    if (!child.path) {
                        child.path =  name;
                    }

                    if (!child.component) {
                        child.component = defaultComponents['view'];
                    }

                    if (!child.props) {
                        child.props = {};
                    }

                    child.props['is-loading'] = false;
                    child.props['entity'] = false;
                });
            }
        });
    }

    private addPropHandler(manifest: CustomManifest) {
        if (!manifest.routes) {
            return;
        }

        Object.keys(manifest.routes).forEach((routeName) => {
            const route = manifest.routes[routeName];

            if (route.name === 'detail') {
                route.props = (routeTo) => {
                    const id = routeTo.params.id;

                    return {
                        entityId: id,
                    };
                };
            }
        });
    }

    private parseNavigation(manifest: CustomManifest) {
        // config.navigation = [];
        //
        // module.navigation.forEach((item) => {
        //     config.navigation!.push(this.toNavigationConfig(item));
        // });
    }

    public getDefinitionByRouteName = (name: string) => {
        const definitionName = name.split('.').slice(0, 2).join('-');

        if (!this.definitions.has(definitionName)) {
            throw new Error(`Module definition for ${definitionName} not found`);
        }

        return this.definitions.get(definitionName)!;
    }

    public getRouteConfigForRoute = (name: string) => {
        const parts = name.split('.');
        const routeName = parts[2];

        const definition = this.getDefinitionByRouteName(name);

        const route = definition.routes![routeName]!;

        if (!route) {
            throw new Error(`Route ${name} not found in module ${definition.name}`);
        }

        return route;
    }

    public getViewDefinitionByRouteName(name: string) {
        const routeConfig = this.getRouteConfigForRoute(name);
        const config = Object.values(routeConfig.children).find((child) => {
            if (child.fullName === name) {
                return true;
            }
        });

        if (!config) {
            throw new Error(`View definition for ${name} not found`);
        }

        return config;
    }

    private getFullName(...parts: string[]) {
        return parts.join('.').replace(/[^\w\s]/gi, '.');
    }
}
