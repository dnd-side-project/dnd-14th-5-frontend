import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';

import {
  type Category,
  CATEGORY_CHARACTER_MAP,
} from '@/src/lib/constants/character';
import { cn } from '@/src/lib/helpers/cn';

import Icon from '../../../ui/Icon/Icon';

interface AccordionItemProps {
  id: number;
  title: string;
  children: string;
  isOpen: boolean;
  onToggle: () => void;
  englishName: Category;
  personality: string;
}

const BG_COLOR_MAP: Record<string, string> = {
  'text-b-300': 'bg-b-300',
  'text-r-300': 'bg-r-300',
  'text-p-300': 'bg-p-300',
  'text-gr-300': 'bg-gr-300',
  'text-v-300': 'bg-v-300',
};

const AccordionItem = ({
  title,
  children,
  isOpen,
  onToggle,
  englishName,
  personality,
}: AccordionItemProps) => {
  const { src, alt, color } = CATEGORY_CHARACTER_MAP[englishName];
  const bgColorClass = BG_COLOR_MAP[color] || 'bg-g-0';

  return (
    <div className="border-b border-g-600 last:border-none rounded-2xl">
      <button
        type="button"
        className={cn(
          'flex w-full items-center justify-between text-left focus:outline-none px-4 py-2',
          bgColorClass,
          isOpen ? 'rounded-t-2xl' : 'rounded-2xl',
        )}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-5">
          <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-g-0">
            <Image
              src={src}
              alt={alt}
              width={38}
              height={38}
              className="object-contain"
            />
          </div>
          <span className="font-heading-h4 text-g-700">{title}</span>
        </div>
        <Icon
          name="chevronLeft"
          size={20}
          className={cn(
            'transition-transform duration-200 invert',
            isOpen ? 'rotate-90' : '-rotate-90',
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden space-y-3 bg-g-600 p-4 rounded-b-2xl"
          >
            <div className="space-y-1">
              <p className="font-heading-h4 text-g-0">성향</p>
              <p className="text-g-40 font-body-s">{personality}</p>
            </div>
            <div className="space-y-1">
              <p className="font-heading-h4 text-g-0">설명</p>
              <ul className="text-g-40 font-body-s list-disc ml-4">
                {children.split('\n').map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionItem;
