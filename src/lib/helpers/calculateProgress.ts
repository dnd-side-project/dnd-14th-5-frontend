interface CalculateProgressParams {
  current: number;
  max: number;
}

export const calculatePercentage = ({
  current,
  max,
}: CalculateProgressParams): number => {
  if (max === 0) {
    return 0;
  }

  return Math.round((current / max) * 100);
};
