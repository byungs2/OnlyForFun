#include <stdio.h>
#include <stdlib.h>
#include <string.h>
//TODO: BFS, DFS, Graph with Matrix & Linked List, Dijkstra, Segment & index tree, KMP, Alpha Beta pruning 
//IMPLEMENTED: Queue, Linked_List, Stack, Quick sort, Merge sort, Priority Queue with Max heap

typedef struct _Node {
  int index;
  int data;
  int prior;
  int visit;
  struct _Node *next;
} Node;

typedef struct _LinkedList{
  Node *head;
  Node *tail;
  int length;
  void (*push)(struct _LinkedList*, int, int);
  void (*del)(struct _LinkedList*, int);
  void (*read)(struct _LinkedList*, int);
  void (*read_all)(struct _LinkedList*);
} Linked_List;

typedef struct _Stack{
  Node *top;
  int length;
  void (*push)(struct _Stack*, int, int);
  void (*pop)(struct _Stack*);
  void (*pop_all)(struct _Stack*);
} Stack;

typedef struct _Queue{
  Node *top;
  Node *tail;
  int length;
  void (*push)(struct _Queue*, int, int);
  void (*pop)(struct _Queue*);
  void (*pop_all)(struct _Queue*);
} Queue;

typedef struct _PriorityQueue{
  Node** heap_array;
  int length;
  int current_leaf;
  int height;
  void (*push)(struct _PriorityQueue*, int, int);
  void (*pop)(struct _PriorityQueue*);
  void (*pop_all)(struct _PriorityQueue*);
} Prior_Queue;

void print_array_all(int *array, int array_length){
  for(int i = 0; i < array_length; i++){
    printf("%d \n", array[i]);
  }
  printf("\n");
}

void swap(int *a, int *b){
  int tmp = *a;
  *a = *b;
  *b = tmp;
}

void merge_array(int *array, int start, int middle, int end){
  int *merged = (int *)malloc(sizeof(int)*(end - start+1));
  int i = start;
  int j = middle+1;
  int cnt = 0;
  while(i < middle+1 && j < end +1){
    if(array[i] > array[j]){
      merged[cnt] = array[j];
      j++;
    } else {
      merged[cnt] = array[i];
      i++;
    }
    cnt++;
  }
  if(j < end + 1){
    while(j < end + 1){
      merged[cnt] = array[j];
      j++;
      cnt++;
    }
  }
  if(i < middle + 1){
    while(i < middle+1){
      merged[cnt] = array[i];
      i++;
      cnt++;
    }
  }
  for(int i = start; i < end + 1; i++){
    array[i] = merged[i-start];
  }
  free(merged);
}

void merge_sort(int *array, int start, int end){
  if(start<end){
    int middle_idx = (end + start)/2;
    merge_sort(array, start, middle_idx);
    merge_sort(array, middle_idx + 1, end);
    merge_array(array, start, middle_idx, end);
  }
}

void quick_sort(int *array, int start, int end){
  int pivot = array[start];
  int j = start;
  if(end-start <= 0){
    printf("End of sorting\n");
  } else { 
    for(int i = start; i < end+1; i++){
      int *checker = array + i;
      int *marker = array + j;
      if(*checker <= pivot){
        swap(checker, marker);
        j++;
      }
    }
    swap(array+start, array + j - 1);
    quick_sort(array, start, j-2);
    quick_sort(array, j, end);
  }
}

void read_node(Node *node){
  printf("%dth nodes data : %d\n", node->index, node->data);
}

void visit_node(Node *node){
  node->visit = 1;
  read_node(node);
}

void gen_node(int length, Node *node, int data, int prior){
  node->index = length + 1;
  node->data = data;
  node->prior = prior;
  node->visit = 0;
  node->next = NULL;
}

void stack_push(Stack *stack, int data, int prior){
  Node *node = (Node *) malloc(sizeof(Node));
  gen_node(stack->length, node, data, prior);
  if(stack->top == NULL){
    stack->top = node;
    stack->length++;
  } else {
    Node *tmp = stack->top;
    stack->top = node;
    stack->top->next = tmp;
    stack->length++;
  } 
}

void stack_pop(Stack *stack){
  if(stack->top != NULL){
    printf("%d is poped\n", stack->top->data);
    Node *del = stack->top;
    stack->top = stack->top->next;
    stack->length--;
    free(del);
  } else {
    printf("There is no poped\n");
  }
}

void stack_pop_all(Stack *stack){
  while(stack->top != NULL){
    stack->pop(stack);
  }
}

void queue_push(Queue *queue, int data, int prior){
  Node *node = (Node *) malloc(sizeof(Node));
  gen_node(queue->length, node, data, prior);
  if(queue->top == NULL){
    queue->top = node;
    queue->tail = node;
    queue->length++;
  } else {
    queue->tail->next = node;
    queue->tail = node;
    queue->length++;
  } 
}

void queue_pop(Queue *queue){
  if(queue->top != NULL){
    printf("%d is poped\n", queue->top->data);
    Node *del = queue->top;
    queue->top = queue->top->next;
    queue->length--;
    free(del);
  } else {
    printf("There is no poped\n");
  }
}

void queue_pop_all(Queue *queue){
  while(queue->top != NULL){
    queue->pop(queue);
  }
}
void refresh_height(Prior_Queue *pq){
  int last = pq->current_leaf;
  int cnt = 0;
  while(last != 1){
    last = last/2;
    cnt++;
  } 
  pq->height = cnt;
}
void swap_array_elements(Node **array, int a, int b){
  Node *node = array[a];
  array[a] = array[b];
  array[b] = node;
}

void prior_queue_push(Prior_Queue *pq, int data, int prior){
  Node *node = (Node *) malloc(sizeof(Node));
  gen_node(pq->length, node, data, prior);
  int current = pq->current_leaf;
  int parent = (current-1)/2;
  Node **array = pq->heap_array;
  array[current] = node;
  while(current > 0){
    if(array[parent]->prior < array[current]->prior){
      swap_array_elements(array, current, parent);
      current = parent;
      parent = (current-1)/2;
    } else {
      break;
    }
  }
  pq->length++;
  pq->current_leaf++;
  refresh_height(pq);
}

void prior_queue_pop(Prior_Queue *pq){
  printf("Prior: %d\n Data: %d\n", pq->heap_array[0]->prior, pq->heap_array[0]->data);
  Node **array = pq->heap_array;
  free(array[0]);
  array[0] = array[pq->current_leaf - 1];
  array[pq->current_leaf - 1] = NULL;
  int current = 0;
  int left = current * 2 + 1;
  int right = current * 2 + 2;
  int cnt = 0;
  int bigger;
  while(cnt < pq->height){
    if(array[left] == NULL && array[right] == NULL){
      break;
    } else if(array[left] != NULL && array[right] == NULL){
      bigger = left;
    } else if(array[left] == NULL && array[right] != NULL){
      bigger = right;
    } else {
      if(array[left]->prior >= array[right]->prior){
        bigger = left;
      } else {
        bigger = right;
      }
      if(array[bigger]->prior > array[current]->prior){
        swap_array_elements(array, bigger, current);
        current = bigger;
        left = current * 2 + 1;
        right = current * 2 + 2;
      } else { 
        break;
      }
    }
    cnt++;
  }
  refresh_height(pq);
  pq->length--;
  pq->current_leaf--;
}

void prior_queue_pop_all(Prior_Queue *pq){
  while(pq->current_leaf != 0){
    pq->pop(pq);
  }
}

void prior_queue_init(Prior_Queue *pq, int size){
  pq->heap_array = (Node **) malloc(sizeof(Node*) * size * 2);
  for(int i = 0; i < size*2; i++){
    pq->heap_array[i] = NULL;
  }
  pq->height = 0;
  pq->length = 0;
  pq->current_leaf = 0;
  pq->push = prior_queue_push;
  pq->pop = prior_queue_pop;
  pq->pop_all = prior_queue_pop_all;
}

void init_stack(Stack *stack){
  stack->length = 0;
  stack->top = NULL;
  stack->push = stack_push;
  stack->pop = stack_pop;
  stack->pop_all = stack_pop_all;
}

void init_queue(Queue *queue){
  queue->length = 0;
  queue->top = NULL;
  queue->push = queue_push;
  queue->pop = queue_pop;
  queue->pop_all = queue_pop_all;
}

void add_to_linked_list(Linked_List *ll, int data, int prior){
  Node *node = (Node *) malloc(sizeof(Node));
  gen_node(ll->length, node, data, prior);
  if(ll->head == NULL){
    ll->head = node;
    ll->tail = node;
    ll->length++;
  } else {
    ll->tail->next = node;
    ll->tail = node;
    ll->length++;
  }
}

void delete_node_from_linked_list(Linked_List *ll, int index){
  int is_del = 0;
  if(ll->head == NULL){
    printf("There is no element\n");
  } else if(ll->head->index == index){ 
    Node *del = ll->head;
    ll->head = ll->head->next;
    is_del = 1;
    free(del);
  } else { 
    Node *tmp = ll->head;
    while(tmp->next != NULL){
      if(tmp->next->index == index){
        Node *del = tmp->next;
        if(del->index == ll->tail->index){
          ll->tail = tmp;
        }
	tmp->next = tmp->next->next;
        free(del);
        is_del = 1;
        ll->length--;
        break;
      } else {
        tmp = tmp->next;
      }
    }
  }
  if(is_del == 0){
    printf("There is no element that you are finding\n");
  }
}

void read_node_from_linked_list(Linked_List *ll, int index){
  int is_read = 0;
  if(ll->head == NULL){
    printf("There is no element\n");
  } else { 
    Node *tmp = ll->head;
    while(tmp != NULL){
      if(tmp->index == index){
        printf("%dth node's value : %d\n", tmp->index, tmp->data);
        is_read = 1;
        break;
      } else {
        tmp = tmp->next;
      }
    }
    if(is_read == 0){
      printf("There is no element that you are finding\n");
    }
  } 
}

void read_all(Linked_List *ll){
  Node *tmp = ll->head;
  while(tmp != NULL){
    printf("%dth value %d\n", tmp->index, tmp->data);
    tmp = tmp->next;
  }
}

void init_linked_list(Linked_List *ll){
  ll->length = 0;
  ll->push = add_to_linked_list;
  ll->del = delete_node_from_linked_list;
  ll->read = read_node_from_linked_list;
  ll->read_all = read_all;
}

int main(int argc, char *argv[]){ 

  // linked_list, stack, queue
  Linked_List *l_list = (Linked_List *) malloc(sizeof(Linked_List));
  Stack *stack = (Stack *) malloc(sizeof(Stack));
  Queue *queue = (Queue *) malloc(sizeof(Queue));
  Prior_Queue *prior_queue = (Prior_Queue *) malloc(sizeof(Prior_Queue));
  init_linked_list(l_list);
  init_stack(stack);
  init_queue(queue);
  prior_queue_init(prior_queue, 10);
  printf("init complete \n");
  for(int i = 0; i < 10; i++){
    l_list->push(l_list, i, 9-i);
    stack->push(stack, i, 9-i);
    queue->push(queue, i, 9-i);
    prior_queue->push(prior_queue, i, 9-i);
  }
  l_list->read_all(l_list);
  printf("\n");
  stack->pop_all(stack);
  printf("\n");
  queue->pop_all(queue);
  printf("\n");
  prior_queue->pop_all(prior_queue);
  // int array
  int *array = (int *) malloc(sizeof(int) * 6);
  array[0] = 5;
  array[1] = 1;
  array[2] = 6;
  array[3] = 7;
  array[4] = 4;
  array[5] = 6;
  quick_sort(array, 0, 5);
  print_array_all(array, 6); 
  array[0] = 5;
  array[1] = 1;
  array[2] = 6;
  array[3] = 7;
  array[4] = 4;
  array[5] = 6;
  merge_sort(array, 0, 5);
  print_array_all(array, 6);   
  return 0;
}













