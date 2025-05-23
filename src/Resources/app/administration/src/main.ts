import './compatibility/promotion';
import './compatibility/component-overrides';

import './component';
import modules from './module';
import DeclarativeAdmin from './DeclarativeAdmin';

const declarativeAdmin = new DeclarativeAdmin();

modules.forEach(declarativeAdmin.register);
