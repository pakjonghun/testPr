import { render } from "@testing-library/react";
import React from "react";
import { Route } from "react-router-dom";
import { video } from "../../tests/videos";
import VideoCard from "../VideoCard";
import { withRoute } from "../../tests/utils";

const {
  id,
  snippet: { channelTitle, publishedAt, thumbnails, title },
} = video;

describe("videoCard", () => {
  it("존재 해야한다.", () => {
    render(withRoute(<Route path='/' element={<VideoCard video={video} />} />));
    // const img = screen.getByRole("img");
    // expect(img).toBeInTheDyarnocument();
  });
});
