// 성민이 자료구조
class Sungmin {
    constructor(time, prior){
        this.workingTime = time; // 일하는 속도
        this.prior = prior; // 누가 더 짬이 높은 알바인지 선택
        this.handledList = []; // peek 했던 선물을 넣는 리스트
    }
    peek(index){
        this.handledList.push(index);
    }
}
// 지수 자료구조
class Jisoo {
    constructor(time, prior){
        this.workingTime = time; 
        this.prior = prior;
        this.handledList = [];
    }
    peek(index){
        this.handledList.push(index);
    }
}
// 선물 자료구조
class Gift {
    constructor(idx){
        this.index = idx; // 선물 번호
        this.next = null; // 다음 선물을 가리키는 포인터
    }
}
// 큐 자료구조
class Queue {
    constructor(){
        this.oldest = null; // 가장 오래된 노드
        this.tail = null; // 꼬리 노드
        this.size = 0; // 큐 사이즈
    }
    push(val){ // 입력 O(1)
        const newGift = new Gift(val); 
        if(this.oldest === null){
            this.oldest = newGift;
            this.tail = newGift;
            this.size += 1;
        }else{
            this.tail.next = newGift;
            this.tail = newGift;
            this.size += 1;
        }
    }

    pop(){ // 출력 O(1)
        const popGift = this.oldest;
        this.oldest = this.oldest && this.oldest.next;
        this.size -= 1;
        return popGift;
    }

    peek(){ // 출력 O(1)
        const peekGift = this.oldest;
        return peekGift;
    }

    length(){ // 길이 출력 O(1)
        return this.size;
    }
}

// 피고용인들 자료구조 세팅
function setEmployee(empList){
    const sungmin = new Sungmin(parseInt(empList[0]), 1); // time, prior
    const jisoo = new Jisoo(parseInt(empList[1]), 0);
    const giftQueue = new Queue();
    idx = 1;
    while(idx <= parseInt(empList[2])){
        giftQueue.push(idx);
        idx += 1;
    }
    return {sungmin, jisoo, giftQueue};
}

// 선물 세팅
function setGift(totalGiftCnt){
    let idx = 0;
    const giftQueue = new Queue();
    while(idx < totalGiftCnt){
        giftQueue.push(idx+1);
        idx += 1;
    }
    return giftQueue;
}

// 주문으로부터 선물 큐 세팅
function makeQueueFromOrder(sungmin, jisoo, customerInform){
    const redQueue = new Queue();
    const blueQueue = new Queue();
    let blueEndTime = 0; // 파란선물 포장 완료 시간
    let redEndTime = 0; // 빨간 선물 포장 완료 시간
    let totalGiftCnt = 0; // 총 선물 수
    for(const i in customerInform){
        const order = customerInform[i];
        const startTime = parseInt(order[0]); // 포장 시작 시간
        const color = order[1]; // 선물 색깔
        const iter = parseInt(order[2]); // 반복횟수
        let idx = 0;
        if(color === "B"){ // 만약 파란 선물이 주문들어오면
            if(startTime > blueEndTime){ // 종료시간이 시작시간보다 작으면
                blueEndTime = startTime;
            } 
            while(idx < iter){ // 반복 시작
                blueQueue.push(blueEndTime + sungmin.workingTime * idx); // 시작 시간따라 선물 큐 입력
                idx += 1;
            }
            blueEndTime = blueEndTime + sungmin.workingTime * idx; // 종료시간 갱신
        }else{
            if(startTime > redEndTime){
                redEndTime = startTime;
            }
            while(idx < iter){
                redQueue.push(redEndTime + jisoo.workingTime * idx);
                idx += 1;
            }
            redEndTime = redEndTime + jisoo.workingTime * idx;
        }
        totalGiftCnt += iter;
    }
    return { redQueue, blueQueue, totalGiftCnt };
}

// 선물 포장 큐를 하나씩 뜯어가면서 누가 잘못했나 찾는다 O(n) << 정렬은 보통 nLog(n) 걸림
function findWhosGift(set, customerInfo){
    const customerInform = customerInfo; //time, color, iter
    const { sungmin, jisoo } = setEmployee(set); // Btime, Rtime, customer length
    const { redQueue, blueQueue, totalGiftCnt } = makeQueueFromOrder(sungmin, jisoo, customerInform);
    const giftQueue = setGift(totalGiftCnt); // 총 선물 큐 세팅
    const sungminCnt = blueQueue.length(); // 성민이가 처리한 총 선물 수 
    const jisooCnt = redQueue.length(); // 지수가 처리한 총 선물 수
    while(giftQueue.length() != 0){
        const red = redQueue.peek() && redQueue.peek().index; // 빨간 선물 주문 시작 시간
        const blue = blueQueue.peek() && blueQueue.peek().index; // 파란 선물 주문 시작 시간 
        if(red === blue){ // 두 주문 시간이 같으면 
            if(sungmin.prior > jisoo.prior){ // 짬이 더 높은 알바가
                sungmin.peek(giftQueue.pop().index); // 선물을 집는다
                blueQueue.pop();
                if(blueQueue.peek() && blueQueue.peek().index !== red){ // 일하는 속도가 0인 녀석이 선물포장을 마칠때까지 기다려야한다
                    jisoo.peek(giftQueue.pop().index);
                    redQueue.pop();
                }
            } else {
                jisoo.peek(giftQueue.pop().index);
                redQueue.pop();
                if(redQueue.peek() && redQueue.peek().index !== blue){
                    sungmin.peek(giftQueue.pop().index);
                    blueQueue.pop();
                }
            }
        } else if (red && (red < blue) || !blue) { // 빨간 선물 주문 시작 시간이 더 빠를 때 선물 집어가기
            jisoo.peek(giftQueue.pop().index);
            redQueue.pop();
        } else if (blue && (blue < red) || !red) { // 파란 선물 주문 시작 시간이 더 빠를 때 선물 집어가기
            sungmin.peek(giftQueue.pop().index);
            blueQueue.pop();
        }
    }
    return {sungmin, sungminCnt, jisoo, jisooCnt};
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = [];
rl.on('line', function (line) {
  input.push(line)
}).on('close', function () {
    let set = input[0].split(' ');
    const customerInform = []
    for(let i in input){
        if(i !== "0"){
            let li = input[i].split(' ');
            customerInform.push(li);
        }
    }
  const {sungmin, sungminCnt, jisoo, jisooCnt} = findWhosGift(set, customerInform);
  let sungminText = "";
  let jisooText = "";
  for(let i in sungmin.handledList){
    sungminText += sungmin.handledList[i] + " ";
  }
  for(let i in jisoo.handledList){
    jisooText += jisoo.handledList[i] + " ";
  }
  console.log(String(sungminCnt));
  console.log(sungminText);
  console.log(String(jisooCnt));
  console.log(jisooText);
  process.exit();
});