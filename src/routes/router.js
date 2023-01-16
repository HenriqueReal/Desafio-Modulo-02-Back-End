const express = require('express');

const router = express();

const accountsList = require('../controllers/accountsList');
const signUpAccount = require('../controllers/signUpAccount');
const checkPasswords = require('../middlewares/checkPasswords');
const updateAccount = require('../controllers/updateAccount');
const deleteAccount = require('../controllers/deleteAccount');
const transictionsDeposit = require('../controllers/transictionsDeposit');
const transictionsWithdraw = require('../controllers/transictionsWithdraw');
const transictionsTransfer = require('../controllers/transictionsTransfer');
const accountBalance = require('../controllers/accountBalance');
const accountStatement = require('../controllers/accountStatement');

router.get('/contas?', checkPasswords.validatePasswordList, accountsList.accountsList);

router.post('/contas', signUpAccount.signUpAccount);

router.put('/contas/:numeroConta/usuario', checkPasswords.validatePasswordAndNumberParamsAccount, updateAccount.updateAccount);

router.delete('/contas/:numeroConta',checkPasswords.validatePasswordAndNumberParamsAccount, deleteAccount.deleteAccount);

router.post('/transacoes/depositar', transictionsDeposit.transictionsDeposit);

router.post('/transacoes/sacar', checkPasswords.validatePasswordAndNumberAccountBody,transictionsWithdraw.transictionsWithdraw);

router.post('/transacoes/transferir',transictionsTransfer.transictionsTransfer);

router.get('/contas/saldo',checkPasswords.validatePasswordAndNumberQueryAccount,accountBalance.accountBalance);

router.get('/contas/extrato?',checkPasswords.validatePasswordAndNumberQueryAccount,accountStatement.accountStatement);

module.exports = router;
