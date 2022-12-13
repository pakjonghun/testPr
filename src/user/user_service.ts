export default class UserService {
  userClient: any;
  isLogedIn: boolean;
  constructor(userClient: any) {
    this.userClient = userClient;
    this.isLogedIn = false;
  }

  login(id: string | number, password: string | number) {
    if (!this.isLogedIn) {
      //return fetch('http://example.com/login/id+password') //
      // .then((response) => response.json());
      return this.userClient
        .login(id, password) //
        .then((data: any) => (this.isLogedIn = true));
    }
  }
}
