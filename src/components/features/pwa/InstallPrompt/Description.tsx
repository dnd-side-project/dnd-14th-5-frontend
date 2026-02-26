import { type ReactNode } from 'react';

interface DescriptionProps {
  id: number;
  children: ReactNode;
}

const Description = ({ id, children }: DescriptionProps) => {
  return (
    <li className="flex items-center gap-3">
      <span className="shrink-0 w-6 h-6 rounded-full bg-g-600 flex items-center justify-center font-bold text-g-0">
        {id}
      </span>
      <span>{children}</span>
    </li>
  );
};

export default Description;
