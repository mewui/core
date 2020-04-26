import { EventHandler } from '../events';

export interface MewComponentOptionsWithoutTemplate {
  events?: {
    [key: string]: EventHandler;
  };
}

export interface MewComponentOptions extends MewComponentOptionsWithoutTemplate {
  template?: string;
}

export interface MewComponentInstanceOptions {
  events?: {
    [key: string]: EventHandler;
  };
}
