const {contas} = require('../dataBase');
const {foundAccount} = require('./foundAccount');

const deleteAccount = (req, res) => {
    const {numeroConta} = req.params;
    
    const foundAccountThis = foundAccount(numeroConta);
    
    if(foundAccountThis.saldo != 0) {
        return res.status(400).json({mensagem: "A conta só pode ser removida se o saldo for ZERO!"})
    }
    
    let indexAccount = contas.findIndex((account) => {
        return account.numero == numeroConta;
    });

    if(indexAccount >= 0) {
        contas.splice(indexAccount,1);

        return res.status(204).json();
    }
}

module.exports = {
    deleteAccount
}