const pool = require('../../dados-sensiveis/conexao');

const validarAtualizacaoUsuario = async (req, res, next) => {
    const idUsuario = req.idToken;

    const {nome, email, senha} = req.body;
    
    if (!nome || !email || !senha) {
        return res.status(400).json({ "mensagem": "Todos os campos são obrigatórios." });
    };

    const querySelect = 'SELECT email FROM usuarios WHERE email = $1 AND id != $2';

    const { rowCount } = await pool.query(querySelect, [email, idUsuario]);
    
    if(rowCount > 0) {
        return res.status(409).json({ "mensagem": "Email ja está em uso." });
    };
    
    next();
};

module.exports = validarAtualizacaoUsuario;