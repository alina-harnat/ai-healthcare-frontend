import type { Module } from '../../modules/common/types/module';

export interface DiscoveredModule {
  file: string;
  modulePath: string;
}

export type LoadedModule = DiscoveredModule & {
  module: Module;
};

export type GeneratedFile = {
  path: string;
  content: string;
};
