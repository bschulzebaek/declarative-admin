import { ModuleTypes } from 'src/core/factory/module.factory';

type ModulePresentation = {
    color?: string;
    icon?: string;
    favicon?: string;
};

type ModuleNavigation = {
    moduleType?: ModuleTypes;
    parent?: string;
    id: string;
    path?: string;
    link?: string;
    label?: string;
    position?: number;
    privilege?: string;
    color?: string;
    icon?: string;
};

type RouteComponentConfig = {
    name: string;
    path?: string;
    meta?: Record<string, any>;
    component: string;
    config?: Record<string, any>;
}

type ModulePage = RouteComponentConfig & {
    views?: RouteComponentConfig[];
    associations?: string[];
};

type ModuleDefinition = {
    id: string;
    title: string;
    description?: string;
    type: ModuleTypes;
    entity?: keyof EntitySchema.Entities;
    presentation?: ModulePresentation;
    navigation?: ModuleNavigation[];
    pages: ModulePage[];
};

export {
    type ModuleDefinition,
    type ModulePage,
}
