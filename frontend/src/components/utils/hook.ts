import { useState, ChangeEvent } from "react";

interface FormChangeProps {
  [key: string]: string;
}

export const useFormChange = (initialValues: FormChangeProps) => {
  const [values, setValues] = useState<FormChangeProps>(initialValues);
  const [changed, setChanged] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setChanged(true);
  };

  const resetValues = () => {
    setValues(initialValues);
  };

  const resetChanged = () => setChanged(false);

  return {
    values,
    handleChange,
    resetValues,
    changed,
    resetChanged,
  };
};
