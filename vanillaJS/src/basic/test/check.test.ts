import { check } from "../check";

describe("check", () => {
  const predicate = jest.fn(() => false).mockImplementationOnce(() => true);
  const onSuccess = jest.fn();
  const onFail = jest.fn();

  it("첫번째 콜에서 true 를 반환하는 predicate", () => {
    check(predicate, onSuccess, onFail);
    expect(predicate).toBeCalled();
    expect(onSuccess).toBeCalledWith("yes");

    check(predicate, onSuccess, onFail);
    expect(predicate).toBeCalled();
    expect(onFail).toBeCalledWith("no");
  });
});
