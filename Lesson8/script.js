// 1.1 Вывести в консоль числа от 1 до n, где n - это произвольное целое число большее 1
/*
let n = 15;
let x = 0;
while(x<n){
    x++;
    console.log(x)
};
*/

// 1.2 Вывести в консоль простые числа от 1 до n.
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

//1.3 Вывести в консоль числа кратные k, в диапазоне от 1 до n.
/*
let n = 200;
let k = 3;
for(i = 1; i < n;  i++) {
    if(i % k === 0)
    alert(i)
};
*/

//3 Начальник цеха пригласил людей на совещание
// Каждый, кто входит в кабинет пожимает руки всем присутствующим
// Сколько человек зашло в кабинет, если известно, что всего произошло 120 рукопожатий.

// Начальник цеха в комнате
// Входит 1й человек, количество рукопожатий 1
// Входит 2й человек, количество рукопожатий 3
// Входит 3й человек, количество рукопожатий 6
// Каждый, кто входит в комнату с n людей делает n рукопожатий

/*
function getPeople(handshake) {
    let peopleCount = 0;
    let currentHandshake  = 0;

    do {
    currentHandshake += ++peopleCount;
    } while(currentHandshake < handshake);

    if (currentHandshake > handshake) {
        throw new Error(`Incorrect data. handshake = ${handshake}; currentHandshake = ${currentHandshake}; peopleCount = ${peopleCount}`);
    }

    return peopleCount;
}

console.log(getPeople(1));
console.log(getPeople(3));
console.log(getPeople(6));
console.log(getPeople(120));
*/
