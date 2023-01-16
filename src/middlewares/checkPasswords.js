const dataBase = require('../dataBase');
const {contas} = require('../dataBase');
const {foundAccount} = require('../controllers/foundAccount');
const {foundIndexAccount} = require('../controllers/foundIndexAccount');

const validatePasswordList = (req, res, next) => {
    const {senha_banco} = req.query;
    
    if(senha_banco !== 'Cubos123Bank') {
        res.status(403).json({mensagem: "A senha do banco informada é INVÁLIDA!"})
        return
    }
    return next();
}

const validatePasswordAndNumberParamsAccount = (req, res, next) => {
    const {numeroConta} = req.params;
    const {senha} = req.body;

    let foundAccountThis = foundAccount(numeroConta);
    let foundIndexAccountThis = foundIndexAccount(numeroConta); 
    if (foundAccountThis === undefined) {
        return res.status(403).json({mensagem: "O número da conta informado é INVÁLIDO!"})
    }
    
    if(contas[foundIndexAccountThis].usuario.senha !== senha) {
        return res.status(403).json({mensagem: "A senha da conta informada é INVÁLIDA!"})
    }

    return next();
}

const validatePasswordAndNumberAccountBody = (req,res,next) => {
    const {numero_conta, senha} = req.body;
    
    let foundAccountThis = foundAccount(numero_conta);
    let foundIndexAccountThis = foundIndexAccount(numero_conta); 
    if (foundAccountThis === undefined) {
        return res.status(403).json({mensagem: "O número da conta informado é INVÁLIDO!"})
    }
    
    if(contas[foundIndexAccountThis].usuario.senha !== senha) {
        return res.status(403).json({mensagem: "A senha da conta informada é INVÁLIDA!"})
    }

    return next();
}

const validatePasswordAndNumberQueryAccount = (req, res, next) => {
    const {numero_conta, senha} = req.query;

    let foundAccountThis = foundAccount(numero_conta);
    let foundIndexAccountThis = foundIndexAccount(numero_conta); 
    
    if(!numero_conta || !senha) {
        return res.status(400).json({mensagem: "Numero da conta e Senha são OBRIGATÓRIOS!"})
    }

    if(foundAccountThis === undefined || contas[foundIndexAccountThis].usuario.senha != senha) {
        console.log(senha);
        return res.status(403).json({mensagem: "Conta bancária não encontada!"})
    }

    return next();
}


module.exports = {
    validatePasswordList,
    validatePasswordAndNumberParamsAccount,
    validatePasswordAndNumberAccountBody,
    validatePasswordAndNumberQueryAccount
}