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
        await fs.writeFile(filePath, JSON.stringify(data));
    } catch (err) {
        console.error('Database write error');
        console.error(err);
        process.exit(1); // Спира приложението
    }
}

// CRUD functions
async function getAll() {
    const data = await read();
    // console.log(data['3ba2d888-1ce4']);
    return Object
        .entries(data)
        .map(([id, obj]) => Object.assign({}, { id }, obj));
}

async function getById(id) {
    const data = await read();
    const car = data[id];
    return Object.assign({}, { id }, car);
}



// Функция, която декорира req / Функция, която връща друга функция
module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById
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