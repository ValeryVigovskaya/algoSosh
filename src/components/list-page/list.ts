export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  addByIndex: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  private length: number;
  constructor(container: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.length = 0;
    container.forEach((item) => this.append(item));
  }

  append(element: T) {
    const newNode = new Node(element);

    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }
    this.tail.next = newNode;

    this.tail = newNode;
    this.length++;
    this.size++;
    return this;
  }

  prepend(element: T) {
    const node = new Node(element, this.head);
    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }
    this.length++;
    this.size++;
    // Возвращаем весь список.
    return this;
  }

  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);
      let trav;
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        while (currIndex++ < index) {
          trav = curr;
          if (curr) {
            curr = curr.next;
          }
        }
        // добавить элемент
        if (trav) {
          node.next = curr;
          trav.next = node;
        }
      }
      this.size++;
      this.length++;
    }
  }

  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    }
    let start = this.head;
    if (index === 0) {
      if (this.head) this.head = this.head.next;
    } else {
      let curr = null;
      let currIndex = 0;
      while (currIndex++ < index) {
        curr = start;
        if (start) {
          start = start.next;
        }
      }
      if (curr?.next){
        curr.next = start?.next ? start.next : null;
      } 
    }
    this.size--;
    this.length--;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }
    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.size--;
    this.length--;
    return deletedHead;
  }

  deleteTail() {
    if (!this.tail) {
      return null;
    }
    const deletedTail = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deletedTail;
    }
    let currentNode = this.head;
    while (currentNode?.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }
    this.tail = currentNode;
    this.size--;
    this.length--;
    return deletedTail;
  }

  getSize() {
    return this.size;
  }

  toArray() {
    let curr = this.head;
    const array: T[] = [];
    while (curr) {
      array.push(curr?.value);
      curr = curr.next;
    }
    return array;
  }

  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}
