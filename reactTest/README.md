## 스냅샷 테스트

- 정적인, 동적도 됨 ui 검사(ui 데 있어야하는 클래스 데이터 등)

```
  //동적 스냅샷, 비동기
  it("snapshot", async () => {
      jestFn.mockRejectedValue("url");

      const { asFragment } = render(
        withAllContext(
          withRoute(
            <Route path='/' element={<ChannelInfo id='id' name='name' />} />
          ),
          { youtube: mock }
        )
      );

      expect(asFragment()).toMatchSnapshot();
    });

  //정적 스냅샷, 비동기
    it("snapShot with no img", () => {
      jestFn.mockResolvedValue("");

      renderer.create(
        withAllContext(
          withRoute(
            <Route path='/' element={<ChannelInfo name='name' id='id' />} />
          ),
          { youtube: mock }
        )
      );
    });
```

- 좀더 명시적으로 promise 를 반환하는 함수 일 경우

```
  //함수라는 것을 표현하는 방식이다.
  jestFn.mockImplementation(() => "");

  //아래와 같이 해도 되지만 함수가 아닌 값을 반환하므로 명확하지가 않다.
  jestFn.mockResolveValue("");
```
