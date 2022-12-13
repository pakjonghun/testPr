//네트워크 의존하지 않으며 실제 mock data 를 사용해서 실제 처럼 작동하게 한다
export default class StubProductClient {
  async fetchItems() {
    return [
      { id: 1, available: true },
      { id: 2, available: false },
    ];
  }
}
