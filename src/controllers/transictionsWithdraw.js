let {contas,saques} = require('../dataBase');
const {format} = require('date-fns');
const {foundAccount} = require('./foundAccount');
const {foundIndexAccount} = require('./foundIndexAccount');

const transictionsWithdraw = (req, res) => {
    const {numero_conta, senha, valor} = req.body;

    if (!numero_conta || !senha || !valor) {
        return res.status(400).json({mensagem: "O número da conta, senha e valor são OBRIGATÓRIOS!"})
    }

    let foundAccountThis = foundAccount(numero_conta);
    let founIndexAccountThis = foundIndexAccount(numero_conta);

    if (foundAccountThis.saldo < Number(valor)) {
        return res.status(400).json({mensagem: `O valor de saque NÃO pode ser maior que o saldo em conta! Saldo atual:R$${foundAccountThis.saldo}`})
    }

    contas[founIndexAccountThis].saldo -= valor;
    saques.push(
         {
        data: format (new Date(), 'yyyy-mm-dd kk:mm:ss'),
        numero_conta,
        valor
    }
    )
    return res.status(201).json();
}

module.exports = {
    transictionsWithdraw
}