export default class StubClient {
  async search({ params }) {
    return { data: { id: 1, items: [{ id: 1 }] } };
  }
  async videos() {
    return { data: { id: 1, items: [{ id: 1 }] } };
  }
  async channels() {
    return { data: { id: 1, items: [{ id: 1 }] } };
  }
}
