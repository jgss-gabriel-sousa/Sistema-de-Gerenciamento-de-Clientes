const pool = require("../config/connection");

const listClients = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        let query = "SELECT * FROM clients WHERE 1=1";
        const values = [];
/*
        if(name){
            query += " AND nome = $1";
            values.push(name);
        }

        if(email){
            query += " AND email = $" + (values.length + 1);
            values.push(email);
        }

        if(phone){
            query += " AND telefone = $" + (values.length + 1);
            values.push(phone);
        }*/

        console.log("test")
        const result = await pool.query(query, values);
        console.log(query)
        console.log(result)
        return res.status(200).json(result.rows);
    
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = { listClients };