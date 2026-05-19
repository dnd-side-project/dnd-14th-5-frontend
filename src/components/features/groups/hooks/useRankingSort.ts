import { useEffect, useRef, useState } from 'react';

interface RankingSortOption<T extends string> {
  label: string;
  value: T;
}

interface UseRankingSortProps<T extends string> {
  options: readonly RankingSortOption<T>[];
  defaultValue?: T;
  onChange?: (value: T) => void;
}

export const useRankingSort = <T extends string>({
  options,
  defaultValue,
  onChange,
}: UseRankingSortProps<T>) => {
  const [selected, setSelected] = useState<T>(
    defaultValue ?? options[0]?.value,
  );
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find(
    (option) => option.value === selected,
  )?.label;

  const handleSelect = (value: T) => {
    setSelected(value);
    onChange?.(value);
    setIsOpen(false);
  };

  const toggleOpen = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return { ref, selected, selectedLabel, isOpen, toggleOpen, handleSelect };
};
