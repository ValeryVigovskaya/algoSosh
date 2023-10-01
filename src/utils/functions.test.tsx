import React from "react";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { timeout, swap } from "./functions";
import { ElementStates } from "../types/element-states";

const stringObjArr = [
  { value: "1", color: ElementStates.Default },
  { value: "2", color: ElementStates.Default },
  { value: "3", color: ElementStates.Default },
];

const numberObjArr = [
  { value: 1, color: ElementStates.Default },
  { value: 2, color: ElementStates.Default },
  { value: 3, color: ElementStates.Default },
];

const numberArr = [1, 2, 3];

const testStringObjArr = [
  { value: "3", color: ElementStates.Default },
  { value: "2", color: ElementStates.Default },
  { value: "1", color: ElementStates.Default },
];

const testNumberObjArr = [
  { value: 3, color: ElementStates.Default },
  { value: 2, color: ElementStates.Default },
  { value: 1, color: ElementStates.Default },
];

const testNumberArr = [3, 2, 1];

describe("Тестирование утилитарной функции swap", () => {
  test("Функция swap работает без ошибок со строковым массивом", () => {
    expect(swap(stringObjArr, 0, 2)).toEqual(testStringObjArr); // Ок
  });

  test("Функция swap работает без ошибок со числовым массивом", () => {
    expect(swap(numberObjArr, 0, 2)).toEqual(testNumberObjArr); // Ок
  });

  test("Функция swap работает без ошибок с числами массива", () => {
    expect(swap(numberArr, 0, 2)).toEqual(testNumberArr); // Ок
  });
});

describe("Тестирование утилитарной функции timeout", () => {
  test("Функция timeout", async () => {
    jest.useFakeTimers(); //создала фейк
    const myFunction = async () => {
      await timeout(500);
      return true;
    }; //если функция отработала, возвращается колбек
    const resultPromise = myFunction();

    jest.runAllTimers(); //запустила все таймеры

    const result = await resultPromise;
 
    expect(result).toBe(true);
  });
});
