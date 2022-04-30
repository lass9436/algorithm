const readline = require('readline');

(async () => {
    let rl = readline.createInterface({ input: process.stdin });

    const lines = [];

    for await (const line of rl) {
        lines.push(line);
    }

    const sudoku = Array.from(new Array(9), () => new Array(9));

    for(let row = 0; row < 9; row++){
        for(let col = 0; col < 9; col++){
            sudoku[row][col] = lines[row].split(" ")[col];
        }
    }

    for(let row = 0; row < 9; row++){
        for(let col = 0; col < 9; col++){
            fillSudoku(row, col, sudoku);
        }
    }

    for(let row = 0; row < 9; row++){
        console.log(sudoku[row].join(" "));
    }


    rl.close();
    process.exit();
})();

//해당 row와 col에 위치한 sudoku를 채우는 함수
function fillSudoku(row, col, sudoku) {
    //이미 채워져있으면 함수를 리턴한다.
    if(sudoku[row][col] > 0){
        return;
    }

    // 해당 칸 3 * 3의 숫자들
    const square = getSquare(row, col, sudoku);

    //해당 칸이 속한 가로의 숫자들
    const horizon = getHorizon(row, col, sudoku);

    //해당 칸이 속한 세로의 숫자들
    const vertical = getVertical(row, col, sudoku);

    const candi = new Array(10).fill(true);

    for(let i=0; i<square.length; i++){
        //3 * 3에 속한 숫자들은 사용할 수 없다.
        candi[square[i]] = false;
    }

    for(let i=0; i<horizon.length; i++){
        //가로에 속한 숫자들은 사용할 수 없다.
        candi[horizon[i]] = false;
    }

    for(let i=0; i<vertical.length; i++){
        //세로에 속한 숫자들은 사용할 수 없다.
        candi[vertical[i]] = false;
    }

    //사용할 수 있는 후보중에 가장 빠른 수를 넣는다.
    for(let i=1; i<candi.length; i++){
        if(candi[i]){
            sudoku[row][col] = i;
            return;
        }
    }

}

//해당 칸이 속한 3 * 3의 숫자들을 반환한다.
function getSquare(row0, col0, sudoku){

    const square = new Array();

    const horizon = parseInt(col0 / 3);

    const vertical = parseInt(row0 / 3);

    for(let row = vertical * 3; row < vertical * 3 + 3; row++){
        for(let col = horizon * 3; col < horizon * 3 + 3; col++){
            const number = sudoku[row][col];
            if(number != 0){
                square.push(number);
            }
        }
    }

    return square;

}

//해당 칸이 속한 가로의 숫자들을 반환한다.
function getHorizon(row0, col0, sudoku){

    const horizon = new Array();

    for(let col = 0; col < 9; col++){
        const number = sudoku[row0][col];
        if(number > 0){
            horizon.push(number);
        }
    }

    return horizon;

}

//해당 칸이 속한 세로의 숫자들을 반환한다.
function getVertical(row0, col0, sudoku){
    const vertical = new Array();

    for(let row = 0; row < 0; row++){
        const number = sudoku[row][col0];
        if(number > 0){
            vertical.push(number);
        }
    }

    return vertical;

}