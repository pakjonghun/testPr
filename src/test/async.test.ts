import { async } from "../async";

it("오류가 발생하는 비동기 함수", async () => {
  try {
    await async(true);
  } catch (e) {
    expect(e).toMatch("error");
  }
});

it("객체를 반환하는 비동기 함수.", async () => {
  try {
    const result = await async(false);
    expect(result).toStrictEqual({ status: 200, action: "action" });
  } catch (err) {
    //
  }
});

it("비동기 다른방법 꼭 return 을 해줘야함", () => {
  return async(true).catch((err) => expect(err).toMatch("error"));
});

it("비동기 다른방법 done 을 호출함, 느리고 코드도 길어짐", (done) => {
  async(true).catch((err) => expect(err).toMatch("error"));
  done();
});

it("resolve 사용", () => {
  return expect(async(false)).resolves.toEqual({
    status: 200,
    action: "action",
  });
});

it("reject 사용", () => {
  return expect(async(true)).rejects.toMatch("error");
});
