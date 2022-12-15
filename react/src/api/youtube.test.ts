import Youtube from "./youtube";
import StubClient from "./stubClient";

const mocksearch = jest.fn(async () => ({ data: { id: 1, items: [] } }));
const mockvideos = jest.fn(async () => ({ data: { id: 1, items: [] } }));
const mockchannels = jest.fn(async () => ({ data: { id: 1, items: [] } }));

const mockSearch = jest.fn().mockImplementation(() => ({
  search: mocksearch,
  videos: mockvideos,
  channels: mockchannels,
}));
const item = new StubClient();

describe("youtube", () => {
  let youtube;
  beforeEach(() => {
    console.log(item);
    youtube = new Youtube(item);
  });

  it("test", async () => {
    const r = await youtube.search("key");
  });
});
