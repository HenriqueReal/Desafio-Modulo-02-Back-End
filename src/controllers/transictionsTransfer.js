let {contas,transferencias} = require('../dataBase');
const {format} = require('date-fns');
const {foundAccount} = require('./foundAccount');
const {foundIndexAccount} = require('./foundIndexAccount');

const transictionsTransfer = (req, res) => {
    const {numero_conta_origem, numero_conta_destino, valor, senha} = req.body;
    
    if(!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({mensagem: "Todos os campos são OBRIGATÓRIOS!"})
    }

    let foundAccountThisOrigin = foundAccount(numero_conta_origem);
    let foundAccountThisDestiny = foundAccount(numero_conta_destino);

    if (foundAccountThisOrigin === undefined) {
        return res.status(403).json({mensagem: "A conta de ORIGEM informada NÃO existe!"})
    }

    if (foundAccountThisDestiny === undefined) {
        return res.status(403).json({mensagem: "A conta de DESTINO informada NÃO existe!"})
    }
    
    if (senha !== foundAccountThisOrigin.usuario.senha) {
        return res.status(403).json({mensagem: "Senha INCORRETA!"})
    }

    if (valor > foundAccountThisOrigin.saldo) {
        return res.status(404).json({mensagem: "Saldo Insuficiente!"})
    }

    let foundindexAccountOrigin = foundIndexAccount(numero_conta_origem);
    let foundindexAccountDestiny = foundIndexAccount(numero_conta_destino);

    contas[foundindexAccountOrigin].saldo -= Number(valor);
    contas[foundindexAccountDestiny].saldo += Number(valor);
    transferencias.push(
        {
        data: format (new Date(), 'yyyy-mm-dd kk:mm:ss'),
        numero_conta_origem,
        numero_conta_destino,
        valor
        }
    )
    
    return res.status(200).json();
}

module.exports = {
    transictionsTransfer
}