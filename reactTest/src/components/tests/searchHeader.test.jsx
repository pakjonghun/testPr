import React from "react";
import { logRoles, render, screen } from "@testing-library/react";
import { Route } from "react-router-dom";
import { withRoute } from "../../tests/utils";
import SearchHeader from "../SearchHeader";
import userEvent from "@testing-library/user-event";

describe("searchCard", () => {
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
});
