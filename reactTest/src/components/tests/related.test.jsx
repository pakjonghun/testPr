/* eslint-disable testing-library/prefer-query-by-disappearance */
import { withAllContext, withRoute } from "../../tests/utils";
import { Route } from "react-router-dom";
import RelatedVideos from "../RelatedVideos";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { videos } from "../../tests/videos";

const jestFn = jest.fn();

const cb = () => videos;

const mock = {
  relatedVideos: jestFn,
};

describe("relatedVideo Test", () => {
  afterEach(() => {
    jestFn.mockReset();
  });

  it("정확히 랜더링 되야 한다", async () => {
    const { asFragment } = renderComponent(cb);

    expect(asFragment()).toMatchSnapshot();

    const list = await screen.findByRole("list");
    expect(list).toBeInTheDocument();
  });

  it("오류가 뜨면 something is wrong 가 떠야한다", async () => {
    const errorMessage = "Something is wrong 😖";

    renderComponent(() => {
      throw new Error("error");
    });

    const errorParagraph = await screen.findByText(errorMessage);
    expect(errorParagraph).toBeInTheDocument();
  });

  it("로딩메세지가 떠야한다.", async () => {
    const loadingMessage = "Loading...";

    const { asFragment } = renderComponent(cb);
    expect(jestFn).toHaveBeenCalledWith("id");
    await waitForElementToBeRemoved(screen.queryByText(loadingMessage));
    const list = await screen.findByRole("list");
    expect(list).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  function renderComponent(cb) {
    jestFn.mockImplementation(cb);

    return render(
      withAllContext(
        withRoute(<Route path='/' element={<RelatedVideos id='id' />} />),
        {
          youtube: mock,
        }
      )
    );
  }
});
