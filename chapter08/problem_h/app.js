const readline = require('readline');

class Status{
    constructor(number, depth){
        this.number = Number(number);
        this.depth = Number(depth);
    }
}

//에라토노스의 체를 적용한 소수의 배열 반환
function getPrimeArr(){

    primeArr = new Array(10000).fill(true);

    primeArr[0] = false;
    primeArr[1] = false;


    for(let i = 2; i < primeArr.length; i++){
        for(let j = 2; j * j <= i; j++){
            if(primeArr[j]){
                if(i % j == 0){
                    primeArr[i] = false;
                }
            }
        }
    }

    return primeArr;
}

//소수의 배열과 원래 수를 입력 받아 다음으로 갈 수 있는 수들을 queue에 넣어주는 함수
//무한 반복을 막기 위해 visited를 넣어 관리한다.
function getNextPrimes(primeArr, current, visited, queue){

    const origins = new Array(4);

    const origin = current.number;

    origins[0] = parseInt(origin/1000);
    origins[1] = parseInt(origin%1000/100);
    origins[2] = parseInt(origin%100/10);
    origins[3] = parseInt(origin%10);

    for(let i = 0; i < origins.length; i++){

        for(let j = 0; j < 10; j++){

            if(i == 0 && j == 0){
                continue;
            }

            const copy = origins.slice();

            copy[i] = j;

            const candi = Number(copy.join(''));

            if(origin == candi || visited[candi]){
                continue;
            }

            if(primeArr[candi]){
                visited[candi] = true;
                queue.push(new Status(candi, current.depth + 1));
            }

        }
    }

}

(async () => {
    let rl = readline.createInterface({ input: process.stdin });

    const lines = [];
    const start = [];
    const end = [];

    for await (const line of rl) {
        lines.push(line);
    }

    const N = Number(lines[0]);

    for(let i=0; i<N; i++){
        start.push(Number(lines[i+1].split(" ")[0]));
        end.push(Number(lines[i+1].split(" ")[1]));
    }

    const primeArr = getPrimeArr();


    for(let i = 0; i < N; i++){
        const origin = start[i];
        const dest = end[i];

        const visited = new Array(10000).fill(false);

        const queue = new Array();

        queue.push(new Status(origin, 0));

        if(origin == dest){
            console.log(0);
            continue;
        }

        let count = 0;
        let find = false;

        while(queue.length > 0){

            const current = queue.shift();

            getNextPrimes(primeArr, current, visited, queue);

            queue.forEach(function(item){
                if(item.number == dest){
                    console.log(item.depth);
                    find = true;
                }
            });

            if(find){
                break;
            }

        }

        if(!find){
            console.log("Impossible");
        }

    }


    rl.close();
    process.exit();
})();