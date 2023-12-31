interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getTeil: () => T | null;
  getEl: () => (T | null)[];
  clear: () => void;
  isEmpty: () => boolean;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    const item = this.container[this.head];
    delete this.container[this.head % this.size];
    this.head++;
    this.length--;
    return item;
  };

  peak = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head];
  };

  getTeil = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.tail - 1];
  };

  getEl = () => {
    return this.container;
  };

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
    this.container = Array(this.size);
  };

  isEmpty = () => this.length === 0;
}
