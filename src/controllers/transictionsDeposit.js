let {contas,depositos} = require('../dataBase');
const {format} = require('date-fns');
const {foundAccount} = require('./foundAccount');
const {foundIndexAccount} = require('./foundIndexAccount');

const transictionsDeposit = (req,res) => {
    const {numero_conta, valor} = req.body;

    if (!numero_conta || !valor) {
        return res.status(400).json({mensagem: "O número da conta e o valor são OBRIGATÓRIOS!"})
    }

    let foundAccountThis = foundAccount(numero_conta);
    let foundIndexAccountThis = foundIndexAccount(numero_conta);

    if (!foundAccountThis) {
        return res.status(400).json({mensagem: "A conta informada é INVÁLIDA!"})
    }

    if (valor <= 0) {
        return res.status(400).json({mensagem: "Valor de depósito INVÁLIDO"})
    }

    contas[foundIndexAccountThis].saldo += Number(valor);
    depositos.push(
        {
        data: format (new Date(), 'yyyy-mm-dd kk:mm:ss'),
        numero_conta,
        valor
        }
    )

    return res.status(201).json();
}

module.exports = {
    transictionsDeposit
}