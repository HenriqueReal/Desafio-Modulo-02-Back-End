const {contas} = require('../dataBase');

const foundIndexAccount = ((numeroConta) => {
    return contas.findIndex((account) => {
        return account.numero == numeroConta;
    });
});

module.exports = {
    foundIndexAccount
}