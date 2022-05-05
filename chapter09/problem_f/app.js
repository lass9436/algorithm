// Run by Node.js

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const lines = new Array();

class Node {
    constructor(index){
        this.index = index;
        this.edges = new Array();
    }
}

class Edge {
    constructor(u, v, w){
        this.u = u;
        this.v = v;
        this.w = Number(w);
    }
}

rl.on("line", function(line) {
    lines.push(line);

}).on("close", function() {

    const V = Number(lines[0].split(" ")[0]);
    const E = Number(lines[0].split(" ")[1]);

    const nodes = new Array(V+1);

    for(let i = 1; i <= V; i++){
        nodes[i] = new Node(i);
    }

    for(let i = 1; i <= E; i++){
        const line = lines[i].split(" ");
        const u = line[0];
        const v = line[1];
        const w = line[2];

        nodes[u].edges.push(new Edge(nodes[u], nodes[v], w));
        nodes[v].edges.push(new Edge(nodes[v], nodes[u], w));
    }

    const spanningTree = getMinimumSpanningTree(V, E, nodes);

    let weightSum = 0;
    spanningTree.forEach((e) => weightSum += e.w);
    console.log(weightSum);

    rl.close();
    process.exit();
});

function getMinimumSpanningTree(V, E, nodes){

    const spanningTree = new Array();
    const usableEdges = new Array();

    let mstIndex = 0;
    const origin = 1;

    nodes[origin].edges.forEach((e) => usableEdges.push(e));

    usableEdges.sort((a, b) => a.w - b.w);

    const visited = new Array(V+1).fill(false);
    visited[origin] = true;

    while(usableEdges.length > 0){
        const currentEdge = usableEdges.shift();
        const targetNode = currentEdge.v;

        if(visited[targetNode.index]){
            continue;
        }

        visited[targetNode.index] = true;
        spanningTree[mstIndex++] = currentEdge;

        targetNode.edges.forEach(function(e){
            const nextNode = e.v;
            if(visited[nextNode.index]){

            }else{
                usableEdges.push(e);
                usableEdges.sort((a,b) => a.w - b.w);
            }

        });
    }

    return spanningTree;
}