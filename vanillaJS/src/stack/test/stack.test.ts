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

  it("size 최초 비어있는 저장소인 상태로 만들어진다", () => {
    expect(stack.size).toBe(0);
  });

  it("push 아이템을 넣으면 저장소에 들어간다", () => {
    stack.push(item);

    //지역변수를 테스트 하면 리팩토링 하면 또 테코를 수정해야 하므로 하지 않는다!!
    // expect(stack.store).toEqual([1]);
    expect(stack.size).toBe(1);
  });

  it("pop 아무것도 없는데 팝 하하면 오류가 뜬다", () => {
    expect(() => stack.pop()).toThrowError(ERROR_MSG);
  });

  it("pop 아이템을 팝 하면 저장소에서 아이템이 삭제된다", () => {
    stack.push(item);
    expect(stack.size).toEqual(1);
    stack.pop();
    expect(stack.size).toEqual(0);
  });

  it("push,pop 먼저 들어간 아이템이 나중에 나온다", () => {
    stack.push(item);
    stack.push(item2);

    expect(stack.pop()).toBe(item2);
    expect(stack.pop()).toBe(item);
  });

  it("peek 아이템이 없으면 오류를 반환한다.", () => {
    expect(() => stack.peek).toThrowError(ERROR_MSG);
  });

  it("peek  은 마지막 아이템을 보여주기만 한다.", () => {
    stack.push(item);
    stack.push(item2);

    expect(stack.size).toBe(2);
    expect(stack.peek).toBe(item2);
    expect(stack.size).toBe(2);
  });
});
