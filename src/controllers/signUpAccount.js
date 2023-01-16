const dataBase = require('../dataBase');
const {checkInformations} = require('./checksInformations');

let number = 0;
const signUpAccount = (req, res) => {
    const {nome,cpf,data_nascimento,telefone,email,senha} = req.body;
    
    let accountValid = checkInformations(req,res);
    
        if (accountValid) {
            number++;
            const account = {
                numero: number,
                saldo: 0,
                usuario: {
                    nome,
                    cpf,
                    data_nascimento,
                    telefone,
                    email,
                    senha,
                }
            }
            dataBase.contas.push(account);
            return res.status(201).json();
        }
    
}

module.exports = {
    signUpAccount
}