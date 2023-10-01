import React from "react";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Тестирование компонента Circle", () => {
  it("Пустой круг без ошибок", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг с буквами без ошибок", () => {
    const tree = renderer.create(<Circle letter="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг с head без ошибок", () => {
    const tree = renderer.create(<Circle head="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг с react-элементом в head без ошибок", () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг с tail без ошибок", () => {
    const tree = renderer.create(<Circle tail="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг с react-элементом в tail без ошибок", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг с index без ошибок", () => {
    const tree = renderer.create(<Circle index={0} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг с пропом isSmall === true без ошибок", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг в состоянии default без ошибок", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг в состоянии changing без ошибок", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг в состоянии modified без ошибок", () => {
    const tree = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
