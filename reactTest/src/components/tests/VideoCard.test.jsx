import React from "react";
import { Link, Route, useLocation } from "react-router-dom";
import { formatAgo } from "../../util/date";
import VideoCard from "../VideoCard";
import { video } from "../../tests/videos";
import userEvent from "@testing-library/user-event";
import { withRoute } from "../../tests/utils";
import renderer from "react-test-renderer";
const { render, screen } = require("@testing-library/react");

const {
  id,
  snippet: { channelTitle, publishedAt, thumbnails, title },
} = video;

describe("videoCard", () => {
  it("존재 해야한다.", () => {
    render(withRoute(<Route path='/' element={<VideoCard video={video} />} />));
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
  });

  it("속성이 데이터와 같아야 한다", () => {
    render(withRoute(<Route path='/' element={<VideoCard video={video} />} />));

    const img = screen.getByRole("img");
    expect(img.src).toBe(thumbnails.medium.url);
    expect(img.alt).toBe(title);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
  });

  it("카드 클릭시 디테일 페이지로 비디오 데이터와 함께 이동한다", () => {
    function LocationStatDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }

    render(
      withRoute(
        <>
          <Route path='/' element={<VideoCard video={video} />} />
          <Route
            path={`/videos/watch/${video.id}`}
            element={<LocationStatDisplay />}
          />
        </>
      )
    );

    const li = screen.getByRole("listitem");
    userEvent.click(li);

    expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
  });

  // it("타입이 리스트이면 스탕일이 다르다", () => {
  //   render(
  //     withRoute(
  //       <Route path='/' element={<VideoCard video={video} type='list' />} />
  //     )
  //   );
  //   const li = screen.getByRole("listitem");
  //   expect(li).toHaveClass("flex gap-1 m-2");

  //   const img = screen.getByRole("img");
  //   expect(img).toHaveClass("w-60 mr-2");
  // });

  // it("타입이 없으면 스타일이 다르다", () => {
  //   render(withRoute(<Route path='/' element={<VideoCard video={video} />} />));
  //   const li = screen.getByRole("listitem");
  //   expect(li).not.toHaveClass("flex gap-1 m-2");

  //   const img = screen.getByRole("img");
  //   expect(img).toHaveClass("w-full");
  // });

  it("list 타입을 넣을 경우 클래스를 확인한다", () => {
    const tree = renderer
      .create(
        withRoute(
          <Route path='/' element={<VideoCard video={video} type='list' />} />
        )
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("list 타입을 안 넣을 경우 클래스를 확인한다", () => {
    const tree = renderer
      .create(
        withRoute(<Route path='/' element={<VideoCard video={video} />} />)
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
