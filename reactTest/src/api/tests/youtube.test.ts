import YCI from "../youtube";

const mockSearch = jest.fn();

const mockVideo = jest.fn();

const mockClient = jest.fn().mockImplementation(() => ({
  search: mockSearch,
  videos: mockVideo,
}));

const mockInstance = new mockClient();

describe("api youtube test", () => {
  let youtube;
  beforeEach(() => {
    youtube = new YCI(mockInstance);
  });

  it("search 빈 배열이 반환되야 한다", async () => {
    mockSearch.mockResolvedValue({ data: { items: [] } });
    const result = await youtube.search("key");
    expect(mockSearch).toBeCalledTimes(1);
    expect(result).toEqual([]);
  });

  it("videos 빈 배열이 반환되야 한다", async () => {
    mockVideo.mockResolvedValue({ data: { items: [] } });
    const result = await youtube.search();
    expect(mockVideo).toBeCalledTimes(1);
    expect(result).toEqual([]);
  });
});
