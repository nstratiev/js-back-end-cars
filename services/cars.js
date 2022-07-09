const fs = require('fs/promises');
const filePath = './services/data.json';

// Basic functions
async function read() {
    try {
        const file = await fs.readFile(filePath);
        return JSON.parse(file);
    } catch (err) {
        console.error('Database read error');
        console.error(err);
        process.exit(1); // Спира приложението
    }
}

async function write(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Database write error');
        console.error(err);
        process.exit(1); // Спира приложението
    }
}

// CRUD functions
async function getAll(query) {
    const data = await read();
    // console.log(data['3ba2d888-1ce4']);
    let carsArr = Object
        .entries(data)
        .map(([id, obj]) => Object.assign({}, { id }, obj));

    if (query.search) {
        carsArr = carsArr.filter(el => (el.name).toLocaleLowerCase().includes((query.search).toLocaleLowerCase()));
    }
    if (query.from) {
        carsArr = carsArr.filter(el => el.price >= Number(query.from));
    }
    if (query.to) {
        carsArr = carsArr.filter(el => el.price <= Number(query.to));
    }

    // console.log(query.search);
    return carsArr;
}

async function getById(id) {
    const data = await read();
    const car = data[id];
    return Object.assign({}, { id }, car);
}

async function createItem(obj) {
    // console.log(obj);
    const data = await read();
    const newId = nextId();
    data[newId] = obj;

    // console.log(data);
    await write(data);
}

async function deleteItem(id) {
    const data = await read();

    if (data.hasOwnProperty(id)) {
        delete data[id];
        await write(data);
    } else {
        throw new Error('No such id in database');
    }
}

async function editItem(id, newObj) {
    const data = await read();

    if (data.hasOwnProperty(id)) {
        data[id] = newObj;
        await write(data);
    } else {
        throw new Error('No such id in database');
    }
}


// function nextId() {
//     return 'xxxxxxxx-xxxx'.replace(/x/g, (Math.random() * 16 | 0).toString(16));
// }
// Generate new id
function nextId() {
    return 'xxxxxxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
}


// Функция, която декорира req / Функция, която връща друга функция
module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createItem,
        deleteItem,
        editItem
    };
    next();
};

// {
//     id: '3ba2d888-1ce4',
//     name: 'VW Golf 1.9 TDI 90ps High-Line',
//     description: 'THE PRICE IS NON-NEGOTIABLE!!! Newly imported, 202 799 km, 90hp diesel. Manual transmission.',
//     imageUrl: '11642697845129757_i2.jpg',
//     price: 2699
//   }