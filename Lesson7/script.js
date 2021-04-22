// 1. Вывести в консоль числа от 1 до n, где n - это произвольное целое число большее 1
/*
let n = 15;
let x = 0;
while(x<n){
    x++;
    console.log(x)
};
*/

// 2. Вывести в консоль простые числа от 1 до n.
/*
function figure(n) {
    nextStep:
    for(i = 1; i <= n; i++){
        for(t = 2; t < i; t++){
            if(i % t == 0){
                continue nextStep;
            }
        }
     console.log(i)}
    }
figure(alert(14))
*/
/*
let n = 10;
nextPrime:
for(i = 1; i <= n; i++){
    for(j = 7; j < i; i++){
        if(i % j == 0){
            continue nextPrime;
        }
    }
    alert(i);
};
*/

//3. Вывести в консоль числа кратные k, в диапазоне от 1 до n.
/*
let n = 200;
let k = 3;
for(i = 1; i < n;  i++) {
    if(i % k === 0)
    alert(i)
};
*/