import { IString } from "../types/my-types";
import { INumber } from "../types/my-types";

export const timeout = (delay: number) => {
  return new Promise((res) => setTimeout(res, delay));
};

export const swap = (
  arr: IString[] | INumber[] | number[],
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};
