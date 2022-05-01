class Status{
    constructor(field, depth){
        this.field = field;
        this.depth = Number(depth);
    }
}

const readline = require('readline');

(async () => {
    let rl = readline.createInterface({ input: process.stdin });

    const lines = [];

    for await (const line of rl) {
        lines.push(line);
    }

    const N = Number(lines[0]);

    const field = Array.from(new Array(N), () => new Array(N).fill(false));

    const stack = new Array();

    stack.push(new Status(field, 0));

    let count = 0;

    while(stack.length > 0){

        const current = stack.pop();

        if(current.depth == N){
            count++;
            continue;
        }

        const nextArr = getNextNodes(current);

        for(let i = 0; i < nextArr.length; i++){
            stack.push(nextArr[i]);
        }

    }

    console.log(count);

    rl.close();
    process.exit();
})();

function getNextNodes(status){

    const field = status.field;
    const N = field.length;
    const depth = Number(status.depth);

    const nextNodes = new Array();

    for(let col = 0; col < N; col++){
        if(isPossible(depth, col, field)){
            const copy = Array.from(new Array(N), () => new Array(N).fill(false));
            for(let i = 0; i < N; i++){
                for(let j = 0; j < N; j++){
                    copy[i][j] = field[i][j];
                }
            }

            copy[depth][col] = true;
            nextNodes.push(new Status(copy, depth+1));
        }
    }


    return nextNodes;

}

function isPossible(row, col, field){
    if(isPossibleByHorizon(row, field)){
        if(isPossibleByVertical(col, field)){
            if(isPossibleByDiagonal(row, col, field)){
                return true;
            }
        }
    }
    return false;
}

function isPossibleByHorizon(row, field){
    for(let col = 0; col < field.length; col++){
        if(field[row][col]){
            return false;
        }
    }
    return true;
}

function isPossibleByVertical(col, field){
    for(let row = 0; row < field.length; row++){
        if(field[row][col]){
            return false;
        }
    }
    return true;
}

function isPossibleByDiagonal(row, col, field){
    for(let i=0; i<field.length; i++){
        for(let j=0; j<field.length; j++){
            //오른쪽 아래로 향하는 대각선
            if(row - col == i - j){
                if(field[i][j]){
                    return false;
                }
            }
            //왼쪽 아래로 향하는 대각선
            if(row + col == i + j){
                if(field[i][j]){
                    return false;
                }
            }
        }
    }
    return true;
}
