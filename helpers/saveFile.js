const fs = require('fs');
const file = './db/data.json';

const saveOnDB = (data) => {
    fs.writeFileSync(file, JSON.stringify(data));
}

const readDB = () => {
    if(!fs.existsSync(file)){
        return null;
    }

    const info = JSON.parse(fs.readFileSync(file, {encoding: 'utf-8'}));
    
    return info;
}

module.exports = {
    saveOnDB,
    readDB
};