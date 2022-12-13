// const mockProduct = [
//   {
//     id: 1,
//     available: true,
//   },
//   {
//     id: 2,
//     available: true,
//   },
//   {
//     id: 3,
//     available: false,
//   },
// ];

// import ProductClient from "../product";
// import ProductService from "../product-use";

// const mockFetchItems = jest.fn(async () => {
//   return mockProduct;
// });

// jest.mock("../product", () =>
//   jest.fn().mockImplementation(() => ({ fetchItems: mockFetchItems }))
// );

// describe("productService", () => {
//   let product: ProductService;

//   beforeEach(() => {
//     product = new ProductService();
//   });

//   test("available item 3개", async () => {
//     await product.fetchAvailableItems();
//     expect(mockFetchItems).toBeCalled();
//   });

//   test("길이가 2다", async () => {
//     const r = await product.fetchAvailableItems();
//     expect(r).toHaveLength(2);
//   });
// });

import ProductClient from "../product";
import ProductService from "../product-use";

///블록 바깥에서 해야 한다 그래야 작동한다.
//jest -init 할 때 clear mock 을 true 로 환경설정 해서 beforeEach 에서 별도로 clearMock 안해줘도 된다.
const mockProducts = [{ id: 1, available: true }];

const mockFetchProduct = jest.fn(async () => mockProducts);
jest.mock("../product", () =>
  jest.fn().mockImplementation(() => ({ fetchItems: mockFetchProduct }))
);

describe("mock 남용 하기", () => {
  let client: ProductClient;
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();

    //아래 함수는 수행안해도 된다. 설정에 trueh로 되 있어서 그렇다.
    // mockFetchProduct.mockClear();
    // (ProductClient as jest.Mock).mockClear();
  });

  it("1번 클라이언트가 호출된다", async () => {
    await productService.fetchAvailableItems();
    expect(mockFetchProduct).toBeCalledTimes(1);
  });

  it("길이가 2다", async () => {
    const result = await productService.fetchAvailableItems();
    expect(result).toHaveLength(1);
    expect(mockFetchProduct).toBeCalledTimes(1);
  });
});
