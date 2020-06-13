const fs = require('fs');

const meuArquivo = 'Log.txt';

const guardarLog = (msg) => {
    const dtLog = new Date();
    fs.appendFileSync(meuArquivo, `${dtLog} -> ${msg}\n`);
} 

module.exports = guardarLog;