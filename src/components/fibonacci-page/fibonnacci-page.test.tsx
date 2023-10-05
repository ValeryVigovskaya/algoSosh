import React from "react";
import renderer from "react-test-renderer";
import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import { ElementStates } from "../../types/element-states";
import { BrowserRouter as Router } from "react-router-dom";
import { getFibonacciNumbers, arrayTimeOut } from "./utils";
import { INumber } from "../../types/my-types";
import { Direction } from "../../types/direction";

describe("Тестирование функций алгоритма фибоначчи", () => {
  test("Функция алгоритма фибоначчи, если число больше 1", () => {
    const testArr = [1,1,2,3,5,8,13,21];

    expect(getFibonacciNumbers(7)).toEqual(testArr);
  });
  test("Функция алгоритма фибоначчи, если число === 0", () => {
    expect(getFibonacciNumbers(0)).toEqual([1]);
  });
  test("Функция отрисовки числового массива отрабатывается корректно", async() => {
    const setState = jest.fn() as React.Dispatch<React.SetStateAction<string[]>>;
    const loader = jest.fn() as (value: React.SetStateAction<boolean>) => void;
    const array = ['1','2','3','4','5','6'];
    const arrayNumber = await arrayTimeOut(array, setState, loader)
    expect(arrayNumber).toEqual(array);
  });
})