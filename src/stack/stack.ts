import { ERROR_MSG } from "./constants";
export class Stack {
  store = [] as any[];

  get size() {
    return this.store.length;
  }

  push(item: any) {
    this.store.push(item);
  }

  pop() {
    if (this.store.length === 0) throw new Error(ERROR_MSG);
    return this.store.pop();
  }
}

export default Stack;
