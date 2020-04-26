import { MewComponentOptionsProxy, MewComponentInstanceOptionsProxy } from './component-options-proxies';
import { ParsedComponent } from './parsed-component';
import { parse } from './utilities';
import { MewComponentInstance } from './component-instance';

export class MewComponent {
  private parsedComponent: ParsedComponent;

  constructor(private name: string, private options: MewComponentOptionsProxy) {
    this.parsedComponent = parse(this.name, this.options);
  }

  instance(options?: MewComponentInstanceOptionsProxy): MewComponentInstance {
    const defaultOptions: MewComponentInstanceOptionsProxy = {
      events: {},
    };

    return new MewComponentInstance(
      {
        ...defaultOptions,
        ...(options || {}),
      },
      this.parsedComponent,
    );
  }
}
