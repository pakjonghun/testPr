import { ERROR_MSG } from "./constants";

interface INode {
  item: number | null;
  next: INode | null;
}

export class Stack {
  head: INode | null = null;

  get size() {
    let result = 0;
    let next: INode | null = this.head;
    while (next?.item) {
      next = next.next;
      result++;
    }
    return result;
  }

  push(item: any) {
    const node = { item, next: this.head };
    this.head = node;
  }

  pop() {
    if (this.head == null) throw new Error(ERROR_MSG);
    const node = this.head;
    this.head = this.head.next;
    return node.item;
  }

  get peek() {
    if (this.size === 0) throw new Error(ERROR_MSG);
    return this.head?.item || null;
  }
}

export default Stack;
