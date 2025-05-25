import { parse } from 'yaml';
import ModuleParser from '../core/ModuleParser';
import ModuleConfigRegistry from '../core/ModuleConfigRegistry';
import { type ModuleDefinition } from '../core/ModuleDefinition';

import Dashboard from './dashboard.module.yaml?raw';
import Product from './product.module.yaml?raw';
import Promotion from './promotion.module.yaml?raw';
import Customer from './customer.module.yaml?raw';
import Reviews from './review.module.yaml?raw';

const modules = [
    parse(Dashboard),
    parse(Product),
    parse(Customer),
    parse(Promotion),
    parse(Reviews),
] as ModuleDefinition[];

// @ts-ignore
Shopware.ModuleConfig = new ModuleConfigRegistry();

const moduleParser = new ModuleParser();

modules.forEach(moduleParser.register);
