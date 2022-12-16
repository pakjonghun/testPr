import { render, screen, waitFor } from "@testing-library/react";
import { Route } from "react-router-dom";
import { withAllContext, withRoute } from "../../tests/utils";
import ChannelInfo from "../ChannelInfo";

const jestFn = jest.fn();

//구조를 mock 해주면 작동안한다 미리 구조를 만들어 놓고 그 안에 jest.fn 을 채워야한다.
const mock = {
  channelImageURL: jestFn,
};

describe("channelInfo", () => {
  afterEach(() => {
    jestFn.mockReset();
  });

  it("with image", async () => {
    renderChannelInfo(() => "url");

    await waitFor(() => screen.findByText("name"));
    expect(jestFn).toBeCalledTimes(1);
    expect(jestFn).toHaveBeenCalledWith("id");
    const img = await screen.findByRole("img");
    expect(img).toHaveAttribute("alt", "name");
    expect(img).toHaveAttribute("src", "url");
  });

  it("no image", async () => {
    renderChannelInfo(() => "");

    await waitFor(() =>
      expect(screen.queryByRole("img")).not.toBeInTheDocument()
    );
    screen.getByText("name");
  });

  it("snapshot", async () => {
    const { asFragment } = renderChannelInfo(() => "url");

    expect(asFragment()).toMatchSnapshot();
  });

  it("snapShot with no img", () => {
    renderChannelInfo(() => "");
  });

  it("error", async () => {
    renderChannelInfo(() => {
      throw new Error("error");
    });

    expect(screen.queryByRole("img")).toBeNull();
  });

  function renderChannelInfo(cb) {
    jestFn.mockImplementation(cb);
    return render(
      withAllContext(
        withRoute(
          <Route path='/' element={<ChannelInfo id='id' name='name' />} />
        ),
        { youtube: mock }
      )
    );
  }
});
