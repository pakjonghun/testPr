export default class UserClient {
  login(id: string, password: string) {
    return fetch("http://example.com/login/id+password") //
      .then((response) => response.json());
  }
}
