import { type ReactNode } from 'react';

interface BottomCTAProps {
  children: ReactNode;
}

const BottomCTA = ({ children }: BottomCTAProps) => {
  return (
    <div className="fixed bottom-0 left-1/2 z-10 w-full max-w-110 -translate-x-1/2 px-7.5 py-4">
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
};

export default BottomCTA;
