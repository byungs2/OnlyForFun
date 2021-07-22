// 단방향
class Node {
  constructor(val) {
    this.data = val;
    this.next = null;
  }
  input(val) {
    let pointer = this;
    while (pointer.next !== null) {
      pointer = pointer.next;
    }
    pointer.next = new Node(val);
  }
  deleteNode(delNode) {
    let pointer = this;
    // head update
    if (pointer === delNode) {
      if (pointer.next !== null) {
        pointer.data = pointer.next.data;
        pointer.next = pointer.next.next;
      } else {
        // 노드 자체를 어떻게 삭제할 것인가
        pointer = null;
      }
    } else {
      while (pointer.next !== delNode) {
        pointer = pointer.next;
      }
      pointer.next = delNode.next;
    }
  }
  findOne(val) {
    let pointer = this;
    if (pointer.data === val) {
      return pointer;
    } else {
      while (pointer.next.data !== val) {
        pointer = pointer.next;
      }
      return pointer.next;
    }
  }
  findAll(val) {
    let pointer = this;
    const nodeList = [];
    while (pointer.next !== null) {
      if (pointer.data === val) {
        nodeList.push(pointer);
      }
      pointer = pointer.next;
    }
    if (pointer.data === val) {
      nodeList.push(pointer);
    }
    return nodeList;
  }
}

// 비정렬 연결 리스트 중복 문자 제거
// const head = new Node("head");
// head.input("a");
// head.input("a");
// head.input("b");
// console.log(head);

// #1 with buffer
// hash function
// function hashMap(val) {
//   const num = val.charCodeAt(0);
//   return num % 5;
// }
// const hashList = [-1, -1, -1, -1, -1];
// let next = head;
// while (next !== null) {
//   const index = hashMap(next.data);
//   hashList[index] = next.data;
//   next = next.next;
// }
// const newHead = new Node("head");
// console.log(hashList);
// hashList.forEach((i) => {
//   if (i !== -1 && i !== "head") {
//     newHead.input(i);
//   }
// });
// console.log(newHead);

// #2 without buffer and with two pointer
// while (next !== null) {
//   let secondNext = next.next;
//   const currentData = next.data;
//   while (secondNext !== null) {
//     if (secondNext.data === currentData) {
//       head.deleteNode(secondNext);
//     }
//     secondNext = secondNext.next;
//   }
//   next = next.next;
// }
// console.log(head);

// 뒤에서 K번째 노드 검색
// const K = 3;
const head = new Node("head");
const secondHead = new Node("head");
let cnt = 0;
while(cnt < 7){
  cnt += 1;
  head.input(cnt);
  secondHead.input(cnt);
}

// let counter = 0;
// let pointer = head;
// const valList = [];
// while(pointer.next !== null){
//   counter += 1;
//   valList.push(pointer.data);
//   pointer = pointer.next 
// }
// const newHead = new Node("head");
// console.log(valList);
// console.log(valList[counter -K -1]);

// head 접근 없이 임의의 삭제할 노드가 주어졌을 때 이를 삭제하는 방법
// function deleteSpecificNodeWithOutHead(node){
//   if(node.next !== null){
//     node.data = node.next.data;
//     node.next = node.next.next;
//   }
// }

// deleteSpecificNodeWithOutHead(head.next.next);
// console.log(head);

// X값을 기준으로 연결 리스트 나누기
// const X = 3;
// const smallerNodes = new Node("head");
// const biggerNodes = new Node("head");
// let pointer = head;
// while(pointer.next !== null){
//   if(pointer.data < X){
//     smallerNodes.input(pointer.data);
//   }else if(pointer.data > X){
//     biggerNodes.input(pointer.data);
//   }else{
//     biggerNodes.data = X;
//   }
//   pointer = pointer.next;
// }
// smallerNodes.input(biggerNodes);
// console.log(smallerNodes);

// 두 연결 리스트를 더하여 새로운 리스트를 만들 되 십진법을 따를 것

// 각 노드의 데이터를 더한 새로운 Node 생성
// 새로 생성된 노드를 순회하며 값이 10보다 크다면 해당 노드 next에 1 더해주고 해당 노드에 -10 해줌
// 끝

// 순환 연결 리스트의 순환 시작점 알아내기
// 순환 리스트 생성
head.next.next = head;
console.log(head);