import { SyntheticEvent, useCallback, useMemo, useReducer } from "react";
import { FormDataContext } from "./formContexts";
import FormBuilder from "./FormBuilder";
import { FORM_CONFIG } from "./config";
import { TChangeEventType, TComponentMap, TFormConfig, TFormData } from "./typesFormBuilder";

const COMPONENTS_MAP = {};

const DEFAULT_VALUES: TFormData = {
  first_name: 'user name',
  last_name: 'user last name',
  gender: 'male',
  sports: ['volleyball'],
  pet: "dog",
  description: "test desc",
  valid_status: false
}

function reducer(state: TFormData, action: any) {
  switch (action.type) {
    case 'update': {
      const oldValue = state
      const { name, type, value, checked, multiple } = action.payload;

      if (type === 'checkbox') {
        if (multiple) {
          oldValue[name] ||= [];
          let values = oldValue[name] as Array<string | number>;
          if (checked) {
            values.push(value)
          } else {
            values = values.filter(x => x !== value);
          }
          oldValue[name] = [...new Set(values)];
        } else {
          oldValue[name] = checked ? value : '';
        }
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

  const updateData = useCallback((e: TChangeEventType, conf?: TFormConfig): void => {

    const { name, value, type, checked } = e.target as TComponentMap;
    const multiple: boolean = conf?.multiple === true;

    dispatch({
      type: 'update',
      payload: { name, value, type, checked, multiple }
    });
  }, []);

  return { data, updateData };
}


export default () => {
  const { data, updateData } = useFormState();

  const onChange = useCallback((e: TChangeEventType, conf?: TFormConfig) => {
    updateData(e, conf)
  }, [])

  const onSubmit = useCallback((form: FormData) => {
    const firstName = form.get('first_name');
    const lastname = form.get('last_name')
    const gender = form.get('gender')
    console.log({ firstName, lastname, gender })
  }, []);

  const formAttrs = useMemo(() => ({}), [])

  return (
    <div>
      <h1 style={{ color: '#000' }}>Form Builder</h1>

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
    </div>
  )
}