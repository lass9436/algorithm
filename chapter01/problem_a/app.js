function getMax(a, b) {
    if ( a >= b)
        return a;
    else
        return b;
}

const input = [];

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on("line", function(line) {
    input.push(line);
    rl.close();
}).on("close", function() {
    const numbers = input[0].split(" ").map(Number);
    const a = numbers[0];
    const b = numbers[1];
    console.log(getMax(a,b));
    process.exit();
});