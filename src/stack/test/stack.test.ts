import { ERROR_MSG } from "./../constants";
import { Stack } from "./../stack";
import StackClass from "../stack";

describe("stack", () => {
  let stack: Stack;
  const item = 1;
  const item2 = 2;
  beforeEach(() => {
    stack = new StackClass();
  });

  it("비어있는 저장소인 상태로 만들어진다", () => {
    expect(stack.size).toBe(0);
  });

  it("아이템을 넣으면 저장소에 들어간다", () => {
    stack.push(item);
    expect(stack.store).toEqual([1]);
    expect(stack.size).toBe(1);
  });

  it("아이템을 팝 하면 저장소에서 아이템이 삭제된다", () => {
    stack.push(item);
    expect(stack.store).toEqual([1]);
    stack.pop();
    expect(stack.store).toEqual([]);
  });

  it("아무것도 없는데 팝 하하면 오류가 뜬다", () => {
    expect(() => stack.pop()).toThrowError(ERROR_MSG);
  });

  it("먼저 들어간 아이템이 나중에 나온다", () => {
    stack.push(item);
    stack.push(item2);

    expect(stack.pop()).toBe(item2);
    expect(stack.pop()).toBe(item);
  });
});
