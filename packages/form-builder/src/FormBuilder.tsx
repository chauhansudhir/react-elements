import { ForwardedRef, forwardRef, useCallback, useMemo } from "react";
import TextBox from "./components/TextBox";
import Label from "./components/Label";
import Select from "./components/Select";
import Textarea from "./components/Textarea";
import { IFormBuilder, TChangeEventType, TComponentMap, TFormConfig } from './typesFormBuilder'


const CustomComponentMap: TComponentMap = {
  input: TextBox,
  label: Label,
  select: Select,
  textarea: Textarea
};


const getElement = (elementName: string, componentMap: TComponentMap = {}) => {
  return componentMap[elementName] || CustomComponentMap[elementName];
}

const FormElement: React.FC<Partial<IFormBuilder>> = ({ config, onChange, componentMap }: Partial<IFormBuilder>) => {
  if (!config || !config.element) return null;

  const { element, elements = [], attrs = {}, options = [], ...compProps } = config;

  const CustomComp = getElement(element, componentMap);
  const Component = (CustomComp || element);

  const formattedCompProps = CustomComp ? { config, onChange, } : {}

  return elements.length === 0 ? (<Component {...formattedCompProps} />) : (
    <Component {...formattedCompProps}>
      {config.label}
      {elements.map((childConfig: TFormConfig, i: number) => <FormElement key={i} config={childConfig} onChange={onChange} componentMap={componentMap} />)}
    </Component>
  )
}

/**
 * 
 * @param param0 
 * @returns 
 */
const FormBuilder: React.FC<IFormBuilder> = forwardRef<HTMLFormElement, IFormBuilder>((props: IFormBuilder, ref: ForwardedRef<HTMLFormElement>) => {
  const { config, formAttrs, onChange, onSubmit, componentMap } = props;

  const onDataChange = useCallback((e: TChangeEventType) => {
    onChange(e)
  }, [config]);

  return (
    <form {...formAttrs} onSubmit={onSubmit} ref={ref}>
      <FormElement config={config} componentMap={componentMap} onChange={onDataChange} />
    </form>
  )
});

export default FormBuilder;