// Run by Node.js
const readline = require('readline');

(async () => {
    let rl = readline.createInterface({ input: process.stdin });

    const lines = new Array();

    for await (const line of rl) {
        lines.push(line);

    }

    const N = Number(lines[0]);

    //lines.forEach((line) => console.log(line));

    const graph = new Graph(N);

    for(let i=0; i<N; i++){
        for(let j=0; j<N; j++){
            graph.adj[i][j] = Number(String(lines[i+1]).split(" ")[j]);
        }
    }

    const visited = new Array(N).fill(false);

    const candi = new Array();

    for(let i=0; i<N; i++){
        candi.push(getMinCost(i, i, 0, visited, graph));
    }

    let answer = 1000000;

    candi.forEach((i) => answer = Math.min(answer, i));

    console.log(answer);

    rl.close();
    process.exit();
})();

class Graph{
    constructor(n){
        this.n = Number(n);
        this.adj = Array.from(new Array(n), () => new Array(n).fill(0));
    }

    setEdge(u, v, w){
        this.adj[u][v] = w;
    }

    getEdge(u, v){
        return this.adj[u][v];
    }

}

function getMinCost(origin, current, depth, visited, graph){
    //종료조건설정
    if(depth == graph.n && origin == current){
        return 0;
    }

    //이미 방문했던 노드라면 매우 큰 수를 반환한다.
    if(visited[current]){
        return 1000000;
    }

    visited[current] = true;

    let costs = new Array();

    for(let i = 0; i < graph.n; i++){
        if(graph.adj[current][i] > 0){
            costs.push(graph.adj[current][i] + getMinCost(origin, i, depth + 1, visited, graph));
        }
    }

    visited[current] = false;

    let cost = 1000000;

    costs.forEach((i) => cost = Math.min(cost, i));

    return cost;
}
