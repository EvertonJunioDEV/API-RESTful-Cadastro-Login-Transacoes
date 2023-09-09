const pool = require('../../dados-sensiveis/conexao');

const validarEmailCadastro = async (req, res, next) => {
    const {nome, email, senha} = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ "mensagem": "Todos os campos são obrigatórios." });
    };

    const { rowCount } = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if(rowCount > 0) {
        return res.status(409).json({ "mensagem": "Email ja está em uso." });
    };
    
    next();
};

module.exports = validarEmailCadastro;