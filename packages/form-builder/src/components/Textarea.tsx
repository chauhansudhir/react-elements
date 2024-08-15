import { useContext, useId } from "react";
import { FormDataContext } from "../formContexts";
import { IFormBuilder, TFormData } from "../typesFormBuilder";

const Textarea: React.FC<IFormBuilder> = ({ config, onChange, ...rest }: Omit<IFormBuilder, "onSubmit">) => {
    const data = useContext<TFormData>(FormDataContext);

    const { label, attrs } = config;

    const inputAtrs = (attrs || {});

    const value = inputAtrs;
    const id = inputAtrs.id as string;
    const name = inputAtrs.name as string;


    const userInput = (data[id] || data[name] || value) as string;

    const uId = `${id || useId()}`;

    return (
        <div className={`element-row textarea ${name}_box`}>
            <label htmlFor={uId}>{label}</label>
            <textarea id={uId}
                name={`${name}`}
                autoComplete="off"
                onChange={onChange}
                {...rest}
                {...inputAtrs}
                value={userInput}
            />
        </div>
    )
}

export default Textarea;