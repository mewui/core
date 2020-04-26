export interface BindingOptions {
  type: string;
  binding: {
    event: string;
    attribute?: string;
    value?: string;
    queryString?: string;
  };
  processTemplate: () => {};
}

export interface Binding {
  type: string;
  data: {
    event: string;
    attribute?: string;
    value?: string;
    queryString?: string;
  };
}
