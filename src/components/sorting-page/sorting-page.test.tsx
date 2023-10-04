import React from "react";
import renderer from "react-test-renderer";
import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import { ElementStates } from "../../types/element-states";
import { IString } from "../../types/my-types";
import { BrowserRouter as Router } from "react-router-dom";
import { randomArr, selectionSort, bubbleSort } from "./utils";
import { INumber } from "../../types/my-types";
import { Direction } from "../../types/direction";

describe("Тестирование алгоритмов сортировки выбором и пузырьком", () => {
  const setState = jest.fn() as React.Dispatch<React.SetStateAction<INumber[]>>;
  const loader = jest.fn() as (value: React.SetStateAction<boolean>) => void;
  const disabled = jest.fn() as React.Dispatch<React.SetStateAction<boolean>>;
  test("Функция алгоритма сортировки выбором с пустым массивом", async () => {
    const arr = [] as INumber[];
    const testArr = [] as INumber[];
    const direction = Direction.Ascending;
    const sortArr = await selectionSort(
      arr,
      setState,
      loader,
      direction,
      disabled
    );
    expect(sortArr).toEqual(testArr);
  });

  test("Функция алгоритма сортировки пузырьком с пустым массивом", async () => {
    const arr = [] as INumber[];
    const testArr = [] as INumber[];
    const direction = Direction.Ascending;
    const sortArr = await bubbleSort(
      arr,
      setState,
      loader,
      direction,
      disabled
    );
    expect(sortArr).toEqual(testArr);
  });

  test("Функция алгоритма сортировки выбором с одним элементом по убыванию", async () => {
    const arr = [{ value: 1, color: ElementStates.Default }];
    const testArr = [{ value: 1, color: ElementStates.Modified }];
    const direction = Direction.Ascending;
    const sortArr = await selectionSort(
      arr,
      setState,
      loader,
      direction,
      disabled
    );
    expect(sortArr).toEqual(testArr);
  });
  test("Функция алгоритма сортировки выбором с одним элементом по возврастанию", async () => {
    const arr = [{ value: 1, color: ElementStates.Default }];
    const testArr = [{ value: 1, color: ElementStates.Modified }];
    const direction = Direction.Descending;
    const sortArr = await selectionSort(
      arr,
      setState,
      loader,
      direction,
      disabled
    );
    expect(sortArr).toEqual(testArr);
  });
  test("Функция алгоритма сортировки пузырьком с одним элементом по убыванию", async () => {
    const arr = [{ value: 1, color: ElementStates.Default }];
    const testArr = [{ value: 1, color: ElementStates.Modified }];
    const direction = Direction.Ascending;
    const sortArr = await bubbleSort(
      arr,
      setState,
      loader,
      direction,
      disabled
    );
    expect(sortArr).toEqual(testArr);
  });
  test("Функция алгоритма сортировки пузырьком с одним элементом по возврастанию", async () => {
    const arr = [{ value: 1, color: ElementStates.Default }];
    const testArr = [{ value: 1, color: ElementStates.Modified }];
    const direction = Direction.Descending;
    const sortArr = await bubbleSort(
      arr,
      setState,
      loader,
      direction,
      disabled
    );
    expect(sortArr).toEqual(testArr);
  });

  test("Функция алгоритма сортировки выбором с несколькими элементами по убыванию", async () => {
    const arr = [
      { value: 1, color: ElementStates.Default },
      { value: 2, color: ElementStates.Default },
      { value: 3, color: ElementStates.Default },
    ];
    const testArr = [
      { value: 3, color: ElementStates.Modified },
      { value: 2, color: ElementStates.Modified },
      { value: 1, color: ElementStates.Modified },
    ];
    const direction = Direction.Ascending;
    const sortArr = await selectionSort(
      arr,
      setState,
      loader,
      direction,
      disabled
    );
    expect(sortArr).toEqual(testArr);
  });
  test("Функция алгоритма сортировки выбором с несколькими элементами по возврастанию", async () => {
    const arr = [
      { value: 1, color: ElementStates.Default },
      { value: 2, color: ElementStates.Default },
      { value: 3, color: ElementStates.Default },
    ];
    const testArr = [
      { value: 1, color: ElementStates.Modified },
      { value: 2, color: ElementStates.Modified },
      { value: 3, color: ElementStates.Modified },
    ];
    const direction = Direction.Descending;
    const sortArr = await selectionSort(
      arr,
      setState,
      loader,
      direction,
      disabled
    );
    expect(sortArr).toEqual(testArr);
  });

  test("Функция алгоритма сортировки пузырьком с несколькими элементами по убыванию", async () => {
    const arr = [
      { value: 1, color: ElementStates.Default },
      { value: 2, color: ElementStates.Default },
      { value: 3, color: ElementStates.Default },
    ];
    const testArr = [
      { value: 3, color: ElementStates.Modified },
      { value: 2, color: ElementStates.Modified },
      { value: 1, color: ElementStates.Modified },
    ];
    const direction = Direction.Ascending;
    const sortArr = await bubbleSort(
      arr,
      setState,
      loader,
      direction,
      disabled
    );
    expect(sortArr).toEqual(testArr);
  });
  test("Функция алгоритма сортировки пузырьком с несколькими элементами по возврастанию", async () => {
    const arr = [
      { value: 1, color: ElementStates.Default },
      { value: 2, color: ElementStates.Default },
      { value: 3, color: ElementStates.Default },
    ];
    const testArr = [
      { value: 1, color: ElementStates.Modified },
      { value: 2, color: ElementStates.Modified },
      { value: 3, color: ElementStates.Modified },
    ];
    const direction = Direction.Descending;
    const sortArr = await bubbleSort(
      arr,
      setState,
      loader,
      direction,
      disabled
    );
    expect(sortArr).toEqual(testArr);
  });
});
