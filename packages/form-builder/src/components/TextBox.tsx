import { useContext, useId, useMemo } from "react";
import { FormDataContext } from "../formContexts";
import { IFormBuilder, TChangeEventType, TFormData } from "../typesFormBuilder";


const TYPE_RADIO = 'radio';
const TYPE_CHECKBOX = 'checkbox';


const TextBox: React.FC<IFormBuilder> = ({ config, onChange, ...rest }: Omit<IFormBuilder, "onSubmit">) => {
    const data = useContext<TFormData>(FormDataContext);
    const { label, multiple, attrs } = config;

    const inputAtrs = attrs || {}
    const { type } = inputAtrs;

    const value = inputAtrs.value as string;
    const id = inputAtrs.id as string;
    const name = inputAtrs.name as string;

    const userInput = (data[id] || data[name]);

    const uId = `${id || useId()}`;

    const valueProps = useMemo(() => {
        let checkedStatus = false;
        if (type === TYPE_CHECKBOX) {
            if (multiple) {
                checkedStatus = typeof userInput === 'object' && userInput !== null ? userInput.includes(value) : false;
            } else {
                checkedStatus = userInput === value
            }

            return {
                checked: checkedStatus,
                value: `${value}`
            }
        } else if (type === TYPE_RADIO) {
            return {
                checked: value === userInput, value: `${value}`
            }
        } else {
            return { value: `${userInput || value}` }
        }
    }, [value, type, userInput])

    const onInputChange = (e: TChangeEventType) => {
        onChange ? onChange(e, config) : null
    }

    return (
        <div className={`element-row ${type} ${name}_box`}>
            <label htmlFor={uId}>{label}</label>
            <input id={`${uId}`}
                name={`${name}`}
                autoComplete="off"
                onChange={onInputChange}
                {...rest}
                {...inputAtrs}
                {...valueProps}
            />
        </div>
    )
}

export default TextBox;