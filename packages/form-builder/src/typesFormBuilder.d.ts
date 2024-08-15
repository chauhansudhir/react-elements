import { ReactElement, SyntheticEvent } from "react";

export type TChangeEventType = SyntheticEvent<
  HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
>;

export type TFormTarget = {
  id: string | number;
  name: string | number;
  value: string | number | undefined;
  type: string;
  checked: boolean;
};
export type TOptions = {
  label: string | number;
  value: string | number;
};

export type TComponentMap = {
  [key: string | number]: ReactElement | JSXElementConstructor;
};

export type TAttrs = {
  [key: string]: string | number | boolean;
};
export type TFormData = {
  [key: string | number]: Array<string | number> | string | number | boolean;
};

export type TFormConfig = {
  element: string;
  label?: string;
  attrs?: TAttrs;
  options?: Array<TOptions>;
  elements?: Array<TFormConfig>;
  multiple?: true | false;
};

export interface IFormControls extends TFormConfig {
  onChange: (e: SyntheticEvent<HTMLFormElement>) => void;
}
export interface IFormBuilder {
  config: TFormConfig;
  formAttrs: { [key: string]: string | object | number };
  onChange?: (e: TChangeEventType, config?: TFormConfig) => void;
  onSubmit?: (e: SyntheticEvent<HTMLFormElement>) => void | boolean;
  componentMap: TComponentMap;
}

export interface IFormElement
  extends Pick<IFormBuilder, "config" | "onChange" | "componentMap"> {}

export interface IOption {
  option: TOptions;
  selected: true | false;
}
