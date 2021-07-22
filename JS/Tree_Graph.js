class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.oldest = null;
    this.length = null;
  }
  push(Node) {
    console.log("========================")
    console.log("next root data!!", Node.next && Node.next.root.data);
    console.log("root data!", Node.root.data);
    console.log("oldest next tree node", this.oldest && this.oldest.next);
    console.log("oldest Tree", this.oldest && this.oldest.root && this.oldest.root.data)
    console.log("========================")
    let pointer = this.oldest;
    if (this.oldest === null) {
      this.oldest = Node;
    } else {
      // 환형리스트 생성됨 확인해봐야함
      while (pointer.next !== null) {
        pointer = pointer.next;
      }
      pointer.next = Node;
    }
    this.length += 1;
  }
  pop() {
    if (this.oldest !== null) {
      const popNode = this.oldest;
      this.oldest = this.oldest.next;
      popNode.next = null;
      return popNode;
    } else {
      return null;
    }
  }
  leng() {
    return this.length;
  }
}

// Simple complete binary tree
class binaryTree {
  constructor(rootNode) {
    this.root = rootNode;
    this.left = null;
    this.right = null;
    this.parent = null;
    this.next = null;
    this.isVisit = false;
  }
  push(Noder) {
    let pointer = this;
    // queue 생성
    const queue = new Queue();
    // 너비 우선 순회
    queue.push(pointer);
    while (queue.leng() !== 0) {
      pointer = queue.pop();
      if (pointer.left === null) {
        pointer.left = new binaryTree(new Node(null));
      }
      if (pointer.right === null) {
        pointer.right = new binaryTree(new Node(null));
      }
      if (pointer.left.root.data === null) {
        pointer.left.root = Noder;
        pointer.left.parent = pointer;
        pointer.next = pointer.left
        break;
      } else if (pointer.right.root.data === null) {
        pointer.right.root = Noder;
        pointer.right.parent = pointer;
        pointer.next = pointer.right
        break;
      } else {
        queue.push(pointer.left);
        queue.push(pointer.right);
      }
    }
  }
  peek() {
    return this.root;
  }
  visit() {
    if (!this.isVisit) {
      this.isVisit = true;
      return this.root.data;
    } else {
      return null;
    }
  }
}

function getHeight(inputTree) {
  if (inputTree !== null) {
    let leftHeight = getHeight(inputTree.left);
    let rightHeight = getHeight(inputTree.right);
    if (leftHeight > rightHeight) {
      return leftHeight + 1;
    } else {
      return rightHeight + 1;
    }
  } else {
    return 0;
  }
}

// 중위
function inOrder(inputTree) {
  if (inputTree !== null && inputTree.root.data !== null) {
    inOrder(inputTree.left);
    console.log("inOrder", inputTree.root.data);
    inOrder(inputTree.right);
  }
}

// 전위
function preOrder(inputTree) {
  if (inputTree !== null && inputTree.root.data !== null) {
    console.log("preOrder", inputTree.root.data);
    preOrder(inputTree.left);
    preOrder(inputTree.right);
  }
}

// 후위
function postOrder(inputTree) {
  if (inputTree !== null && inputTree.root.data !== null) {
    postOrder(inputTree.left);
    postOrder(inputTree.right);
    console.log("postOrder", inputTree.root.data);
  }
}

const tree = new binaryTree(new Node(0));
tree.push(new Node(1));
tree.push(new Node(2));
tree.push(new Node(3));
tree.push(new Node(4));
// tree.push(new Node(5));
// tree.push(new Node(6));
// tree.push(new Node(7));
// tree.push(new Node(8));
// tree.push(new Node(9));
// tree.push(new Node(10));
// tree.push(new Node(11));

// inOrder(tree);
// preOrder(tree);
// postOrder(tree);
// console.log(getHeight(tree));
// function isBalanced(inputTree){

// }
