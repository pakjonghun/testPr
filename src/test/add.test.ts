import Calculator from "../calculate";

describe("calculate", () => {
  let calculate: Calculator;
  beforeEach(() => {
    calculate = new Calculator();
  });

  it("벨류를 셋팅 한다", () => {
    const init = 1;
    calculate.set(init);
    expect(calculate.value).toBe(init);
  });

  it("벨류를 0으로 만든다", () => {
    calculate.clear();
    expect(calculate.value).toBe(0);
  });

  it("100보다 값이 클 경우 오류를 반환한다", () => {
    const error = "Value can not be greater than 100";
    expect(() => calculate.add(101)).toThrow(error);
  });

  it("100보자 작은수를 벨류에 할당한다", () => {
    calculate.add(50);
    expect(calculate.value).toBe(50);
  });

  it("뺄셈을 한다", () => {
    calculate.subtract(10);
    expect(calculate.value).toBe(-10);
  });

  it("곱셈을 한다", () => {
    calculate.multiply(10);
    expect(calculate.value).toBe(0);
  });

  describe("divide", () => {
    it(" 0/0=NaN", () => {
      calculate.divide(0);
      expect(calculate.value).toBe(NaN);
    });

    it("0/n=0", () => {
      calculate.divide(100);
      expect(calculate.value).toBe(0);
    });

    it("n/0=Infinity", () => {
      calculate.set(1);
      calculate.divide(0);
      expect(calculate.value).toBe(Infinity);
    });
  });
});
