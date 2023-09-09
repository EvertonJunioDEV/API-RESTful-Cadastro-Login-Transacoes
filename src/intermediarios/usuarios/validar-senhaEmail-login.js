const pool = require('../../dados-sensiveis/conexao');
const bcrypt = require('bcrypt');

const validarSenhaEEmailLogin = async (req, res, next)=>{
    const {senha, email} = req.body;
    
    if (!email || !senha) {
        return res.status(400).json({ "mensagem": "Todos os campos são obrigatórios." });
    };
    
    try {

        const emailUsuario = await pool.query('SELECT email FROM usuarios WHERE email = $1',[email]);

        if (emailUsuario.rowCount < 1){
            return res.status(403).json({"mensagem": "Usuário e/ou senha inválido(s)."});
        };

        const senhaUsuario = await pool.query('SELECT senha FROM usuarios WHERE email = $1',[email]);
        const senhaValidada = await bcrypt.compare(senha, senhaUsuario.rows[0].senha);

        
        if(!senhaValidada){
            return res.status(403).json({"mensagem": "Usuário e/ou senha inválido(s)."});
        };
        
        next();

    }catch (error) {
        return res.satus(500).json({'mensagem': `${error.message}`});
    };
};
module.exports = validarSenhaEEmailLogin;