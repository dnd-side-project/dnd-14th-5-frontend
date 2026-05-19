import { z } from 'zod';

export const sortValueSchema = z.enum(['STREAK', 'LATEST', 'TOTAL']);
export type SortValue = z.infer<typeof sortValueSchema>;

export const SORT_OPTIONS: readonly { label: string; value: SortValue }[] = [
  { label: '지속순', value: 'STREAK' },
  { label: '최신순', value: 'LATEST' },
  { label: '날짜순', value: 'TOTAL' },
];
