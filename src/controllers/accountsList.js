const dataBase = require('../dataBase');

const accountsList = (req, res) => {
    res.status(200).json(dataBase.contas);
}

module.exports = {
    accountsList
}