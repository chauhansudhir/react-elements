import { useContext } from "react";
import Label from "./Label";
import { FormDataContext } from "../formContexts";
import { IFormBuilder, IOption, TFormData } from "../typesFormBuilder";


const Option: React.FC<IOption> = ({ option, selected }: IOption) => {
  const selectedOption = selected ? { selected: true } : {};

  return <option value={option.value} {...selectedOption}>{option.label}</option>
}

const Select: React.FC<IFormBuilder> = ({
  config,
  onChange,
}: IFormBuilder) => {
  const { attrs, options } = config
  const data = useContext<TFormData>(FormDataContext);

  const inputAtrs = attrs || {}
  const id = inputAtrs.id as string;
  const name = inputAtrs.name as string;

  const selected = (data[id] || data[name] || (attrs?.multiple ? [] : '')) as Array<string | number> | string | number;

  const isSelected = (value: string | number) => {

    if (Array.isArray(selected)) {
      return selected.includes(value);
    } else {
      return selected === value;
    }
  }

  return (
    <div>
      <Label config={config} />
      <select {...attrs} onChange={onChange}>
        {(options || []).map((x, i) => <Option option={x} selected={isSelected(x.value)} key={x.value || i} />)}
      </select>
    </div>
  )
}

export default Select;