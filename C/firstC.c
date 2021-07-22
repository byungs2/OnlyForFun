#include <stdio.h>
#include <stdlib.h>
struct Node {
    int data;
    struct Node *next;
};

void push(struct Node *head, int data){
    struct Node *pointerNode = head;
    struct Node *newNode = (struct Node*) malloc(sizeof(struct Node));
    newNode -> data = data;
    while(pointerNode -> next != NULL){
        pointerNode = pointerNode -> next;
    }
    pointerNode -> next = newNode;
}
void del(struct Node *head, int data){
    struct Node *pointerNode = head;
    while(pointerNode -> next != NULL){
        if(pointerNode -> next -> data == data){
            struct Node *delNode = pointerNode -> next;
            pointerNode -> next = delNode -> next;
            free(delNode);
            break;
        }
        pointerNode = pointerNode -> next;
    }
}

struct Node *peekNoe(struct Node *head, int data){
    struct Node *pointerNode = head;
    while(pointerNode -> next != NULL){
        if(pointerNode -> data == data){
            struct Node *peekedNode = pointerNode;
            return peekedNode;
        }
        pointerNode = pointerNode -> next;
    }
    return pointerNode;
}

int main(void) {
    struct Node *head = (struct Node*)malloc(sizeof(struct Node));
    head -> data = 1;
    push(head, 2);
    printf("%d", head -> data);
    printf("%d", head -> next -> data);
    del(head,2);
    push(head,3);
    printf("%d", head -> data);
    printf("%d", head -> next -> data);
    printf("%d", peekNoe(head, 1) -> data);
    return 1;
}

