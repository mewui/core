import { EventHandler } from '../events';

export interface MewComponentOptionsWithoutTemplateProxy {
  events: {
    [key: string]: EventHandler;
  };
}

export interface MewComponentOptionsProxy extends MewComponentOptionsWithoutTemplateProxy {
  template: string;
}

export interface MewComponentInstanceOptionsProxy {
  events: {
    [key: string]: EventHandler;
  };
}
