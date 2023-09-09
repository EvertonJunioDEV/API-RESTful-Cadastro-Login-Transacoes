const pool = require('../../dados-sensiveis/conexao');

const listarCategorias = async (req, res) => {
    
     try {
          const querySelect = 'SELECT * FROM categorias';

          const resultadoCategorias = await pool.query(querySelect);

          return res.json(resultadoCategorias.rows);

   } catch (error) {
        res.status(500).json({ "mensagem": `${error.message}`});
   };
    
};

module.exports = listarCategorias;