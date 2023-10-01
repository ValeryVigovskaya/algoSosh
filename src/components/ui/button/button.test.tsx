import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import {Button} from './button'

describe("Тестирование компонента Button", () => {
it('Кнопка с текстом без ошибок', () => {
    const tree = renderer
      .create(<Button text="Teст"/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Кнопка без текста без ошибок', () => {
    const tree = renderer
      .create(<Button/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Кнопка заблокирована без ошибок', () => {
    const tree = renderer
      .create(<Button disabled={true}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Кнопка с индикацией загрузки без ошибок', () => {
    const tree = renderer
      .create(<Button isLoader={true}/>)
      .toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('Успешность вызова колбека при клике на кнопку', () => {
    const callback = jest.fn();
    render(<Button onClick={callback}/>)
        // Находим кнопку
      const button = screen.getByRole('button');
        // Имитируем нажатие на кнопку
    fireEvent.click(button);
        // Проверяем, что колбек был вызван
    expect(callback).toHaveBeenCalled();
})
})