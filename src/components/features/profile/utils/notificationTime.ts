import type { TimeValue } from '@/src/components/ui/TimeWheelPicker/TimeWheelPicker';

const DEFAULT_TIME: TimeValue = {
  hour: '09',
  minute: '00',
};
const DEFAULT_NOTIFICATION_SCHEDULE_TIME = '09:00:00';
const NOTIFICATION_LAST_TIME_KEY = 'notification:lastTime';

export const formatScheduleTime = (value: string | undefined) => {
  if (!value) {
    return '--:--';
  }

  const [hourText, minuteText] = value.split(':');
  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return value;
  }

  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;

  return `${String(hour12).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${period}`;
};

export const toTimeValue = (value: string | undefined): TimeValue => {
  if (!value) {
    return DEFAULT_TIME;
  }

  const [hourText, minuteText] = value.split(':');
  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return DEFAULT_TIME;
  }

  return {
    hour: String(hour).padStart(2, '0'),
    minute: String(minute).padStart(2, '0'),
  };
};

export const toScheduleTime = (timeValue: TimeValue) => {
  return `${timeValue.hour}:${timeValue.minute}:00`;
};

export const getDefaultNotificationScheduleTime = () => {
  return DEFAULT_NOTIFICATION_SCHEDULE_TIME;
};

export const getStoredNotificationTime = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(NOTIFICATION_LAST_TIME_KEY);
};

export const setStoredNotificationTime = (value: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(NOTIFICATION_LAST_TIME_KEY, value);
};
