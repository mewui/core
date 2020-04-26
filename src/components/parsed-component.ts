import { Binding } from './binding';
import { MewComponentOptionsProxy } from './component-options-proxies';

export interface ParsedComponent {
  name: string;
  bindings: {
    [id: string]: Binding;
  };
  options: MewComponentOptionsProxy;
}
