// Run by Node.js

//노드의 이름(숫자)와 깊이를 동시에 관리해야 하기 때문에 클래스를 하나 정의했다.
class Status{
    constructor(node, depth){
        this.node = node;
        this.depth = depth;
    }
}

const readline = require('readline');

(async () => {
    let rl = readline.createInterface({ input: process.stdin });

    const lines = [];
    const adjList = [];


    for await (const line of rl) {
        lines.push(line);
    }

    const N = Number(lines[0].split(" ")[0]);
    const M = Number(lines[0].split(" ")[1]);

    const visited = new Array(N + 1).fill(false);

    const origin = Number(lines[1].split(" ")[0]);
    const dest = Number(lines[1].split(" ")[1]);

    for(let i = 1; i <= N; i++){
        adjList[i] = new Array();
    }

    for(let i = 0 ; i < M; i++){
        const u = Number(lines[i+2].split(" ")[0]);
        const v = Number(lines[i+2].split(" ")[1]);
        adjList[u].push(v);
        adjList[v].push(u);
    }

    const answer = getShortestPathLength(origin, dest, 1, adjList, visited);

    console.log(answer);

    function getShortestPathLength(origin, dest, depth, adjList, visited){

        //출발지와 도착지가 같다면 0을 리턴
        if(origin == dest){
            return 0;
        }

        //큐를 이용하기 위해 배열을 하나 생성한다.
        const queue = new Array();

        //깊이 0과 스타트 지점 상태를 push한다.
        queue.push(new Status(origin, 0));

        //큐가 있는 한 반복한다.
        while(queue.length > 0){

            //큐에 들어가있는 상태를 shift한다.
            const current = queue.shift();

            //해당 노드에 방문한 것으로 처리하고
            visited[current.node] = true;

            //해당 노드가 목적지와 같다면 해당 상태의 깊이를 리턴한다.
            if(current.node == dest){
                return current.depth;
            }

            for(let i = 0; i < adjList[current.node].length; i++){
                const next = adjList[current.node][i];
                //방문 했던 노드는 재방문 할 필요가 없다.
                if(visited[next] == false){
                    queue.push(new Status(next, current.depth + 1));
                }
            }

        }

    }


    rl.close();
    process.exit();
})();
