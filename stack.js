class Node {
  constructor(val) {
    this.data = val;
    this.next = null;
  }
}
// min 값을 스택 노드에 집어넣으면 스택이 변해도 min value를 동적으로 할당 가능
// 혹은 stack을 하나 만들어서 최소값을 거기에 집어넣어서 노드와 매칭시킴
// 스택 안쪽에 이런식으로 넣어버리면 최소값 변동 시 O(n) 시간복잡도를 가지게 됨
class Stack {
  constructor() {
    this.top = null;
    this.minVal = null;
    this.size = 0;
  }
  push(Node) {
    if (this.minVal === null || Node.data < this.minVal) {
      this.minVal = Node.data;
    }
    if (this.top === null) {
      this.top = Node;
      this.size += 1;
    } else {
      Node.next = this.top;
      this.top = Node;
      this.size += 1;
    }
  }
  pop() {
    if (this.top !== null) {
      const popNode = this.top;
      this.top = this.top.next;
      this.size -= 1;
      return popNode.data;
    } else {
      return null;
    }
  }
  length() {
    return this.size;
  }
  min() {
    return this.minVal;
  }
  peek() {
    return this.top.data;
  }
}

class Queue {
  constructor() {
    this.fi = null;
  }
  push(Node) {
    if (this.fi === null) {
      this.fi = Node;
    } else {
      let pointer = this.fi;
      while (pointer.next !== null) {
        pointer = pointer.next;
      }
      pointer.next = Node;
    }
  }
  pop() {
    if (this.fi !== null) {
      const popNode = this.fi;
      this.fi = this.fi.next;
      return popNode.data;
    } else {
      return null;
    }
  }
}

// const stack = new Stack();
// const queue = new Queue();
// let cnt = 0;
// while (cnt < 10) {
//   cnt += 1;
//   queue.push(new Node(cnt));
//   stack.push(new Node(cnt));
// }
// while (cnt > 0) {
//   cnt -= 1;
//   console.log(queue.pop());
//   console.log(stack.pop());
// }
// console.log(queue);
// console.log(stack);

// #1 하나의 배열로 세 개의 스택을 구현하는 방법을 설명하라
// class ThreeStackInAList {
//   constructor(val) {
//     this.constSizeOfList = val;
//     this.constantList = [];
//   }
//   push(nStack,Node) {
//     this.constantList[nStack * this.constSizeOfList];
//   }
//   pop(nStack) {

//   }
// }

// #2 setOfStacks
class SetOfStacks {
  constructor(sizeOfEachStack) {
    this.stack = new Stack();
    this.next = null;
    this.back = null;
    this.maxSize = sizeOfEachStack;
  }
  push(Node) {
    let pointer = this;
    while (pointer.next !== null) {
      pointer = pointer.next;
    }
    if (pointer.stack.length() < this.maxSize) {
      pointer.stack.push(Node);
    } else {
      // 스택을 새로 생성
      pointer.next = new SetOfStacks(this.maxSize);
      pointer.next.back = pointer;
      pointer.next.stack.push(Node);
    }
  }
  pop() {
    let pointer = this;
    while (pointer.next !== null) {
      pointer = pointer.next;
    }
    const popNode = pointer.stack.pop();
    if (popNode !== null) {
      return popNode;
    } else {
      pointer.back.next = null;
      return pointer.back.stack.pop();
    }
  }
  popAt(setStack) {
    let pointer = this;
    while (pointer.next !== null) {
      if (pointer === setStack) {
        return pointer.stack.pop();
      }
      pointer = pointer.next;
    }
  }
}

// const setSt = new SetOfStacks(5);
// let cnt = 0;
// while(cnt < 20){
//   cnt += 1;
//   setSt.push(new Node(cnt));
// }

// #3 하노이 탑
const fRod = new Stack();
const sRod = new Stack();
const tRod = new Stack();

let cnt = 5;
while(cnt > 0){
  fRod.push(new Node(cnt));
  cnt -= 1
}
function hanoi(initRod, target, bridgeRod, diskCount){
  const cnt = diskCount;
  if(cnt > 0){
    hanoi(initRod, bridgeRod, target, cnt-1);
    target.push(new Node(initRod.pop()));
    hanoi(bridgeRod, target, initRod, cnt-1);
  }
}

hanoi(fRod, tRod, sRod, 5);
console.log(fRod);
console.log(tRod);

// #4 두개의 스택을 사용하여 큐를 구현하라
class QueueByTwoStack {
  constructor() {
    this.normalStack = new Stack();
    this.reverseStack = new Stack();
  }
  push(Node) {
    this.normalStack.push(Node);
  }
  makeItQueue() {
    const normalS = this.normalStack;
    let popVal = this.normalStack.pop();
    while (popVal !== null) {
      this.reverseStack.push(new Node(popVal));
      popVal = this.normalStack.pop();
    }
  }
  popQueue() {
    return this.reverseStack.pop();
  }
}

// const myQueue = new QueueByTwoStack();
// let cnt = 0;
// while(cnt < 5){
//   myQueue.push(new Node(cnt));
//   cnt += 1;
// }
// myQueue.makeItQueue();

// console.log(myQueue.popQueue());
// console.log(myQueue.popQueue());
// console.log(myQueue.popQueue());
// console.log(myQueue.popQueue());
// console.log(myQueue.popQueue());



// #5 고양이 개 보호소
class CatAndDogQueue {
  constructor() {
    this.oldest = null;
  }
  push(Node) {
    if (this.oldest === null) {
      this.oldest = Node;
    } else {
      let pointer = this.oldest;
      while (pointer.next !== null) {
        pointer = pointer.next;
      }
      pointer.next = Node;
    }
  }
  popAny() {
    const popNode = this.oldest;
    if (popNode !== null) {
      this.oldest = this.oldest.next;
      return popNode.data;
    } else {
      return null;
    }
  }
  popDog() {
    let pointer = this.oldest;
    while (pointer.next !== null) {
      if (pointer.data === "dog") {
        const popNode = pointer.data;
        pointer.data = pointer.next.data;
        pointer.next = pointer.next.next;
        return popNode;
      }
      pointer = pointer.next;
    }
  }
  popCat() {
    let pointer = this.oldest;
    while (pointer.next !== null) {
      if (pointer.data === "cat") {
        const popNode = pointer.data;
        pointer.data = pointer.next.data;
        pointer.next = pointer.next.next;
        return popNode;
      }
      pointer = pointer.next;
    }
  }
}

const dogCat = new CatAndDogQueue();
dogCat.push(new Node("cat"));
dogCat.push(new Node("dog"));
dogCat.push(new Node("dog"));
dogCat.push(new Node("cat"));
dogCat.push(new Node("dog"));
dogCat.push(new Node("cat"));

console.log(dogCat);
