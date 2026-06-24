import { cn } from '@/src/lib/helpers/cn';

interface DataPoint {
  score: number;
  createdAt: Date;
}

interface DataGraphProps {
  dataPoints: DataPoint[];
  idealScore: number;
  startLabel: string;
  chartType: 'bar' | 'line';
}

const CHART_AREA_HEIGHT = 108; // h-38(152px) - top-3(12px) - bottom-8(32px)
const MAX_BAR_WIDTH = 36;
const AREA_GRADIENT_ID = 'stat-area-gradient';

function formatShortDate(date: Date) {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

function formatDate(date: Date) {
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

function calcMaxScore(idealScore: number, scores: number[]) {
  const maxData = scores.reduce((m, s) => Math.max(m, s), 0);
  return Math.max(idealScore, maxData) * 1.15 || 1;
}

function getLabelIndices(total: number, count: number): number[] {
  if (total <= count) return Array.from({ length: total }, (_, i) => i);
  return Array.from({ length: count }, (_, i) =>
    Math.round((i * (total - 1)) / (count - 1)),
  );
}

const DataGraph = ({
  dataPoints,
  idealScore,
  startLabel,
  chartType,
}: DataGraphProps) => {
  if (dataPoints.length === 0) {
    return (
      <div className="h-38 bg-g-600 rounded-lg flex items-center justify-center">
        <p className="font-caption-n text-g-100">이 기간의 데이터가 없어요</p>
      </div>
    );
  }

  const maxScore = calcMaxScore(
    idealScore,
    dataPoints.map((d) => d.score),
  );
  const endDate = dataPoints[dataPoints.length - 1].createdAt;
  const idealLineBottomPx = Math.round(
    (idealScore / maxScore) * CHART_AREA_HEIGHT,
  );
  const showDots = dataPoints.length <= 30;

  const points = dataPoints.map((dp, i) => ({
    x: dataPoints.length === 1 ? 50 : (i / (dataPoints.length - 1)) * 100,
    y: (1 - dp.score / maxScore) * 100,
    dp,
  }));

  const polylineStr = points.map(({ x, y }) => `${x},${y}`).join(' ');
  const areaPath =
    points.length >= 2
      ? `M ${points[0].x},${points[0].y} ${points
          .slice(1)
          .map(({ x, y }) => `L ${x},${y}`)
          .join(
            ' ',
          )} L ${points[points.length - 1].x},100 L ${points[0].x},100 Z`
      : '';

  const labelIndices = getLabelIndices(dataPoints.length, 5);

  return (
    <div className="relative h-38 bg-g-600 rounded-lg overflow-hidden">
      {/* 차트 영역 */}
      <div className="absolute inset-x-4 top-3 bottom-8">
        {/* 이상치 기준선 */}
        <div
          className="absolute inset-x-0 border-t border-dashed border-g-60/40 pointer-events-none"
          style={{ bottom: idealLineBottomPx }}
        />

        {chartType === 'bar' ? (
          /* ─── 막대 차트 ─── */
          <div className="absolute inset-0 flex items-end gap-0.5">
            {dataPoints.map((dp, i) => {
              const heightPx = Math.round(
                (dp.score / maxScore) * CHART_AREA_HEIGHT,
              );
              const isHighlighted = dp.score >= idealScore;
              return (
                <div
                  key={i}
                  className={cn(
                    'flex-1 min-w-0 rounded-t-xs',
                    isHighlighted ? 'bg-g-60' : 'bg-g-200',
                  )}
                  style={{ height: heightPx, maxWidth: MAX_BAR_WIDTH }}
                />
              );
            })}
          </div>
        ) : (
          /* ─── 꺾은선 차트 ─── */
          <div className="absolute inset-0">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                <linearGradient
                  id={AREA_GRADIENT_ID}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="var(--color-g-60)"
                    stopOpacity="0.25"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-g-60)"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              {/* 면적 영역 */}
              {areaPath && (
                <path d={areaPath} fill={`url(#${AREA_GRADIENT_ID})`} />
              )}

              {/* 꺾은선 */}
              {points.length >= 2 && (
                <polyline
                  points={polylineStr}
                  fill="none"
                  stroke="var(--color-g-60)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              )}
            </svg>

            {/* 점 (CSS 원형) */}
            {showDots &&
              points.map(({ x, y, dp }, i) => (
                <div
                  key={i}
                  className={cn(
                    'absolute size-1.5 rounded-full -translate-x-1/2 -translate-y-1/2',
                    dp.score >= idealScore ? 'bg-g-60' : 'bg-g-200',
                  )}
                  style={{ left: `${x}%`, top: `${y}%` }}
                />
              ))}
          </div>
        )}
      </div>

      {/* 날짜 레이블 */}
      <div className="absolute inset-x-4 bottom-2">
        {chartType === 'bar' ? (
          <div className="flex justify-between">
            <span className="font-caption-n text-g-60 text-[11px]">
              {startLabel}
            </span>
            <span className="font-caption-n text-g-60 text-[11px]">
              {formatDate(endDate)}
            </span>
          </div>
        ) : (
          <div className="relative h-4">
            {labelIndices.map((idx) => {
              const isFirst = idx === 0;
              const isLast = idx === dataPoints.length - 1;
              const xPercent = isFirst
                ? 0
                : isLast
                  ? 100
                  : (idx / (dataPoints.length - 1)) * 100;
              return (
                <span
                  key={idx}
                  className={cn(
                    'absolute text-[10px] text-g-60 whitespace-nowrap',
                    isFirst && 'left-0',
                    isLast && 'right-0',
                    !isFirst && !isLast && '-translate-x-1/2',
                  )}
                  style={
                    !isFirst && !isLast ? { left: `${xPercent}%` } : undefined
                  }
                >
                  {formatShortDate(dataPoints[idx].createdAt)}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataGraph;
