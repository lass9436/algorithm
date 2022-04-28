class State {
    constructor(row, col, time){
        this.row = Number(row);
        this.col = Number(col);
        this.time = Number(time);
    }

}

const readline = require('readline');

(async () => {
    let rl = readline.createInterface({ input: process.stdin });

    const lines = [];


    for await (const line of rl) {
        lines.push(line);
    }

    const row = Number(lines[0].split(" ")[1]);
    const col = Number(lines[0].split(" ")[0]);

    const box = Array.from(new Array(row + 2), () => new Array(col + 2));

    const visited = Array.from(new Array(row + 2), () => new Array(col + 2).fill(false));

    const queue = new Array();

    for(let i = 1; i <= row; i++){
        for(let j = 1; j <= col; j++){
            const num = Number(lines[i].split(" ")[j-1]);
            box[i][j] = num;
            if(num == 1){
                queue.push(new State(i, j, 0));
            }
        }
    }


    let minTime = 0;

    while(queue.length > 0){
        const current = queue.shift();

        if(current.row < 1 || current.row > row || current.col < 1 || current.col > col){
            continue;
        }
        if(visited[current.row][current.col] == true){
            continue;
        }
        if(box[current.row][current.col] == -1){
            continue;
        }

        visited[current.row][current.col] = true;
        box[current.row][current.col] = 1;
        minTime = Math.max(minTime, current.time);

        queue.push(new State(current.row + 1, current.col, current.time + 1));
        queue.push(new State(current.row - 1, current.col, current.time + 1));
        queue.push(new State(current.row, current.col + 1, current.time + 1));
        queue.push(new State(current.row, current.col - 1, current.time + 1));

    }

    for(let i = 1; i <= row; i++){
        for(let j = 1; j <= col; j++){
            if(box[i][j] == 0){
                minTime = -1;
            }
        }
    }


    console.log(minTime);


    rl.close();
    process.exit();
})();