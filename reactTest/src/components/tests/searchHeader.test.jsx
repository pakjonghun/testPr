import React from "react";
import { render, screen } from "@testing-library/react";
import { Route } from "react-router-dom";
import { withRoute } from "../../tests/utils";
import SearchHeader from "../SearchHeader";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";

describe("searchCard", () => {
  it("snapShot", () => {
    const tree = renderer
      .create(withRoute(<Route path='/' element={<SearchHeader />} />))
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("랜더링 된 링크태그가 존재한다", () => {
    render(withRoute(<Route path='/' element={<SearchHeader />} />));
    expect(screen.getByText("Youtube")).toBeInTheDocument();
  });

  it("링크 클릭시 '/'로 이동한다", () => {
    function Home() {
      return <h1>home</h1>;
    }

    render(
      withRoute(
        <>
          <Route path='/' element={<Home />} />
          <Route path='/abc' element={<SearchHeader />} />
        </>,
        ["/abc"]
      )
    );

    const link = screen.getByRole("link");
    userEvent.click(link);
    expect(screen.getByRole("heading", { name: "home" })).toBeInTheDocument();
  });

  it("form 을 submit 시 'video/text'로 이동한다", () => {
    function Text() {
      return <h1>Text</h1>;
    }

    render(
      withRoute(
        <>
          <Route path='/' element={<SearchHeader />} />
          <Route path='/videos/' element={<Text />} />
        </>,
        ["/"]
      )
    );

    const button = screen.getByRole("button");
    userEvent.click(button);
    expect(screen.getByRole("heading", { name: "Text" })).toBeInTheDocument();
  });

  it("경로가 제대로 입력된 파라미터 대로 반영 된다", () => {
    render(
      withRoute(
        <>
          <Route path='/:keyword' element={<SearchHeader />} />
        </>,
        ["/bts"]
      )
    );

    expect(screen.getByDisplayValue("bts")).toBeInTheDocument();
  });

  it("인풋에 입력된 파라미터 대로 반영 된다", () => {
    const term = "abc";

    render(
      withRoute(
        <>
          <Route path='/:keyword' element={<SearchHeader />} />
          <Route path={`/videos/${term}`} element={<h1>{term}</h1>} />
        </>,
        ["/home"]
      )
    );

    expect(screen.getByDisplayValue("home")).toBeInTheDocument();
    const button = screen.getByRole("button");
    const input = screen.getByRole("textbox");
    userEvent.clear(input);
    userEvent.type(input, term);
    expect(screen.getByText(term)).toBeInTheDocument();
    expect(screen.getByDisplayValue(term)).toBeInTheDocument();
    userEvent.click(button);

    expect(screen.getByText(term)).toBeInTheDocument();
  });
});
