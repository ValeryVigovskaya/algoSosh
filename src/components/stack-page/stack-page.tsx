import React, { SyntheticEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack.module.css";
import { useForm } from "../../hooks/hooks";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "./utils";
import { ElementStates } from "../../types/element-states";
import { useState } from "react";
import { timeout } from "../../utils/functions";
import { Circle } from "../ui/circle/circle";

type IString = {
  value: string;
  color?: ElementStates;
};
const stack = new Stack<IString>();
export const StackPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: "" });
  const [arr, setArr] = useState<IString[]>([]);

  const onClick = async (evt: SyntheticEvent, textButton: string) => {
    evt.preventDefault();
    const array = stack.getEl();
    if (values.value !== "" && textButton === "Добавить") {
      stack.push({ value: values.value, color: ElementStates.Changing });
      setArr([...array]);
      setValues({ value: "" });
      await timeout(500);
      stack.peak()!.color = ElementStates.Default;
      setArr([...array]);
    } else if (textButton === "Удалить") {
      stack.peak()!.color = ElementStates.Changing;
      setArr([...array]);
      await timeout(500);
      stack.pop();
      await timeout(500);
      setArr([...array]);
    } else if (textButton === "Очистить") {
      const length = stack.getSize();
      let i = 0;
      for (i; i < length; i++) {
        stack.pop();
      }
      setArr([...array]);
    }
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.input_container}>
        <Input
          isLimitText={true}
          max={4}
          maxLength={4}
          value={values.value}
          name="value"
          onChange={handleChange}
          type="string"
          extraClass={styles.input}
        />
        <div className={styles.buttons_container}>
          <Button
            text="Добавить"
            type="submit"
            onClick={(e) => onClick(e, "Добавить")}
            disabled={values.value === "" ? true : false}
          />
          <Button
            text="Удалить"
            type="submit"
            onClick={(e) => onClick(e, "Удалить")}
            disabled={stack.getSize() > 0 ? false : true}
          />
          <Button
            text="Очистить"
            type="submit"
            extraClass={styles.clear}
            onClick={(e) => onClick(e, "Очистить")}
            disabled={stack.getSize() > 0 ? false : true}
          />
        </div>
      </form>
      <ul className={styles.circle_container}>
        {arr?.map((item, index) => (
          <li key={index} className={styles.circle_item}>
            <Circle
              letter={item.value}
              state={item.color}
              extraClass={`${styles.fadeIn}`}
              index={index}
              head={stack.peak() === item ? "top" : ""}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
