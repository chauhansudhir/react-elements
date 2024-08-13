import { ReactElement, SyntheticEvent } from "react";

export type TChangeEventType = SyntheticEvent<
  HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
>;
export type TOptions = {
  label: string | number;
  value: string | number;
};

export type TComponentMap = {
  [key: string]: ReactElement | JSXElementConstructor;
};

export type TFormData = {
  [key: string]: Array<string | number> | string | number | boolean;
};

export type TFormConfig = {
  element: string;
  label?: string;
  attrs?: { [key: string]: string | number };
  options?: Array<TOptions>;
  elements?: Array<TFormConfig>;
};

export interface IFormControls extends TFormConfig {
  onChange: (e: SyntheticEvent<HTMLFormElement>) => void;
}
export interface IFormBuilder {
  config: TFormConfig;
  formAttrs: { [key: string]: string | object | number };
  onChange?: (e: TChangeEventType) => void;
  onSubmit?: (e: SyntheticEvent<HTMLFormElement>) => void | boolean;
  componentMap: TComponentMap;
}

export interface IFormElement
  extends Pick<IFormBuilder, "config" | "onChange" | "componentMap"> {}

export interface IOption {
  option: TOptions;
  selected: true | false;
}
