## 테스트코드

### 개요

- 테스팅이란?

  - 버그 찾기
  - 제품 서비스(함수, 기능. ui, api, 성능) 품질 확인
  - 작동 검증 확인

- 테스트코드 작성 추세

  - 요즘 테스트코드 작성 추세 : 쉽고, 높은 커버리지, 빠른속도

- 왜 작성하는가?
- 제품 기능에 대한 자신감!
- 기능 정상동작 확인
- 요구사항 확인 만족 확률 증가
- 이슈 예측
- 버그 빠르게 발견
- 자신감 있는 리팩토링
- 손쉬운 유지보수
- 코드의 품질 향상
- 코드간 의존성 낮춤(디커플링)
- 좋은 문서화
- 개발시간 절약

- test 피라미드란?

  - 공통된 테스트 를 말함ㄴ
  - unit > integration > e2e
  - unit : 단위별로 테스트, 비용이 가장싸다, 제일 쉽다, 가장빠르다
  - intergation : 여러 단위를 묶어서 테스트, 중간 비용, 조금 어려움, 조금 느림
  - e2e : ui 사용자 테스트라고도 함, 사용자가 실제 사용하는 테스트, 비용 가장 많이 발생, 까다로움, 가장 느림
  - 유닛테스트만 할까? nono 여러개 함께 테스트 해 봐야 , 실제 사용자가 사용하는 테스트를 해봐야 함.!!

- TDD ? : 하던말던 개인자유 팀의 자유, **중요한 것은 메인에 넣을 때, 리뷰받기 전에, 푸시 전에 테코를 넣어서 머지 해야 함**

  - 테스트 먼저 작성 => 코드작성 => 테코 작성 => 코드작성 => 필요시 리팩토링 무한 반복 끝날때까지
  - 시스템 전반적 설계 향상, 요구 분석사항 이해, 개발 집중력 향상 효과가 있음
  - 좋은 문서화의 효과 때문에 테코를 작성해라!
  - 설계에 대한 고민을 할때도 TDD 사용 할 수도 있음
  - ui 코드와 business code 를 나눠서!!! business 로직과 ui 를 테스트 해보자!

- CI/CD
  - 모든 코드에 테코가 있을 때 ci/cd 가 더 효율적이다.

### 유닛테스트 용어

- runner : 실행후 결과 생성
- assertion : 테스트 조건, 비교를 통한 테스트 로직

## usage

- 깃을 사용한다면 변경된 부분만 자동

```
    "test": "jest --watch",
```

- 싹다 테스트 한다

```
    "test": "jest --watchAll",
```
