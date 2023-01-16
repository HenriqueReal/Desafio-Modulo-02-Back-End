const {contas} = require("../dataBase");
const {foundAccount} = require('./foundAccount');

const accountBalance = (req,res) => {
    const {numero_conta} = req.query;

    let foundAccountThis = foundAccount(numero_conta);
    let saldo = foundAccountThis.saldo

    return res.status(200).json({saldo});

}

module.exports = {
    accountBalance
}