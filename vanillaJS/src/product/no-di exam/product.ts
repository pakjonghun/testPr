export default class ProductClient {
  fetchItems() {
    return fetch("http://example.com/login/id+password").then((response) =>
      response.json()
    );
  }
}
