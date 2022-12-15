export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  search = async (keyword) => {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  };

  channelImageURL = async (id) => {
    return this.apiClient
      .channels({ params: { part: "snippet", id } })
      .then((res) => res.data.items[0].snippet.thumbnails.default.url);
  };

  relatedVideos = async (id) => {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          relatedToVideoId: id,
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  };

  #searchByKeyword = async (keyword) => {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          q: keyword,
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  };

  #mostPopular = async () => {
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostPopular",
        },
      })
      .then((res) => res.data.items);
  };
}
