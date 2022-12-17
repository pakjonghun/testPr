import { Route } from "react-router-dom";
import { withRoute } from "../../tests/utils";
import VideoDetail from "../VideoDetail";
import { videos } from "../../tests/videos";
import { render } from "@testing-library/react";

const ChannelInfo = jest.mock("../../components/ChannelInfo.jsx");
const ReleasedVideos = jest.mock("../../components/RelatedVideos.jsx");

describe("videoDetail", () => {
  // beforeEach(() => {
  //   ChannelInfo.resetAllMocks();
  //   ReleasedVideos.resetAllMocks();
  // });

  it("should display state data", () => {
    render(
      withRoute(<Route path='/' element={<VideoDetail />} />, [
        {
          state: { video: videos[0] },
          path: "/",
          key: "fake-key",
        },
      ])
    );
  });
});

function a(a) {
  return "asdf";
}

function b(b) {
  return 1;
}
