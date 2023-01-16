const {contas} = require('../dataBase');

const foundAccount = ((numeroConta) => {
    return contas.find((account) => {
        return account.numero == numeroConta;
    });
});

module.exports = {
    foundAccount
}