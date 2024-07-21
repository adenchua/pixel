export interface ChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface Series {
  data: Array<number | null>;
  color: string;
  label: string;
  strokeWidth?: 1 | 2 | 3 | 4;
  labelXOffset?: number;
  labelYOffset?: number;
}

export interface XAxis {
  type: "category" | "time";
  data: string[];
}
