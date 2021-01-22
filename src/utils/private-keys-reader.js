const fs = require('fs');

const buffer = fs.readFileSync('.private-keys.json');
const readedString = buffer.toString();
const data = JSON.parse(readedString);

const getKey = () => {
    return data.apiKey;
}

const getUrl = () => {
    return data.url;
}

module.exports = {
    getKey,
    getUrl
}