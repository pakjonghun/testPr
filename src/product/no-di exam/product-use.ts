import ProductClient from "./product";
export default class ProductService {
  productClient: any;
  constructor(productClient: any) {
    this.productClient = productClient;
  }

  fetchAvailableItems = () => {
    return this.productClient
      .fetchItems()
      .then((items: any) => items.filter((item: any) => item.available));
  };
}
