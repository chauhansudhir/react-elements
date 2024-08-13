import { useContext, useId, useMemo } from "react";
import { FormDataContext } from "../formContexts";
import { IFormBuilder, TFormData } from "../typesFormBuilder";


const TYPE_RADIO = 'radio';
const TYPE_CHECKBOX = 'checkbox';


const TextBox: React.FC<IFormBuilder> = ({ config, onChange, ...rest }: Omit<IFormBuilder, "onSubmit">) => {

    const data = useContext<TFormData>(FormDataContext);

    const { label, attrs } = config;
    const inputAtrs = attrs || {}
    const { id, name, value, type } = inputAtrs;

    const userInput = (data[id] || data[name]) as string;

    const uId = `${id || useId()}`;

    const valueProps = useMemo(() => {
        if (type === TYPE_CHECKBOX) {
            return { checked: (userInput || []).includes(value), value }
        } else if (type === TYPE_RADIO) {
            return { checked: value === userInput, value }
        } else {
            return { value: userInput || value }
        }
    }, [value, type, userInput])


    return (
        <div className={`element-row ${type} ${name}_box`}>
            <label htmlFor={uId}>{label}</label>
            <input id={uId}
                name={`${name}`}
                autoComplete="off"
                onChange={onChange}
                {...rest}
                {...inputAtrs}
                {...valueProps}
            />
        </div>
    )
}

export default TextBox;