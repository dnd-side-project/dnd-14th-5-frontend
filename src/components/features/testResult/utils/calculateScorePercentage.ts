interface CalculateScorePercentageProps {
  score: number;
  maxScore?: number;
}

export const calculateScorePercentage = ({
  score,
  maxScore = 5,
}: CalculateScorePercentageProps) => (score / maxScore) * 100;
