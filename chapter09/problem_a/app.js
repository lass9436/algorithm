const readline = require('readline');

(async () => {
    let rl = readline.createInterface({ input: process.stdin });

    const lines = [];

    for await (const line of rl) {
        lines.push(line);
    }

    //정점의 수
    const N = Number(lines[0].split(" ")[0]);

    //간선의 수
    const M = Number(lines[0].split(" ")[1]);

    const adj = Array.from(new Array(N+1), () => new Array());

    const visited = new Array(N+1);

    for(let i = 1; i <= M; i++){
        const u = Number(lines[i].split(" ")[0]);
        const v = Number(lines[i].split(" ")[1]);

        adj[u].push(v);
        adj[v].push(u);
    }

    let hamilton = false;

    for(let i = 1; i <= N; i++){
        hamilton = isHamilton(i, 0, visited, adj);
        if(hamilton){
            break;
        }
    }

    if(hamilton){
        console.log("YES");
    }else{
        console.log("NO");
    }

    rl.close();
    process.exit();
})();

function isHamilton(current, depth, visited, adj){
    //종료 조건 설정
    //지금 노드를 이미 방문했었다면 false를 리턴하고
    if(visited[current]){
        return false;
    }
    //깊이가 노드의 개수와 같아졌을 때 true를 리턴함.
    if(depth == adj.length){
        return true;
    }

    //현재 노드를 방문한 것으로 처리
    visited[current] = true;

    //해밀턴인지 아닌지에 관한 변수 초기화
    let hasHamilton = false;

    for(let i=0; i<=adj[current].length; i++){
        //재귀
        hasHamilton = isHamilton(adj[current][i], depth+1, visited, adj);
        //재귀에서 돌아올 때 visited false로 되돌림.
        visited[adj[current][i]] = false;
        if(hasHamilton){
            break;
        }
    }

    return hasHamilton;
}