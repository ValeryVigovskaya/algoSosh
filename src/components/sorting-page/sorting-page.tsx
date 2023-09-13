import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";
import { randomArr, selectionSort, bubbleSort } from "./utils";
import { Column } from "../ui/column/column";
import { useState, useEffect } from "react";
import { ElementStates } from "../../types/element-states";
import { timeout } from "../../utils/functions";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
export interface INumber {
  value: number;
  color?: ElementStates;
}

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<INumber[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [current, setCurrent] = useState<Direction>();
  const random: INumber[] = randomArr(0, 100);

  // const onClickNewArr = () => {
  //   return setArr([...randomArr(0, 100)]);
  // };

  const newArr = async() => {
    await timeout(500);
    const arrayObj = random.map((value) => ({
      ...value,
      color: ElementStates.Default,
    })) as INumber[];
   setArr([...arrayObj])
  }
//   const array = [5, 1, 4, 2, 8]

// console.log(bubbleSort(array))

  const onClickButton = async(direction: Direction) => {
    setCurrent(direction); 
    await timeout(SHORT_DELAY_IN_MS); 
    if(direction === Direction.Ascending){
      setCurrent(Direction.Ascending); 
      // selectionSort(arr, setArr, setIsLoader, Direction.Ascending);
     bubbleSort(arr, setArr, setIsLoader)
    } else if (direction === Direction.Descending){
      setCurrent(Direction.Descending) 
      selectionSort(arr, setArr, setIsLoader, Direction.Descending)
    }
  };
  console.log(isLoader)


  useEffect(() => {
    newArr()
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.input_container}>
        <div className={styles.radio_container}>
          <RadioInput label="Выбор" defaultChecked={true} />
          <RadioInput label="Пузырёк" />
        </div>
        <div className={styles.buttons_container}>
          <Button
            text="По убыванию"
            type="submit"
            sorting={Direction.Ascending}
            onClick={()=> onClickButton(Direction.Ascending)}
            isLoader={current === Direction.Ascending? true : false}
            id="one"
          />
          <Button
            text="По возрастанию"
            type="submit"
            sorting={Direction.Descending}
            extraClass={styles.button_descending}
            id="two"
            onClick={()=> onClickButton(Direction.Descending)}
            isLoader={current === Direction.Descending? true : false}
          />
          {/* <Button
            text="Новый массив"
            type="submit"
            extraClass={styles.button_arr}
            //onClick={onClickNewArr}
            //isLoader={isLoader}
            id="three"
          /> */}
        </div>
      </form>
      <ul className={styles.column_container}>
        {arr.map((item, index) => (
          <li key={index} className={styles.circle_item}>
            <Column
              index={item.value}
              state={item.color}
              extraClass={`${styles.fadeIn}`}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
