import { useState } from 'react';

export function useForm(inputValues) {
  const [formValues, setValues] = useState(inputValues);

  const handleFormInputChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...formValues, [name]: value });
  };

  return { formValues, handleFormInputChange, setValues };
}
