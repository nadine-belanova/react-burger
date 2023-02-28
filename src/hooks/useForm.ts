import { useState, ChangeEvent } from 'react';

export function useForm(inputValues: { [name: string]: string }) {
  const [formValues, setValues] = useState(inputValues);

  const handleFormInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...formValues, [name]: value });
  };

  return { formValues, handleFormInputChange, setValues };
}
