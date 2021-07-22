class Node {
    constructor(val){
        this.data = parseInt(val);
        this.next = null;
    }
}

class Queue {
    constructor(){
        this.oldest = null;
        this.size = 0;
        this.tail = null;
    }
    push(val){
        const newNode = new Node(val);
        if(this.oldest === null){
            this.oldest = newNode;
            this.tail = newNode;
            this.size += 1;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
            this.size += 1;
        }
    }
    pop(){
        if(this.oldest !== null){
            const popNode = this.oldest;
            this.oldest = this.oldest.next;
            this.size -= 1;
            return popNode.data;
        } else {
            return undefined;
        }
    }
    peek(){
        if(this.oldest !== null){
            return this.oldest.data;
        } else {
            return undefined;
        }
    }
    length(){
        return this.size;
    }
}

function mergeSort(list){
    const len = list.length;
    const fList = slice(list, 0, parseInt(len/2));
    const sList = slice(list, parseInt(len/2), len);
    if(fList.length <= 1 && sList.length <= 1){
        const newList = SortingAndMerging(fList, sList);
        return newList;
    } else {
        const newfList = mergeSort(fList);
        const newsList = mergeSort(sList);
        const newList = SortingAndMerging(newfList, newsList);
        return newList;
    }
}

function slice(list, start, end){
    const newList = [];
    for(let i = start; i < end; i ++){
        newList.push(list[i]);
    }
    return newList;
}

function SortingAndMerging(fList, sList){
    const newList = [];
    const fQueue = new Queue();
    const sQueue = new Queue();
    for(let i in fList){
        fQueue.push(fList[i]);
    }
    for(let i in sList){
        sQueue.push(sList[i]);
    }
    while(fQueue.length() !== 0 || sQueue.length() !== 0){
        if(fQueue.peek() > sQueue.peek()){
            newList.push(sQueue.pop());
        }else if(fQueue.peek() <= sQueue.peek()){
            newList.push(fQueue.pop());
        }else{
            if(fQueue.length() !== 0){
                newList.push(fQueue.pop());
            } else {
                newList.push(sQueue.pop());
            }
        }
    }
    return newList;
}

console.log(mergeSort(["1","11", "112", "10"]));