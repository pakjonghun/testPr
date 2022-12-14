import ProductService from "../product-use";
import StubProductClient from "./stub_product_client";

describe("stub 사용해보기", () => {
  let product: ProductService;

  beforeEach(() => {
    const client = new StubProductClient();
    product = new ProductService(client);
  });

  it("길이 1의 결과", async () => {
    const result = await product.fetchAvailableItems();
    expect(result).toHaveLength(1);
  });
});
