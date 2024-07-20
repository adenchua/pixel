import _ from "lodash";

export function getMaxDataPoint(arr: Array<number | null>): number | undefined {
  // remove all falsy values that affects calculation
  const nonFalsyArray = _.compact(arr);

  if (nonFalsyArray.length === 0) {
    return undefined;
  }

  return _.max(nonFalsyArray);
}

export function getMinDataPoint(arr: Array<number | null>): number | undefined {
  // remove all falsy values that affects calculation
  const nonFalsyArray = _.compact(arr);

  if (nonFalsyArray.length === 0) {
    return undefined;
  }

  return _.min(nonFalsyArray);
}
