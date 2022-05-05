// Run by Node.js

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lines = new Array();

class Edge {
    constructor(u, v, w){
        this.u = Number(u);
        this.v = Number(v);
        this.w = Number(w);
    }
}

class DisjointSet {
    constructor(size){
        this.size = size;
        this.groupBoss = new Array(size + 1);
        for(let i = 0; i <= size; i++){
            this.groupBoss[i] = i;
        }
    }

    find(u){
        if(this.groupBoss[u] == u){
            return u;
        }else{
            this.groupBoss[u] = this.find(this.groupBoss[u]);
            return this.groupBoss[u];
        }
    }

    union (u, v){
        const uBoss = this.find(u);
        const vBoss = this.find(v);
        this.groupBoss[vBoss] = uBoss;
    }
}

rl.on("line", function(line) {
    lines.push(line);
}).on("close", function() {

    const V = Number(lines[0].split(" ")[0]);
    const E = Number(lines[0].split(" ")[1]);

    const edges = new Array();

    for(let i = 1; i <= E; i++){
        const line = lines[i].split(" ");
        const u = line[0];
        const v = line[1];
        const w = line[2];
        edges.push(new Edge(u, v, w));
    }

    const spanningTree = getSpanningTree(V, E, edges);

    let weightSum = 0;
    spanningTree.forEach((e) => weightSum += e.w);

    console.log(weightSum);


    rl.close();
    process.exit();
});

function getSpanningTree(V, E, edges){
    //트리는 V-1개의 간선만이 존재해야 한다.
    const spanningTree = new Array();

    //빈 그래프 G에 대한 disjointSet을 선언한다.
    const disjointSet = new DisjointSet(V);

    //간선을 가중치의 오름차순으로 정렬
    edges.sort((a, b) => a.w - b.w);

    edges.forEach(function(e){
        if(disjointSet.find(e.u) == disjointSet.find(e.v)){
            //해당 두 정점에 연결성이 존재한다면 간선을 추가하지 않는다.

        }else{
            //두 정점에 연결성이 없다면 간선을 그래프에 추가한다.
            spanningTree.push(e);
            disjointSet.union(e.u, e.v);
        }
    });

    return spanningTree;
}