export type Dictionary = {
  [key: string]: string | Dictionary;
};

export type NamespaceResources = {
  [languageCode: string]: Dictionary;
};

export type AppLocales = {
  [languageCode: string]: NamespaceResources;
};
