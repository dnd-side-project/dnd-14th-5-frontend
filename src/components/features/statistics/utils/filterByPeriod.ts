import type { GraphPeriod } from '../constants/graphPeriod';

export function filterByPeriod(
  dataPoints: Array<{ score: number; createdAt: Date }>,
  period: GraphPeriod,
) {
  const now = new Date();
  const cutoff = new Date(now);
  switch (period) {
    case 'WEEK':
      cutoff.setDate(now.getDate() - 7);
      break;
    case 'MONTH':
      cutoff.setMonth(now.getMonth() - 1);
      break;
    case 'THREE_MONTHS':
      cutoff.setMonth(now.getMonth() - 3);
      break;
    case 'SIX_MONTHS':
      cutoff.setMonth(now.getMonth() - 6);
      break;
    case 'YEAR':
      cutoff.setFullYear(now.getFullYear() - 1);
      break;
  }
  return dataPoints.filter((dp) => new Date(dp.createdAt) >= cutoff);
}
