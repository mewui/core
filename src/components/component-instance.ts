import { Binding } from './binding';
import { instantiateHtmlFromTemplate } from './utilities';
import { MewComponentInstanceOptionsProxy } from './component-options-proxies';
import { ParsedComponent } from './parsed-component';

type BindingCallback = (newValue: string) => void;

export class MewComponentInstance {
  $el: HTMLElement;

  private callbacks: {
    [key: string]: BindingCallback[];
  };

  constructor(private options: MewComponentInstanceOptionsProxy, private parsedComponent: ParsedComponent) {
    this.$el = instantiateHtmlFromTemplate(this.parsedComponent.options.template);
    this.callbacks = {};

    this.setupModelFromBindings();
    this.setupEventHandling();
  }

  private addModelFromBinding(binding: Binding): void {
    if (!binding.data.value) {
      throw new Error('Binding value is missing');
    }

    if (!binding.data.queryString) {
      throw new Error('Binding queryString is missing');
    }

    const bindingName: string = binding.data.value.split('.').slice(1).join('.');
    let bindingValue = Object.getOwnPropertyDescriptor(this, bindingName)?.value;
    const $el = this.$el.querySelector(binding.data.queryString);

    if (!$el) {
      throw new Error('Could not retrieve binding element');
    }

    this.callbacks[bindingName] = this.callbacks[bindingName] || [];
    this.callbacks[bindingName].push((newValue: string) => {
      if (binding.type === 'attribute') {
        if (!binding.data.attribute) {
          throw new Error('Binding attribute is missing');
        }

        $el.setAttribute(binding.data.attribute, newValue);
      } else if (binding.type === 'display') {
        $el.innerHTML = newValue;
      } else {
        console.error(binding);
        throw new Error('Unable to identify the type of reactive binding');
      }
    });

    if (!Object.prototype.hasOwnProperty.call(this, bindingName)) {
      Object.defineProperty(this, bindingName, {
        get: () => bindingValue,
        set: (newValue) => {
          bindingValue = newValue;
          this.callbacks[bindingName].forEach((callback: BindingCallback) => callback(bindingValue));
        },
      });
    }
  }

  private setupModelFromBindings(): void {
    Object.keys(this.parsedComponent.bindings)
      .map((id) => this.parsedComponent.bindings[id])
      .filter((binding) => binding.type !== 'event')
      .forEach((binding) => {
        this.addModelFromBinding(binding);
      });
  }

  private setupEventHandling(): void {
    const setEventHandlingFromBinding = (binding: Binding): void => {
      if (!binding.data.queryString) {
        throw new Error('Binding queryString is missing');
      }

      const emitRegex = /emit\('(?<name>.*?)', (?<data>.*?)\)/;
      const fromEvent = {
        name: binding.data.event,
        $el: this.$el.querySelector(binding.data.queryString),
      };

      if (binding === null || binding.data === null || binding.data.value === null) {
        throw new Error();
      }

      const toEvent = binding?.data?.value?.match(emitRegex)?.groups;

      if (toEvent?.name) {
        fromEvent?.$el?.addEventListener(toEvent?.name, (event: Event) => {
          Object.keys(this.parsedComponent.options.events)
            .map((key) => this.parsedComponent.options.events[key])
            .forEach((handler) => handler(event));
        });

        fromEvent?.$el?.addEventListener(fromEvent.name, () => {
          const customEvent = new CustomEvent(toEvent.name, {
            bubbles: true,
            detail: eval(toEvent.data.replace(this.parsedComponent.name, 'this')),
          });

          fromEvent?.$el?.dispatchEvent(customEvent);
        });
      }
    };

    Object.keys(this.parsedComponent.bindings)
      .map((id) => this.parsedComponent.bindings[id])
      .filter((binding) => binding.type === 'event')
      .forEach((binding) => setEventHandlingFromBinding(binding));
  }
}
