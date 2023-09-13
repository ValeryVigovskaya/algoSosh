import { INumber } from "./sorting-page";
import { swap, timeout } from "../../utils/functions";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
export const randomArr = (min: number, max: number): INumber[] => {
  const arr: INumber[] = [];
  min = Math.ceil(min);
  max = Math.floor(max);
  const maxLen = 17;
  const minLen = 3;
  let randomLen = Math.floor(Math.random() * (maxLen - minLen + 1) + minLen);
  for (let i = 0; i <= randomLen; i++) {
    let randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    arr.push({ value: randomNum });
  }
  return arr;
};

//сортировка выбором по убыванию и возрастанию
export const selectionSort = async (
  arr: INumber[],
  setState: React.Dispatch<React.SetStateAction<INumber[]>>,
  loader: (value: React.SetStateAction<boolean>) => void,
  derection: Direction
) => {
  loader(true);
  let { length } = arr;
  for (let i = 0; i < length; i++) {
    let max = i;
    arr[max].color = ElementStates.Changing;
    setState([...arr]);
    for (let j = i + 1; j < length; j++) {
      arr[j].color = ElementStates.Changing;
      setState([...arr]);
      await timeout(SHORT_DELAY_IN_MS);
      if (derection === Direction.Ascending && arr[j].value > arr[max].value) {
        max = j;
      } else if (
        derection === Direction.Descending &&
        arr[j].value < arr[max].value
      ) {
        max = j;
      }
      arr[j].color = ElementStates.Default;
      setState([...arr]);
      await timeout(SHORT_DELAY_IN_MS);
    }
    if (max !== i) {
      swap(arr, i, max);
      arr[max].color = ElementStates.Default;
      arr[i].color = ElementStates.Modified;
      setState([...arr]);
      await timeout(SHORT_DELAY_IN_MS);
    }
    arr[i].color = ElementStates.Modified;
    setState([...arr]);
  }
  loader(false);
  return arr;
};

//сортировка пузырьком по убыванию и возрастанию
export const bubbleSort = async (
  arr: INumber[],
  setState: React.Dispatch<React.SetStateAction<INumber[]>>,
  loader: (value: React.SetStateAction<boolean>) => void
) => {
  loader(true);
  let { length } = arr;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      arr[j].color = ElementStates.Changing;
      arr[j+1].color = ElementStates.Changing;
      setState([...arr]);
      await timeout(SHORT_DELAY_IN_MS);
      if (arr[j].value < arr[j + 1].value) {
        swap(arr, j, j + 1);
      }
      arr[j].color = ElementStates.Default;
      setState([...arr]);
      await timeout(SHORT_DELAY_IN_MS);
    }
    arr[length - i - 1].color = ElementStates.Modified;
    setState([...arr]);
  }
  loader(false);
  return arr;
};
