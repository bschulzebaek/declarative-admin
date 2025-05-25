import { type ModuleDefinition } from './ModuleDefinition';

export default class ModuleConfigRegistry {
    private registry = new Map<string, ModuleDefinition>();

    public add(definition: ModuleDefinition) {
        this.registry.set(definition.id, definition);
    }

    public getModuleByRoute(name: string) {
        const moduleId = this.routeNameToModuleId(name);

        if (!this.registry.has(moduleId)) {
            throw new Error(`Module definition for ${moduleId} not found.`);
        }

        return this.registry.get(moduleId)!;
    }

    public getPageByRoute(name: string) {
        const definition = this.getModuleByRoute(name);
        const pageName = this.routeNameToPageName(name);
        const pageConfig = definition.pages.find((page) => page.name === pageName);

        if (!pageConfig) {
            throw new Error(`Page definition for ${pageName} not found in module ${definition.id}.`);
        }

        return pageConfig;
    }

    private routeNameToModuleId(name: string): string {
        const [vendor, module] = name.split('.').slice(0, 2);
        return `${vendor}-${module}`;
    }

    private routeNameToPageName(name: string): string {
        const parts = name.split('.');

        return parts[2];
    }
}
