import UserService from "../user_service";

const mockUser = {
  id: 1,
  password: 1,
};

const mockLogin = jest.fn(
  async (id: number | string, pw: number | string) => mockUser
);

const mockClient = jest.fn().mockImplementation(() => ({
  login: mockLogin,
}));

describe("user login", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(new mockClient());
  });

  it("before isLogin", async () => {
    expect(userService.isLogedIn).toBeFalsy();
  });

  it("after login", async () => {
    await userService.login(1, 1);
    expect(userService.isLogedIn).toBeTruthy();
    expect(mockLogin).toBeCalledWith(1, 1);
  });

  it("retry login", async () => {
    await userService.login(1, 1);
    expect(userService.isLogedIn).toBeTruthy();
    expect(mockLogin).toBeCalledWith(1, 1);

    expect(userService.isLogedIn).toBeTruthy();
    await userService.login(1, 1);
    expect(mockLogin).not.toBeCalledTimes(2);
  });
});
