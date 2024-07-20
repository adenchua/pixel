export const CANVAS_DIMENSIONS: CanvasDimensions = {
  standardWeb1Column: {
    width: 290,
    height: 290,
  },
  standardWeb2Column: {
    width: 595,
    height: 290,
  },
  standardWeb3Column: {
    width: 903,
    height: 290,
  },
};

const CANVAS_DIMENSION_KEYS = [
  "standardWeb1Column",
  "standardWeb2Column",
  "standardWeb3Column",
] as const;
export type CanvasDimensionType = (typeof CANVAS_DIMENSION_KEYS)[number];

type CanvasDimensions = {
  [key in CanvasDimensionType]: {
    width: number;
    height: number;
  };
};
