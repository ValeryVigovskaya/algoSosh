import React, { SyntheticEvent } from "react";
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
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
export interface INumber {
  value: number;
  color?: ElementStates;
}

export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<INumber[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [current, setCurrent] = useState<Direction>();
  const [disButton, setDisButton] = useState(false);
  const [radioInput, setRadioInput] = useState({ label: "Выбор" });
  const random: INumber[] = randomArr(0, 100);

  const newArr = async () => {
    await timeout(500);
    const arrayObj = random.map((value) => ({
      ...value,
      color: ElementStates.Default,
    })) as INumber[];
    setArr([...arrayObj]);
  };

  useEffect(() => {
    newArr();
  }, []);

  const handleRadioInput = (value: string) => {
    setRadioInput({
      label: value,
    });
  };

  const onClickNewArr = async (evt: SyntheticEvent) => {
    evt.preventDefault()
    await timeout(500);
    setArr([...random]);
  };

  //   const array = [5, 1, 4, 2, 8]

  const onClickButton = async (
    direction: Direction,
    input: { label: string }
  ) => {
    setCurrent(direction);
    setDisButton(true);
    setIsLoader(true);
    await timeout(SHORT_DELAY_IN_MS);
    switch (
      direction === Direction.Ascending ||
      direction === Direction.Descending
    ) {
      case input.label === "Выбор":
        selectionSort(arr, setArr, setIsLoader, direction, setDisButton);
        break;

      case input.label === "Пузырёк":
        bubbleSort(arr, setArr, setIsLoader, direction, setDisButton);
        break;
    }
  };

  const activeLoader = (direction: Direction) => {
    if (current === direction && isLoader) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.input_container}>
        <div className={styles.radio_container}>
          <RadioInput
            label="Выбор"
            checked={radioInput.label === "Выбор"}
            onChange={() => handleRadioInput("Выбор")}
          />
          <RadioInput
            label="Пузырёк"
            checked={radioInput.label === "Пузырёк"}
            onChange={() => handleRadioInput("Пузырёк")}
          />
        </div>
        <div className={styles.buttons_container}>
          <Button
            text="По убыванию"
            type="submit"
            sorting={Direction.Ascending}
            onClick={() => onClickButton(Direction.Ascending, radioInput)}
            isLoader={activeLoader(Direction.Ascending)}
            id="one"
            disabled={disButton}
          />
          <Button
            text="По возрастанию"
            type="submit"
            sorting={Direction.Descending}
            extraClass={styles.button_descending}
            id="two"
            onClick={() => onClickButton(Direction.Descending, radioInput)}
            isLoader={activeLoader(Direction.Descending)}
            disabled={disButton}
          />
          <Button
            text="Новый массив"
            type="submit"
            extraClass={styles.button_arr}
            onClick={onClickNewArr}
            id="three"
            disabled={
              isLoader === true
                ? true
                : false
            }
          />
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
