import { buildResources } from './build-resources';
import { RootModule } from '../../../modules';

const locales = RootModule.locales ?? {};

export const resources = buildResources(locales);
