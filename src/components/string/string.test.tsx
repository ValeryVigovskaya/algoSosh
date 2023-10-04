import React from "react";
import renderer from "react-test-renderer";
import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import { sortArray } from "./utils";
import { ElementStates } from "../../types/element-states";
import { IString } from "../../types/my-types";
import { StringComponent } from "./string";
import { BrowserRouter as Router } from "react-router-dom";

describe("Тестирование корректного разворота строки", () => {
const setState = jest.fn() as React.Dispatch<React.SetStateAction<IString[]>>;
const loader = jest.fn() as (value: React.SetStateAction<boolean>) => void;

  test("Функция с чётным количеством символов работает без ошибок", async () => {
    const stringArray = Array.from("test");
    const testStringArray = Array.from("tset");
    const arrayObj = stringArray.map((value) => ({
      value,
      color: ElementStates.Default,
    })) as IString[];
    const arrayTestObj = testStringArray.map((value) => ({
      value,
      color: ElementStates.Modified,
    })) as IString[];
    const sortingArr = await sortArray(arrayObj, setState, loader);

    expect(sortingArr).toEqual(arrayTestObj); // Ок
  });

  test("Функция с нечётным количеством символов работает без ошибок", async () => {
    const stringArray = Array.from("testing");
    const testString = Array.from("gnitset");
    const arrayObj = stringArray.map((value) => ({
      value,
      color: ElementStates.Default,
    })) as IString[];
    const arrayTestObj = testString.map((value) => ({
      value,
      color: ElementStates.Modified,
    })) as IString[];
    const sortingArr = await sortArray(arrayObj, setState, loader);

    expect(sortingArr).toEqual(arrayTestObj); // Ок
  });

  test("Функция с одним символом работает без ошибок", async () => {
    const stringArray = Array.from("t");
    const testString = Array.from("t");
    const arrayObj = stringArray.map((value) => ({
      value,
      color: ElementStates.Default,
    })) as IString[];
    const arrayTestObj = testString.map((value) => ({
      value,
      color: ElementStates.Modified,
    })) as IString[];
    const sortingArr = await sortArray(arrayObj, setState, loader);

    expect(sortingArr).toEqual(arrayTestObj); // Ок
  });

  test("Функция с пустой строкой работает без ошибок", async() => {
    const stringArray = [] as IString[];
    const sortingArr = await sortArray(stringArray, setState, loader);

    expect(sortingArr).toEqual(stringArray); // Ок
  });
});
