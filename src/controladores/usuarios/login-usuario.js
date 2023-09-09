const pool = require('../../dados-sensiveis/conexao');
const senhaJWT = require('../../dados-sensiveis/senha-JWT');

const jwt = require('jsonwebtoken');

const loginUsuario = async (req, res) => {
    const { email } = req.body;

    try {
        const idUsuario = await pool.query('SELECT id FROM usuarios WHERE email = $1', [email]);
        const nomeUsuario = await pool.query('SELECT nome FROM usuarios WHERE email = $1', [email]);

        const token = jwt.sign({ id: idUsuario.rows[0].id }, senhaJWT, { expiresIn: '8h' });

        const usuarioEditado = {
            usuario: {
                "id": idUsuario.rows[0].id,
                "nome": nomeUsuario.rows[0].nome,
                "email": email
            },
            "token": token
        };

        return res.json(usuarioEditado);

    } catch (error) {
        return res.status(500).json({ 'mensagem': `${error.message}` });
    };

};

module.exports = loginUsuario;

