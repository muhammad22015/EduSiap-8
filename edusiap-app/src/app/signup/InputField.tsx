import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  id: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, placeholder, id }) => {
  return (
    <div className="relative mb-5">
      <label htmlFor={id} className="mb-1.5 text-sm text-black">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="p-2.5 w-full text-xs rounded-xl border border-solid border-zinc-400 text-neutral-700"
        />
      </div>
    </div>
  );
};

export default InputField;