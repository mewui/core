import {
  MewComponent,
  MewComponentInstance,
  MewComponentOptions,
  MewComponentOptionsProxy,
  MewComponentOptionsWithoutTemplate,
} from './components';

const component = (name: string, options?: MewComponentOptions): MewComponent => {
  const defaultOptions: MewComponentOptionsProxy = {
    template: '',
    events: {},
  };
  return new MewComponent(name, {
    ...defaultOptions,
    ...(options || {}),
  });
};

const fromTemplate = (selector: string, options?: MewComponentOptionsWithoutTemplate): MewComponent => {
  const $template = document.querySelector(selector);
  const name = $template?.getAttribute('id') || 'Unnamed Component';

  const componentOptions = {
    ...(options || {}),
    template: $template?.innerHTML || `### Could Not Load Template for ${name} ###`,
  };

  return component(name, componentOptions as MewComponentOptions) as MewComponent;
};

const render = (selector: string, components: MewComponentInstance[]): void => {
  components.forEach((component) => document.querySelector(selector)?.append(component.$el));
};

export { component, fromTemplate, render };
