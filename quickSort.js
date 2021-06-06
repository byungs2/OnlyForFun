// js는 list의 포인터를 알아서 가져와 쓰는 듯? call by reference
function quickSort(start, end, array){
    const pivot = array[start];
    const len = end - start + 1;
    let fRunner = start;
    let sRunner = start;

    while(sRunner < end+1){
        const sVal = array[sRunner];
        const fVal = array[fRunner];
        if(sVal >= pivot){
            sRunner += 1;
        } else {
            fRunner += 1;
            array[sRunner] = array[fRunner];
            array[fRunner] = sVal;
            sRunner += 1;
        }
    }
    array[start] = array[fRunner];
    array[fRunner] = pivot;
    if(fRunner-start >= 2){
        quickSort(start, fRunner-1, array);
    }
    if(end - fRunner >= 2){
        quickSort(fRunner+1, end, array);
    }
}
const list = [8,7,6,5,4,3,2,1,0];
quickSort(0, 8, list);
console.log(list);
for(let i = 0; i < list.length; i++){
    console.log(list[i]);
}