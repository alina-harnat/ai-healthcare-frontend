import type { AppLocales, Dictionary } from '../../../modules/common/types';

export type IInputLocales = {
  [namespace: string]: {
    [lang: string]: Dictionary;
  };
};

export function buildResources(locales: IInputLocales): AppLocales {
  const resources: AppLocales = {};

  Object.entries(locales).forEach(([namespace, namespaceLocales]) => {
    addNamespaceLocales(resources, namespace, namespaceLocales);
  });

  return resources;
}

function addNamespaceLocales(
  resources: AppLocales,
  namespace: string,
  locales: { [lang: string]: Dictionary },
): void {
  Object.entries(locales).forEach(([lang, dictionary]) => {
    resources[lang] ??= {};

    resources[lang][namespace] = dictionary;
  });
}
