class Status{
    constructor(row, col, count){
        this._row = Number(row);
        this._col = Number(col);
        this._count = Number(count);
    }
    equals(other){
        if(this._row == other._row){
            if(this._col == other._col){
                return true;
            }
        }
        return false;
    }

    row(){
        return this._row;
    }

    col(){
        return this._col;
    }

    count(){
        return this._count;
    }
}

const readline = require('readline');

(async () => {
    let rl = readline.createInterface({ input: process.stdin });

    const lines = [];


    for await (const line of rl) {
        lines.push(line);
    }

    const row = Number(lines[0].split(" ")[0]);
    const col = Number(lines[0].split(" ")[1]);

    function isInside(i, j){
        if(0 <= i && i < row){
            if(0 <= j && j < col){
                return true;
            }
        }
        return false;
    }

    const maze = Array.from(new Array(row), () => new Array(col));

    let start;
    let end;

    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){
            let object = Array.from(lines[i + 1])[j];
            if(object == 'S'){
                start = new Status(i, j, 0);
            }else if(object == 'E'){
                end = new Status(i, j, 0);
            }
            maze[i][j] = String(object);
        }
    }

    const queue = new Array();

    queue.push(start);


    while(queue.length > 0){

        const current = queue.shift();

        if(current.equals(end)){
            console.log(current.count());
            break;
        }

        //방문한 지역은 벽으로 막아 방문한 지역을 다시 방문하지 않도록 처리한다.
        maze[current.row()][current.col()] = "#";

        const r = current.row();
        const c = current.col();
        const co = current.count();

        if(isInside(r+1, c) && maze[r+1][c] != "#"){
            queue.push(new Status(r+1, c, co + 1));
        }
        if(isInside(r, c+1) && maze[r][c+1] != "#"){
            queue.push(new Status(r, c+1, co + 1));
        }
        if(isInside(r-1, c) && maze[r-1][c] != "#"){
            queue.push(new Status(r-1, c, co + 1));
        }
        if(isInside(r, c-1) && maze[r][c-1] != "#"){
            queue.push(new Status(r, c-1, co + 1));
        }


    }

    rl.close();
    process.exit();
})();
