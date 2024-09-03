import { useState } from "react";


export function useForm<T extends Record<string, any>>(initialState: T) {
    const [values, setValues] = useState<T>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  };
  return { values, handleChange, setValues };
}
