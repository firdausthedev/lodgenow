import React, { InputHTMLAttributes, SelectHTMLAttributes } from "react";

interface FormLabelProps {
  htmlFor: string;
  label: string;
  id: string;
}

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

export const FormLabel = ({ htmlFor, label, id }: FormLabelProps) => (
  <div className="flex justify-between">
    <label
      className="block text-marine-blue text-base font-medium mb-1 capitalize"
      htmlFor={htmlFor}
      id={id}>
      {label}
    </label>
  </div>
);

export const FormInput = ({ id, ...rest }: FormInputProps) => (
  <div>
    <input
      className="appearance-none border border-gray-300 rounded-md w-full p-3 text-gray-600 leading-tight font-normal font-secondary"
      id={id}
      {...rest}
    />
  </div>
);

export const SelectInput = ({ options, ...rest }: SelectInputProps) => (
  <div>
    <select
      className="appearance-none border border-gray-300 rounded-md w-full p-3 text-gray-600 leading-tight font-normal font-secondary"
      {...rest}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
