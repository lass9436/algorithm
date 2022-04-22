//자바스크립트 파일 입출력
const fs = require('fs');
//input 함수 정의
const input = (()=>{
    const stdin = fs.readFileSync('/dev/stdin').toString().split('\n');
    let ln=0;
    return ()=>stdin[ln++];
})();

//노드와 깊이의 상태값 정의
class Status {
    constructor(nodeIndex, depth) {
        this.nodeIndex = nodeIndex;
        this.depth = depth;
    }
}

//Stack 클래스 정의
class Stack {
    constructor() {
        this._arr = [];
    }
    pop() {
        return this._arr.pop();
    }
    push(item){
        this._arr.push(item);
    }
    size(){
        return this._arr.length;
    }
}

// Queue 클래스 정의
class Queue {
    constructor() {
        this._arr = [];
    }
    enqueue(item) {
        this._arr.push(item);
    }
    dequeue(){
        return this._arr.shift();
    }
    size(){
        return this._arr.length;
    }
}

//DFS 함수 정의
function getDfsOrder(N, adj){
    //리턴할 배열 초기화
    const answer = [];

    //스택 선언 및 초기화
    const stack = new Stack();
    //스택에 초기값 스테이터스 push
    stack.push(new Status(1,1));
    //방문 여부 배열 생성 후 false 로 초기화
    const visited = Array(N+1).fill(false);

    while(stack.size() > 0){

        //스택에서 탐색할 상태 값을 가져온다.
        let status = stack.pop();

        //이미 방문한 노드라면 건너 뛴다.
        if(visited[status.nodeIndex]){
            continue;
        }

        //방문한 것으로 처리한다.
        answer.push(status.nodeIndex);
        visited[status.nodeIndex] = true;

        //현재 노드와 인접한 노드를 역순으로 조회
        //왜냐하면 작은 숫자를 먼저 pop() 해야하기 때문
        for(let i = N; i > 0; i--){
            if(adj[status.nodeIndex][i]){
                stack.push(new Status(i, status.depth + 1));
            }
        }
    }

    return answer;

}

//BFS 함수 정의
function getBfsOrder(N, adj){

    //리턴할 배열 초기화
    const answer = [];

    //스택 선언 및 초기화
    const queue = new Queue();
    //스택에 초기값 스테이터스 push
    queue.enqueue(new Status(1,1));
    //방문 여부 배열 생성 후 false 로 초기화
    const visited = Array(N+1).fill(false);

    while(queue.size() > 0){

        //큐에서 탐색할 상태 값을 가져온다.
        let status = queue.dequeue();

        //이미 방문한 노드라면 건너 뛴다.
        if(visited[status.nodeIndex]){
            continue;
        }

        //방문한 것으로 처리한다.
        answer.push(status.nodeIndex);
        visited[status.nodeIndex] = true;

        //현재 노드와 인접한 노드를 순서대로 조회
        //큐는 먼저 넣은 걸 먼저 가져오기 때문에 작은 숫자를 먼저 조회해야 하므로
        for(let i = 1; i <= N; i++){
            if(adj[status.nodeIndex][i]){
                queue.enqueue(new Status(i, status.depth + 1));
            }
        }
    }

    return answer;
}

function printArr(answer){
    let str = "";
    for(let i=0; i < answer.length; i++){
        if(i == 0){
            str += answer[i];
        }else{
            str += "-" + answer[i];
        }
    }
    console.log(str);
}

//첫 줄의 N M 값을 받을 배열
const condition = input().split(" ").map(Number);
const N = condition[0];
const M = condition[1];

//인접 행렬(2차원 배열) 정의, false로 초기화
const adj = Array.from(Array(N+1), () => new Array(N+1).fill(false));

//한 줄 씩 읽으면서 인접 행렬에 값 할당
for(let i=0; i<M; i++){
    let line = input().split(" ").map(Number);
    adj[line[0]][line[1]] = true;
    adj[line[1]][line[0]] = true;
}

const dfsOrders = getDfsOrder(N, adj);
const bfsOrders = getBfsOrder(N, adj);

printArr(dfsOrders);
printArr(bfsOrders);