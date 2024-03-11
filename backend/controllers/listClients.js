const db = require("../database");

const listClients = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        let query = "SELECT * FROM clientes WHERE 1=1 ";
        const values = [];

        if(name){
            //Lógica para escrever a query sem colocar os valores diretamente, para garantir a segurança

            values.push(name);
            query += "AND nome = $" + values.length;
        }
        if(email){
            values.push(email);
            query += "AND email = $" + values.length;
        }
        if(phone){
            values.push(phone);
            query += "AND telefone = $" + values.length;
        }
        
        const clients = await db.oneOrNone(query, values);
        
        return clients ? res.status(200).json(clients) : res.status(404);
    
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = { listClients };