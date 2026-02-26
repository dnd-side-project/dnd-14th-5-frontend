import './TimeWheelPicker.css';

import { useMemo } from 'react';
import Picker from 'react-mobile-picker';

import { cn } from '@/src/lib/helpers/cn';

export type TimeValue = {
  hour: string;
  minute: string;
};

type TimeWheelPickerProps = {
  value: TimeValue;
  onChange: (next: TimeValue) => void;
  minuteStep?: 1 | 5 | 10 | 15 | 30;
  className?: string;
};

const ITEM_HEIGHT = 44;
const PICKER_HEIGHT = ITEM_HEIGHT * 3;
const COLUMN_WIDTH = 96;

const pad2 = (num: number) => String(num).padStart(2, '0');

const buildMinutes = (step: number) => {
  const values: string[] = [];

  for (let minute = 0; minute < 60; minute += step) {
    values.push(pad2(minute));
  }

  return values;
};

const TimeWheelPicker = ({
  value,
  onChange,
  minuteStep = 10,
  className,
}: TimeWheelPickerProps) => {
  const hours = useMemo(
    () => Array.from({ length: 24 }, (_, hour) => pad2(hour)),
    [],
  );
  const minutes = useMemo(() => buildMinutes(minuteStep), [minuteStep]);

  return (
    <div
      className={cn('time-wheel-picker relative w-full', className)}
      style={{ height: PICKER_HEIGHT }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-g-200/50"
        style={{ height: ITEM_HEIGHT }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-14 bg-linear-to-b from-g-400 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-14 bg-linear-to-t from-g-400 to-transparent" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 text-center text-body-l leading-none text-g-0">
        :
      </div>

      <Picker
        value={value}
        onChange={(next) => onChange(next as TimeValue)}
        height={PICKER_HEIGHT}
        itemHeight={ITEM_HEIGHT}
        wheelMode="natural"
        className="relative z-10 mx-auto flex w-full max-w-70 items-center justify-center"
      >
        <Picker.Column
          name="hour"
          className="pr-3"
          style={{ width: COLUMN_WIDTH }}
        >
          {hours.map((hour) => (
            <Picker.Item key={hour} value={hour}>
              {({ selected }) => (
                <div
                  className={cn(
                    'flex items-center justify-center text-body-l leading-none',
                    selected ? 'text-g-0' : 'text-g-0/25',
                  )}
                  style={{ height: ITEM_HEIGHT }}
                >
                  {hour}
                </div>
              )}
            </Picker.Item>
          ))}
        </Picker.Column>

        <Picker.Column
          name="minute"
          className="pl-3"
          style={{ width: COLUMN_WIDTH }}
        >
          {minutes.map((minute) => (
            <Picker.Item key={minute} value={minute}>
              {({ selected }) => (
                <div
                  className={cn(
                    'flex items-center justify-center text-body-l leading-none',
                    selected ? 'text-g-0' : 'text-g-0/25',
                  )}
                  style={{ height: ITEM_HEIGHT }}
                >
                  {minute}
                </div>
              )}
            </Picker.Item>
          ))}
        </Picker.Column>
      </Picker>
    </div>
  );
};

export default TimeWheelPicker;
