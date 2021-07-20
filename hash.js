function solution(participant, completion) {
    var answer = '';
    const len = participant.length;
    const totalList = [];
    const answerList = new Array(520);
    for(let i = 0 ; i<520; i++){
        totalList.push(0);
    }
    for(let i in participant){
        const idx = stringToIndex(participant[i],len);
        totalList[idx] += 1;
        answerList[idx] = participant[i];
    }
    for(let i in completion){
        const idx = stringToIndex(completion[i],len);
        totalList[idx] -= 1;
    }
    for(let i in totalList){
        if(totalList[i] === 1){
            answer = answerList[i];
            break;
        }
    }
    return answer;
}


function stringToIndex(string, mod){
    const totalCnt = getStringCnt(string);
    const idx = totalCnt;
    return idx;
}

function getStringCnt(string){
    let totalCnt = 0;
    const mod = 27;
    for(let i in string){
        const character = string[i];
        if(character === "a"){
            totalCnt += 1 % mod;
        } else if (character === "b"){
            totalCnt += 2 % mod;
        } else if (character === "c"){
            totalCnt += 3 % mod;
        } else if ( character === "d"){
            totalCnt += 4 % mod;
        } else if ( character === "e"){
            totalCnt += 5 % mod;
        } else if ( character === "f"){
            totalCnt += 6 % mod;
        } else if ( character === "g"){
            totalCnt += 7 % mod;
        } else if ( character === "h"){
            totalCnt += 8 % mod;
        } else if ( character === "i"){
            totalCnt += 9 % mod;
        } else if ( character === "j"){
            totalCnt += 10 % mod;
        } else if ( character === "k"){
            totalCnt += 11 % mod;
        } else if ( character === "l"){
            totalCnt += 12 % mod;
        } else if ( character === "m"){
            totalCnt += 13 % mod;
        } else if ( character === "n"){
            totalCnt += 14 % mod;
        } else if ( character === "o"){
            totalCnt += 15 % mod;
        } else if ( character === "p"){
            totalCnt += 16 % mod;
        } else if ( character === "q"){
            totalCnt += 17 % mod;
        } else if ( character === "r"){
            totalCnt += 18 % mod;
        } else if ( character === "s"){
            totalCnt += 19 % mod;
        } else if ( character === "t"){
            totalCnt += 20 % mod;
        } else if ( character === "u"){
            totalCnt += 21 % mod;
        } else if ( character === "v"){
            totalCnt += 22 % mod;
        } else if ( character === "w"){
            totalCnt += 23 % mod;
        } else if ( character === "x"){
            totalCnt += 24 % mod;
        } else if ( character === "y"){
            totalCnt += 25 % mod;
        } else {
            totalCnt += 26 % mod;
        }
    }
    return totalCnt;
}

const list = ["a","b","c"];
const a = {};
for(let i in list){
    const string = list[i];
    a[string] += 1;
}
for(let i in a){
    console.log(a);
}
