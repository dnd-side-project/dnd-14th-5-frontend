import { useState } from 'react';

import SortSelect from '@/src/components/ui/SortSelect/SortSelect';
import type { CATEGORY, CHARACTER_NAMES } from '@/src/lib/constants/character';

import {
  GRAPH_PERIOD_OPTIONS,
  type GraphPeriod,
  PERIOD_START_LABEL,
} from '../constants/graphPeriod';
import DataGraph from '../DataGraph/DataGraph';
import { useStatisticsDetailQuery } from '../queries/useStatisticsDetailQuery';

interface GraphSectionProps {
  character: (typeof CHARACTER_NAMES)[number];
  category: (typeof CATEGORY)[number];
}

function filterByPeriod(
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

const GraphSection = ({ character, category }: GraphSectionProps) => {
  const { data } = useStatisticsDetailQuery(category);
  const [period, setPeriod] = useState<GraphPeriod>(
    GRAPH_PERIOD_OPTIONS[0].value,
  );

  const approachRate = data.proximityRate ?? 0;
  const filteredDataPoints = filterByPeriod(data.dataPoints, period);

  return (
    <section className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <p className="font-heading-h4 text-g-0">{character} 그래프</p>
        <SortSelect
          options={GRAPH_PERIOD_OPTIONS}
          value={period}
          onChange={setPeriod}
        />
      </div>

      <DataGraph
        dataPoints={filteredDataPoints}
        idealScore={data.idealScore}
        startLabel={PERIOD_START_LABEL[period]}
        chartType={
          ['THREE_MONTHS', 'SIX_MONTHS', 'YEAR'].includes(period)
            ? 'line'
            : 'bar'
        }
      />

      <article className="flex flex-col gap-5">
        <p className="font-heading-h4 text-g-60">
          회고를 통해서{' '}
          <span className="text-primary">{Math.round(approachRate)}%</span>{' '}
          이상치에 가까워졌어요!
        </p>
        {data.personality && (
          <p className="font-body-s text-g-60">{data.personality}</p>
        )}
      </article>
    </section>
  );
};

export default GraphSection;
