'use client';

import { type ComponentPropsWithoutRef, useState } from 'react';

type TextAreaProps = Omit<
  ComponentPropsWithoutRef<'textarea'>,
  'value' | 'defaultValue'
> & {
  value?: string;
  defaultValue?: string;
  variant?: 'default';
  maxLength?: number;
};

const TextArea = ({
  value,
  defaultValue,
  onChange,
  variant = 'default',
  maxLength = 3000,
  ...props
}: TextAreaProps) => {
  const [innerValue, setInnerValue] = useState(defaultValue ?? '');

  const isControlled = value !== undefined;
  const rawValue = isControlled ? value : innerValue;
  const displayValue =
    maxLength === undefined ? rawValue : rawValue.slice(0, maxLength);

  const handleChange: ComponentPropsWithoutRef<'textarea'>['onChange'] = (
    e,
  ) => {
    const nextValue = e.currentTarget.value;
    if (maxLength !== undefined && nextValue.length > maxLength) {
      return;
    }
    if (!isControlled) setInnerValue(nextValue);
    onChange?.(e);
  };

  const styles = {
    default: {
      wrapper: 'rounded-[24px] border border-white/60 bg-[#2B2F3D]',
      textarea:
        'min-h-[360px] w-full resize-none bg-transparent px-5  my-4 text-[14px] text-white placeholder:text-white/60 focus:outline-none disabled:opacity-50',
      counter: 'flex justify-end px-5 pb-4 text-[14px] text-white',
    },
  }[variant];

  return (
    <div className={`${styles.wrapper}`}>
      <textarea
        className={`${styles.textarea} scrollbar-transparent-track`}
        value={displayValue}
        onChange={handleChange}
        maxLength={maxLength}
        placeholder="어떤 일이 있었나요?"
        {...props}
      />

      <div className={styles.counter}>
        {displayValue.length}/{maxLength}자
      </div>
    </div>
  );
};

export default TextArea;
