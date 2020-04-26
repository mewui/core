import { BindingOptions, Binding } from './binding';
import { generateBindingId } from '../utilities/index';
import { MewComponentOptionsProxy } from './component-options-proxies';
import { ParsedComponent } from './parsed-component';

export const regexes = {
  attributeBindings: /(?<fullString>@(?<attribute>[^on]\w+)="(?<value>.*?)")/g,
  displayBindings: /(?<fullString>@(?<display>\w+\.\w+))/g,
  eventBindings: /(?<fullString>@on(?<event>\w+)="(?<expression>.*?)")/g,
};

type GenericObject = { [key: string]: string };

export const factories = {
  attribute: (options: MewComponentOptionsProxy) => (id: number, matchedGroups: GenericObject): BindingOptions => {
    const { attribute, value } = matchedGroups;
    const selector = `data-${attribute}-binding-id="${id}"`;

    return {
      type: 'attribute',
      binding: { attribute, value, queryString: `[${selector}]` },
      processTemplate: () => {
        options.template = options.template.replace(matchedGroups.fullString, selector);
      },
    } as BindingOptions;
  },
  display: (options: MewComponentOptionsProxy) => (id: number, matchedGroups: GenericObject): BindingOptions => {
    const selector = `data-display-binding-id="${id}"`;

    return {
      type: 'display',
      binding: {
        value: matchedGroups.display,
        queryString: `[${selector}]`,
      },
      processTemplate: () => {
        options.template = options.template.replace(matchedGroups.fullString, `<span ${selector}></span>`);
      },
    } as BindingOptions;
  },
  event: (options: MewComponentOptionsProxy) => (id: number, matchedGroups: GenericObject): BindingOptions => {
    const { event, expression } = matchedGroups;
    const selector = `data-${event}-event-binding-id-${id}="${id}"`;

    return {
      type: 'event',
      binding: { event, value: expression, queryString: `[${selector}]` },
      processTemplate: () => {
        options.template = options.template.replace(matchedGroups.fullString, selector);
      },
    } as BindingOptions;
  },
};

export const createAndRegisterBindings = (
  regex: RegExp,
  template: string,
  factory: (id: number, matchedGroups: GenericObject) => BindingOptions,
  bindings: {
    [id: number]: Binding;
  },
): void => {
  const matches = template.matchAll(regex);

  for (const match of matches) {
    const bindingId = generateBindingId();
    const matchedGroups = match.groups;
    const options = factory(bindingId, matchedGroups || {});

    options.processTemplate();

    bindings[bindingId] = {
      type: options.type,
      data: options.binding,
    };
  }
};

export const parse = (name: string, options: MewComponentOptionsProxy): ParsedComponent => {
  const bindings: {
    [id: number]: Binding;
  } = {};

  createAndRegisterBindings(regexes.attributeBindings, options.template, factories.attribute(options), bindings);

  createAndRegisterBindings(regexes.displayBindings, options.template, factories.display(options), bindings);

  createAndRegisterBindings(regexes.eventBindings, options.template, factories.event(options), bindings);

  return { name, bindings, options };
};

export const instantiateHtmlFromTemplate = (template: string): HTMLElement => {
  const div = document.createElement('div');
  div.innerHTML = template;
  return div.firstElementChild as HTMLElement;
};
