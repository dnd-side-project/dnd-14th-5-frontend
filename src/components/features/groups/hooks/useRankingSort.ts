import { useEffect, useRef, useState } from 'react';

interface RankingSortOption<T extends string> {
  label: string;
  value: T;
}

interface UseRankingSortProps<T extends string> {
  options: readonly RankingSortOption<T>[];
  value: T;
  onChange?: (value: T) => void;
}

export const useRankingSort = <T extends string>({
  options,
  value,
  onChange,
}: UseRankingSortProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((option) => option.value === value)?.label;

  const handleSelect = (selected: T) => {
    onChange?.(selected);
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

  return {
    ref,
    selected: value,
    selectedLabel,
    isOpen,
    toggleOpen,
    handleSelect,
  };
};
