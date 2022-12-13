import ProductClient from "./product";
export default class ProductService {
  productClient: any;
  constructor() {
    this.productClient = new ProductClient();
  }

  fetchAvailableItems = () => {
    return this.productClient
      .fetchItems()
      .then((items: any) => items.filter((item: any) => item.available));
  };
}
