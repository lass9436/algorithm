class Status{
    constructor(field){
        this.field = field;
        this.horizon = new Array(field.length).fill(0);
        this.vertical = new Array(field.length).fill(0);
        this.diagonalR = new Array(2*field.length).fill(0);
        this.diagonalL = new Array(2*field.length).fill(0);
    }
    setQueen(row, col){
        this.field[row][col] = true;
        this.horizon[row]++;
        this.vertical[col]++;
        this.diagonalR[row - col + this.field.length]++;
        this.diagonalL[row + col]++;
    }
    getQueen(row, col){
        this.field[row][col] = false;
        this.horizon[row]--;
        this.vertical[col]--;
        this.diagonalR[row - col + this.field.length]--;
        this.diagonalL[row + col]--;
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

    const count = getNQueenCount(new Status(field), 0, N);

    console.log(count);

    rl.close();
    process.exit();
})();

function getNQueenCount(current, depth, N){
    //재귀 종료 조건 설정
    if(depth == N){
        return 1;
    }

    //카운트 초기화
    let count = 0;

    //depth와 같은 열에 퀸 놓기 시도
    for(let col = 0; col < N; col++){
        if(isPossible(depth, col, current)){
            //퀸을 놓는다.
            current.setQueen(depth, col);
            //재귀
            count += getNQueenCount(current, depth+1, N);
            //재귀에서 돌아올 때 다시 퀸을 원래대로 되돌린다.
            current.getQueen(depth, col);
        }
    }

    return count;
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
    if(field.horizon[row] == 0){
        return true;
    }
    return false;
}

function isPossibleByVertical(col, field){
    if(field.vertical[col] == 0){
        return true;
    }
    return false;
}

function isPossibleByDiagonal(row, col, field){
    if(field.diagonalR[row - col + field.field.length] == 0){
        if(field.diagonalL[row + col] == 0){
            return true;
        }
    }
    return false;
}
