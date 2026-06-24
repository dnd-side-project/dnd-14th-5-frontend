export const GRAPH_PERIOD_OPTIONS = [
  { label: '1주', value: 'WEEK' },
  { label: '1달', value: 'MONTH' },
  { label: '3달', value: 'THREE_MONTHS' },
  { label: '1년', value: 'YEAR' },
] as const;

export type GraphPeriod = (typeof GRAPH_PERIOD_OPTIONS)[number]['value'];
