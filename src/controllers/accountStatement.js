const {depositos, saques, transferencias} = require('../dataBase');

const accountStatement = (req, res) => {
    const {numero_conta} = req.query;
    
    
    const deposit = depositos.filter((transiction) => {
        return transiction.numero_conta == numero_conta
    })
        

    const withdraw = saques.filter((transiction) => {
        return transiction.numero_conta == numero_conta
    })

    const transictionSent = transferencias.filter((transiction) => {
        return transiction.numero_conta_origem == numero_conta
    })

    const transictionReceived = transferencias.filter((transiction) => {
        return transiction.numero_conta_destino == numero_conta
    })

    return res.status(200).json({
        deposit,
        withdraw,
        transictionSent,
        transictionReceived
    })
}

module.exports = {
    accountStatement
}