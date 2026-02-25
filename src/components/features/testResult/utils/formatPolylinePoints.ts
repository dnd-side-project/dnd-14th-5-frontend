interface FormatPolylinePoints {
  points: {
    x: number;
    y: number;
  }[];
}

export const formatPolylinePoints = ({ points }: FormatPolylinePoints) =>
  points.map((p) => `${p.x},${p.y}`).join(' ');
