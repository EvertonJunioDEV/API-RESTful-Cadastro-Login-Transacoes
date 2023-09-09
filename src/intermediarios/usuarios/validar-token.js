const senhaJWT = require("../../dados-sensiveis/senha-JWT");
const jwt = require('jsonwebtoken');

const validacaoToken = (req, res, next) => {
    const { authorization } = req.headers;

    try {

        if (!authorization || authorization === "Bearer" ) {
            return res.status(400).json({ 'mensagem': 'Token não informado, informe o token fazendo o login' });
        };

        const token = authorization.split(' ')[1];
        const { id } = jwt.verify(token, senhaJWT);

        if (!id) {
            return res.status(401).json({ 'mensagem': 'Token Incorreto Ou Expirado' });
        };

        req.idToken = id;

        next();

    } catch (error) {
        if (error.message === "jwt malformed"){
            return res.status(400).json({'mensagem': 'Formato Incorreto Do Token'});
        };

        if(error.message === "jwt expired" || error.message === "invalid signature"){
            return res.status(401).json({ 'mensagem': 'Token Incorreto Ou Expirado' });
        };
        
        return res.status(500).json({ "mensagem": `${error.message}` });
    }

}

module.exports = validacaoToken;