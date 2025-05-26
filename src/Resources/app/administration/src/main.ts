import { parse } from 'yaml';
import './mixin/generic-module.mixin';
import './component';

import ModuleParser from './core/ModuleParser';
import ModuleConfigRegistry from './core/ModuleConfigRegistry';
import { type ModuleDefinition } from './core/ModuleDefinition';

Shopware.ModuleConfig = new ModuleConfigRegistry();

const moduleParser = new ModuleParser();

const moduleFiles: Record<string, string> = import.meta.glob('../../../../../module-definitions/*.module.yaml', {
    as: 'raw',
    eager: true
});

Object.values(moduleFiles).forEach((moduleContent) => {
    const moduleDefinition = parse(moduleContent) as ModuleDefinition;
    moduleParser.register(moduleDefinition);
});
