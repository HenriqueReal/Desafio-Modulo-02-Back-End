const dataBase = require('../dataBase');

const checkInformations = (req,res) => {
    const {nome,cpf,data_nascimento,telefone,email,senha} = req.body;

    if(!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        res.status(400).json({mensagem: "Todos os campos são OBRIGATÓRIOS!"})
        return
    }
    
    if(dataBase.contas !== []) {
        for(const conta of dataBase.contas) {
            if(conta.usuario.cpf === cpf) {
                res.status(400).json({mensagem: "Já existe uma conta com o cpf informado!"})
                return false;
            }
            
            if(conta.usuario.email === email) {
                res.status(400).json({mensagem: "Já existe uma conta com o e-mail informado!"})
                return false;
            }
        }
    }
    return true
}

module.exports = {
    checkInformations,
}