import React, { SyntheticEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue.module.css";
import { useForm } from "../../hooks/hooks";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Queue } from "./utils";
import { ElementStates } from "../../types/element-states";
import { useState } from "react";
import { timeout } from "../../utils/functions";
import { Circle } from "../ui/circle/circle";

type IString = {
  value?: string;
  color?: ElementStates;
};
//const queue = new Queue<IString>(7);

export const QueuePage: React.FC = () => {
  const initialState = Array.from({ length: 7 }).map((value) => ({
    value: "",
    color: ElementStates.Default,
  })) as IString[];
  const { values, handleChange, setValues } = useForm({ value: "" });
  const [arr, setArr] = useState<IString[]>(initialState);
  const [queue, setQueue] = useState(new Queue<IString>(7));
  let array = queue.getEl() as IString[];

  const onClick = async (evt: SyntheticEvent, textButton: string) => {
    evt.preventDefault();
    if (values.value !== "" && textButton === "Добавить") {
      queue.enqueue({ value: values.value, color: ElementStates.Changing });
      setQueue(queue);
      setArr([...array]);
      await timeout(500);
      queue.getTeil()!.color = ElementStates.Default;
      setValues({ value: "" });
      setArr([...array]);
    } else if (textButton === "Удалить") {
      queue.peak()!.color = ElementStates.Changing;
      setQueue(queue);
      setArr([...array]);
      await timeout(500);
      queue.dequeue();
      setQueue(queue);
      await timeout(500);
      setArr([...array]);
    } else if (textButton === "Очистить") {
        queue.clear();
      setQueue(queue);
      array = initialState
      setArr([...array])
    }
  };

  return (
    <SolutionLayout title="Очередь">
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
            disabled={
              values.value === "" ||
              (!queue.isEmpty() && arr.slice(-1)[0] === queue.getTeil())
                ? true
                : false
            }
          />
          <Button
            text="Удалить"
            type="submit"
            onClick={(e) => onClick(e, "Удалить")}
            disabled={!queue.isEmpty() ? false : true}
          />
          <Button
            text="Очистить"
            type="button"
            extraClass={styles.clear}
            onClick={(e) => onClick(e, "Очистить")}
            disabled={!queue.isEmpty() ? false : true}
          />
        </div>
      </form>
      <ul className={styles.circle_container}>
        {arr?.map((item, index) => (
          <li key={index} className={styles.circle_item}>
            <Circle
              letter={item?.value}
              state={item?.color}
              extraClass={`${styles.fadeIn}`}
              index={index}
              head={!queue.isEmpty() && queue.peak() === item ? "head" : ""}
              tail={!queue.isEmpty() && queue.getTeil() === item ? "tail" : ""}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
