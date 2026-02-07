import { type ChangeEvent } from 'react';

interface RadioProps {
  label: string;
  value: string | number;
  name: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Radio = ({ label, value, name, checked, onChange }: RadioProps) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="radio"
        className="appearance-none h-5 w-5 border border-g-60 rounded-sm bg-g-40 checked:bg-g-400 checked:border-g-400 shrink-0 cursor-pointer border-none"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="ml-2 text-gray-700">{label}</span>
    </label>
  );
};

export default Radio;
