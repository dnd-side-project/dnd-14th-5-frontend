import { useState } from 'react';

import SortSelect from '@/src/components/ui/SortSelect/SortSelect';
import type { CATEGORY, CHARACTER_NAMES } from '@/src/lib/constants/character';

import {
  GRAPH_PERIOD_OPTIONS,
  type GraphPeriod,
} from '../constants/graphPeriod';
import { useStatisticsDetailQuery } from '../queries/useStatisticsDetailQuery';

interface GraphSectionProps {
  character: (typeof CHARACTER_NAMES)[number];
  category: (typeof CATEGORY)[number];
}

const GraphSection = ({ character, category }: GraphSectionProps) => {
  const { data } = useStatisticsDetailQuery(category);
  const [period, setPeriod] = useState<GraphPeriod>(
    GRAPH_PERIOD_OPTIONS[0].value,
  );

  const approachRate = data.proximityRate ?? 0;

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

      <div className="h-30 bg-g-600 rounded-8">그래프</div>
      <article className="space-y-4">
        <p className="font-heading-h4 text-g-60">
          회고를 통해서{' '}
          <span className="text-primary">{Math.round(approachRate)}%</span>에
          가까워졌어요!
        </p>
      </article>
    </section>
  );
};

export default GraphSection;
