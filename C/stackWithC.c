#include <stdio.h>
#include <stdlib.h>

struct Node {
    int data;
    struct Node *next;
};

struct Node *newNode(int data){
    struct Node *node = (struct Node*) malloc(sizeof(struct Node));
    node -> data = data;
    return node;
}

struct Queue {
    struct Node *oldest;
    struct Node *tail;
    int size;
};

void push(struct Queue *que, int data){
    struct Node *node = newNode(data);
    if(que -> oldest == NULL){
        que -> oldest = node;
        que -> tail = node;
        que -> size += 1;
    } else {
        que -> tail -> next = node;
        que -> tail = node;
        que -> size += 1;
    }
}

int pop(struct Queue *que){
    if(que -> oldest != NULL){
        struct Node *oldestNode = que -> oldest;
        int result = oldestNode -> data;
        que -> oldest = que -> oldest -> next;
        free(oldestNode);
        que -> size -= 1;
        return result;
    } else {
        return 0;
    }
}

int peek(struct Queue *que){
    if(que -> oldest != NULL){
        int peekedData = que -> oldest -> data;
        return peekedData;
    } else {
        return 0;
    }
}

int getSize(struct Queue *que){
    int sizeOfQueue = que -> size;
    return sizeOfQueue;
}

int main(void){
    int progresses[6] = {95, 90, 99, 99, 80, 99};
    int speeds[6] = {1, 1, 1, 1, 1, 1};
    int lengthOfInput = sizeof(speeds)/ sizeof(int);
    int answer[lengthOfInput];
    int time = 1;
    int count = 0;
    struct Queue *progressesQueue = (struct Queue*) malloc(sizeof(struct Queue));
    struct Queue *speedQueue = (struct Queue*) malloc(sizeof(struct Queue));

    // input data in Queue
    for(int i = 0; i < lengthOfInput; i++){
        push(progressesQueue, progresses[i]);
        push(speedQueue, speeds[i]);
    }
    int idx = 0;
    while(progressesQueue -> size != 0){
        int singleSpeed = peek(speedQueue);
        int singleProgress = peek(progressesQueue);
        int isValid = singleProgress + time*singleSpeed >= 100;
        if(isValid == 1){
            count += 1;
            pop(speedQueue);
            pop(progressesQueue);
        } else {
            time += 1;
            if(count != 0){
                answer[idx] = count;
                count = 0;
                idx += 1;
            }
        }
    }
    answer[idx] = count; 
}