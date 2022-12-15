import youtube from "../youtube";

const mockSearch = jest.fn();

const mockChannel = jest.fn(async (params) => ({
  data: {
    items: [],
  },
}));

const mockVideos = jest.fn();

const mockClient = jest.fn().mockImplementation(() => {
  return {
    search: mockSearch,
    videos: mockVideos,
    channels: mockChannel,
  };
});

const mockInstance = new mockClient();

describe("youtube api", () => {
  let youtubeService;
  beforeEach(() => {
    youtubeService = new youtube(mockInstance);
    mockClient.mockClear();
    mockSearch.mockClear();
  });

  it("서치가 호출되야 한다.", async () => {
    mockSearch.mockResolvedValue({ data: { items: [] } });
    await youtubeService.search("key");
    expect(mockSearch).toBeCalledTimes(1);
  });

  it("서치는 빈 배열이 반환되야 한다.", async () => {
    mockSearch.mockResolvedValue({ data: { items: [] } });
    const result = await youtubeService.search("key");
    expect(result).toEqual([]);
  });

  it("비디오 가 호출되야 한다", async () => {
    mockVideos.mockResolvedValue({ data: { items: [] } });
    await youtubeService.search();
    expect(mockVideos).toBeCalledTimes(1);
  });

  it("비디오는 빈 배열이 반환되어야 한다.", async () => {
    mockVideos.mockResolvedValue({ data: { items: [] } });
    const result = await youtubeService.search();
    expect(result).toEqual([]);
  });
});
