import { parse } from 'yaml';
import PromotionModuleDefinition from './promotion.module.yaml?raw';
import CustomerModuleDefinition from './customer.module.yaml?raw';

const modules = [
    parse(PromotionModuleDefinition),
    parse(CustomerModuleDefinition),
];

export default modules;
