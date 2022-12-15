import React from "react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import { formatAgo } from "../../util/date";
import VideoCard from "../VideoCard";
import { video } from "./mockData";
import userEvent from "@testing-library/user-event";
const { render, screen } = require("@testing-library/react");

const {
  id,
  snippet: { channelTitle, publishedAt, thumbnails, title },
} = video;

describe("videoCard", () => {
  it("존재 해야한다.", () => {
    render(
      <MemoryRouter>
        <VideoCard video={video} />
      </MemoryRouter>
    );
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
  });

  it("속성이 데이터와 같아야 한다", () => {
    render(
      <MemoryRouter>
        <VideoCard video={video} />
      </MemoryRouter>
    );

    const img = screen.getByRole("img");
    expect(img.src).toBe(thumbnails.medium.url);
    expect(img.alt).toBe(title);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
  });

  it("카드 클릭시 디테일 페이지로 비디오 데이터와 함께 이동한다", () => {
    function LocationStatDisplay() {
      console.log(JSON.stringify(useLocation().state));
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path='/' element={<VideoCard video={video} />} />
          <Route
            path={`/videos/watch/${video.id}`}
            element={<LocationStatDisplay />}
          />
        </Routes>
      </MemoryRouter>
    );

    const li = screen.getByRole("listitem");
    userEvent.click(li);

    expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
  });
});
