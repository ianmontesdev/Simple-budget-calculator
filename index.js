const form = document.querySelector('#form');
const ammount = document.querySelector('#ammount');
const inputName = document.querySelector('#name');
const res = document.querySelector('#res');
const resultBody = document.querySelector('#result-body');
const total = document.querySelector('#total');
const rest = document.querySelector('#rest');

let entries = [];

function recoverLocalStorage() {
    JSON.parse(localStorage.getItem('entries')).forEach(entry => {
        entries.push(entry);
    });

    fillTable();
    calculate();
}

recoverLocalStorage();

function add() {
    const entry = {
        ammount: ammount.value,
        name: inputName.value,
        res: res.checked,
        id: crypto.randomUUID()

    };
    entries.push(entry);
    fillTable();
    calculate();
}

function addToTable(entry) {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdAmmount = document.createElement('td');
    const tdDelete = document.createElement('td');

    tr.style.backgroundColor = entry.res ? 'red' : 'green';

    tdName.textContent = entry.name;
    tdAmmount.textContent = entry.ammount;
    tdDelete.innerHTML = `<button onclick="deleteEntry('${entry.id}')">Delete</button>`;

    tr.appendChild(tdName);
    tr.appendChild(tdAmmount);
    tr.appendChild(tdDelete);

    resultBody.appendChild(tr);
}

function fillTable() {
    resultBody.innerHTML = '';
    entries.forEach(addToTable);
}

function calculate() {
    let tot = 0;
    let totalRest = 0;

    entries.forEach(entry => {
        if (entry.res) {
            totalRest += parseFloat(entry.ammount);
        } else {
            tot += parseFloat(entry.ammount);
        }
    });

    total.textContent = totalRest;
    rest.textContent = tot - totalRest;

    localStorage.setItem('entries', JSON.stringify(entries));
}


function deleteEntry(id) {
    entries = entries.filter(entry => entry.id !== id);
    fillTable();
    calculate();
}