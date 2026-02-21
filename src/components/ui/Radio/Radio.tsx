import { type ChangeEvent } from 'react';

import { cn } from '@/src/lib/helpers/cn';

interface RadioProps {
  children: string;
  value: string | number;
  name: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Radio = ({ children, value, name, checked, onChange }: RadioProps) => {
  return (
    <label
      className={cn(
        'inline-flex items-center justify-center cursor-pointer gap-2 p-3 rounded-2xl w-full border-2',
        checked ? 'bg-g-100 border-g-0' : 'bg-g-300 border-transparent',
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="text-g-0">{children}</span>
    </label>
  );
};

export default Radio;
