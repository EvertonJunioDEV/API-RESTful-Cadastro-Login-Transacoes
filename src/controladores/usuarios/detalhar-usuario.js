const pool = require('../../dados-sensiveis/conexao')

const detalharUsuario = async (req,res)=>{
   const idToken = req.idToken;

   try {
      const usuario = await pool.query('SELECT id, nome, email FROM usuarios WHERE id = $1',[idToken]);

      return res.json(usuario.rows[0]);
    
   } catch (error) {
      return res.status(500).json({'mensagem': `${error.mesage}`});
 };
 
};

module.exports = detalharUsuario;