const dataBase = require('../dataBase');
const {foundIndexAccount} = require('./foundIndexAccount');

const updateAccount = (req, res) => {
    const {nome,cpf,data_nascimento,telefone,email,senha} = req.body;
    const {numeroConta} = req.params;
    
    let foundIndexAccountThis = foundIndexAccount(numeroConta);
    
    if (dataBase.contas != []) {
        for (const conta of dataBase.contas) {
            if (conta.usuario.cpf === cpf &&  foundIndexAccountThis !== foundIndexAccount(conta.numero)) {
                res.status(400).json({mensagem: "Já existe uma conta com o cpf informado!"})
                return
            }
            if (conta.usuario.email === email && foundIndexAccountThis !== foundIndexAccount(conta.numero)) {
                res.status(400).json({mensagem: "Já existe uma conta com o e-mail informado!"})
                return
            }
        }
    }

    dataBase.contas[foundIndexAccountThis].usuario = {
        nome,
        cpf,
        data_nascimento, 
        telefone, 
        email, 
        senha, 
    };

    return res.status(201).json();
}

module.exports = {
    updateAccount
}