import { ForwardedRef, forwardRef, SyntheticEvent, useCallback } from "react";
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

  const { element, elements = [] } = config;

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

  const onDataChange = useCallback((e: TChangeEventType, conf?: TFormConfig) => {
    onChange ? onChange(e, conf) : null;
  }, [config]);

  const handleFormSubmit = useCallback((e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();
    const target = e.target as HTMLFormElement;
    const elements = target?.elements

    for (let i = 0; i < elements.length; i++) {
      const elem = elements[i];
      const { name, value, checked, type } = elem as HTMLInputElement;

      switch (type) {
        case 'checkbox':
        case 'radio':
          checked ? form.append(name, value) : null
          break;
        case 'select-one':
        case 'textarea':
          form.append(name, value)
          break;

      }
      form.append(name, value);
    }


    onSubmit ? onSubmit(form) : null;
  }, [config])

  return (
    <form {...formAttrs} onSubmit={handleFormSubmit} ref={ref}>
      <FormElement config={config} componentMap={componentMap} onChange={onDataChange} />
    </form>
  )
});

export default FormBuilder;