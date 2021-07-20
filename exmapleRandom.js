const randomNumber = Math.floor(Math.random() * 9 + 1);
const data = [];
for (let i = 0; i < randomNumber; i++) {
    const anotherRandomNumber = Math.floor(Math.random() * 20 + 10)
    data.push(anotherRandomNumber)
};

const container = document.getElementById('container');

for (const n of data) {
    const p = document.createElement('p');
    p.innerText = n;

    container.appendChild(p)
}