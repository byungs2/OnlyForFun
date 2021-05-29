function solution(bridge_length, weight, truck_weights) {
    var answer = 0;
    let time = 0;
    const originLen = truck_weights.length; // truck original length
    const truckQueue = new Queue(); // waiting truck
    const onBridgeQueue = new Queue(); // on bridge truck
    const doneTruck = []; // done truck
    for(let i in truck_weights){
        truckQueue.push(truck_weights[i]);
    }
    while(doneTruck.length !== originLen){
        const tempWeight = onBridgeQueue.totalWeight + truckQueue.peek().weight;
        if(onBridgeQueue.peek() !== undefined){
            if((time - onBridgeQueue.peek().startTime) === bridge_length-1){
                doneTruck.push(onBridgeQueue.pop().weight);
            }
        }
        if(tempWeight <= weight){
            onBridgeQueue.push(truckQueue.peek().weight, time);
        }
        time += 1;
    }
    answer = time;
    return answer;
}

class Truck {
    constructor(val, time){
        this.weight = parseInt(val);
        this.next = null;
        this.startTime = parseInt(time);
    }
}

class Queue {
    constructor(){
        this.oldest = null;
        this.tail = null;
        this.totalWeight = 0;
        this.size = 0;
    }
    push(val, time){
        const newTruck = new Truck(val, time);
        if(this.oldest === null){
            this.oldest = newTruck;
            this.tail = newTruck;
            this.totalWeight += newTruck.weight;
            this.size += 1;
        } else {
            this.tail.next = newTruck
            this.tail = newTruck;
            this.totalWeight += newTruck.weight;
            this.size += 1;
        }
    }
    pop(){
        if(this.oldest !== null){
            const popNode = this.oldest;
            this.oldest = this.oldest.next;
            this.totalWeight -= popNode.weight;
            this.size -= 1;
            return popNode;
        } else {
            return undefined;
        }
    }
    peek(){
        if(this.oldest !== null){
            return this.oldest;
        } else {
            return undefined;
        }
    }
    length(){
        return this.size;
    }
}

console.log(solution(2,10,[7, 4, 5, 6]));