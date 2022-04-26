//바이러스의 수와 시간을 동시에 관리해야 하기 때문에 클래스를 하나 만들었다.
class Status{
    constructor(count, time){
        this.count = count;
        this.time = time;
    };
}

const readline = require('readline');

(async () => {
    let rl = readline.createInterface({ input: process.stdin });

    const lines = [];


    for await (const line of rl) {
        lines.push(line);
    }

    //테스트 케이스의 수
    const N = Number(lines[0]);

    for(let i = 1; i <= N; i++) {
        let dest = Number(lines[i]);
        let answer = 0;
        const queue = new Array();

        //최초의 상태를 큐에 넣는다.
        queue.push(new Status(1, 0));

        //BFS로 구현
        while (queue.length > 0) {
            const current = queue.shift();
            //현재 목표 개수에 도달했다면 반복문을 종료하고 시간을 출력한다.
            if (current.count == dest) {
                console.log(current.time);
                break;
            }

            queue.push(new Status(current.count * 2, current.time + 1));

            let temp = parseInt(current.count / 3);
            //개수가 0이라면 넣을 필요가 없기 때문에 0을 넘을 때만 큐에 추가한다.
            if (temp > 0) {
                //java와 다르게 정수를 나누면 실수를 반환하므로 parseInt가 필요하다.
                queue.push(new Status(temp, current.time + 1));
            }

        }

    }


    rl.close();
    process.exit();
})();
