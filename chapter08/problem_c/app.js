// Run by Node.js

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

    const answer = getLongestPathLength(origin, dest, 1, adjList, visited);

    console.log(answer);

    function getLongestPathLength(current, goal, depth, adjList, visited){

        //재귀함수의 종료조건 설정
        //만났던 노드를 다시 만나면 큰 음수값을 리턴해 maxLength에 영향을 줄 수 없게 함
        if(visited[current]){
            return - 100;
            //목표했던 노드에 도달하면 0을 리턴하여 maxLength를 갱신할 수 있도록 함
        }else if(current == goal){
            return 0;
        }

        //최대길이를 정의
        let maxLength = 0;
        //현재 노드륿 방문한 것으로 처리
        visited[current] = true;

        //연결 리스트를 순회하며 다음 노드로 재귀적으로 이동함 순서는 중요하지 않음
        //모든 경로를 찾아야하기 때문이다.
        for(let i = 0; i < adjList[current].length; i++){
            const length = 1 + getLongestPathLength(adjList[current][i], goal, depth + 1, adjList, visited);
            //더 크다면 maxLength를 갱신한다.
            maxLength = Math.max(maxLength, length);
        }

        //다음 노드에서 돌아왔을 때 다시 그 노드를 방문하지 않았던 걸로 처리하여
        //visted를 순차적으로 초기화해줘야한다.
        visited[current] = false;

        //최대 길이를 반환한다.
        return maxLength;

    }


    rl.close();
    process.exit();
})();
