import { SyntheticEvent, useCallback, useMemo, useReducer, useState } from "react";
import { FormDataContext } from "./formContexts";
import FormBuilder from "./FormBuilder";
import { FORM_CONFIG } from "./config";
import { TChangeEventType, TComponentMap, TFormData } from "./typesFormBuilder";

const COMPONENTS_MAP = {};

const DEFAULT_VALUES: TFormData = {
  first_name: 'user name',
  last_name: 'user last name',
  gender: 'male',
  sports: ['volleyball'],
  pet: "dog",
  description: "test desc"
}

function reducer(state: TFormData, action: any) {
  switch (action.type) {
    case 'update': {
      const oldValue = state
      const { name, type, value, checked } = action.payload;
      if (type === 'checkbox') {
        oldValue[name] ||= [];
        let values = oldValue[name];
        if (checked) {
          values.push(value)
        } else {
          values = values.filter(x => x !== value);
        }
        oldValue[name] = [...new Set(values)]
      } else {
        oldValue[name] = value
      }

      return { ...oldValue };
    }
  }
  throw Error('Unknown action: ' + action.type);
}


function useFormState() {

  const [data, dispatch] = useReducer(reducer, DEFAULT_VALUES);

  const setData = useCallback(({ target }: TChangeEventType): void => {
    const { name, value, type, checked } = target as TComponentMap;
    dispatch({
      type: 'update',
      payload: { name, value, type, checked }
    });
  }, []);

  return [data, setData];
}




export default () => {
  const [data, setData] = useFormState();

  const onChange = useCallback((e: TChangeEventType) => {
    setData(e)
  }, [])

  const onSubmit = useCallback((e: SyntheticEvent<HTMLFormElement>) => {

    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const firstName = form.get('first_name');
    const lastname = form.get('last_name')
    const gender = form.get('gender')
    console.log(firstName, lastname, gender)
  }, []);

  const formAttrs = useMemo(() => ({}), [])

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
      <div style={{ flex: 1 }}>
        <FormDataContext.Provider value={data} >
          <FormBuilder config={FORM_CONFIG} formAttrs={formAttrs} componentMap={COMPONENTS_MAP} onChange={onChange} onSubmit={onSubmit} />
        </FormDataContext.Provider >
      </div>
      <div style={{ width: 10 }}></div>
      <div>
        <pre>
          {JSON.stringify(data, null, 4)}
        </pre>
      </div>
    </div>
  )
}