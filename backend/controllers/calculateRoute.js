const math = require("mathjs");
const db = require("../database");

let facilitaOBJ = { 
    id: 0,
    name: "Facilita Jurídico",
    email: "facilita@facilita.juridico",
    phone: "559999999",
    x: 0, 
    y: 0
}

const calculateRoute = async (req, res) => {
    try {
        const clients = await db.query("SELECT * FROM clientes");

        const coordinates = clients.map((client) => ({
            id: client.id,
            name: client.nome,
            email: client.email,
            phone: client.telefone,
            x: client.coord_x,
            y: client.coord_y,
        }));

        coordinates.unshift(facilitaOBJ);

        let graph = {};

        for(const client of coordinates) {
            graph[client.id] = {};

            for(const c of coordinates) {
                if(c.id == client.id || client.id == c.id) continue;

                graph[client.id][c.id] = math.distance([client.x, client.y], [c.x, c.y]);
            }
        }

        function calculateDijkstra(graph, origem) {
            const distancias = {};
            const visitados = new Set();
        
            // Inicialização das distâncias com infinito, exceto a origem que é zero
            for (let v in graph) {
                distancias[v] = Infinity;
            }
            distancias[origem] = 0;
        
            while (visitados.size !== Object.keys(distancias).length) {
                // Encontra o vértice não visitado com menor distância atual
                let verticeAtual = null;
                let menorDistancia = Infinity;
                for (let v in graph) {
                    if (!visitados.has(v) && distancias[v] < menorDistancia) {
                        verticeAtual = v;
                        menorDistancia = distancias[v];
                    }
                }
        
                // Marca o vértice atual como visitado
                visitados.add(verticeAtual);
        
                // Atualiza as distâncias dos vértices vizinhos
                for (let vizinho in graph[verticeAtual]) {
                    const peso = graph[verticeAtual][vizinho];
                    if (distancias[verticeAtual] + peso < distancias[vizinho]) {
                        distancias[vizinho] = distancias[verticeAtual] + peso;
                    }
                }
            }
        
            // Retorna as distâncias mais curtas a partir da origem
            return distancias;
        }

        const result = calculateDijkstra(graph, "0");
        
        // Convertendo o objeto em uma matriz de pares chave-valor e ordenando a matriz com base nos valores
        const keyValuePairs = Object.entries(result);
        const sortedArray = keyValuePairs.sort((a, b) => a[1] - b[1]);
    
        // Extraindo o valor das chaves
        const routeIDS = sortedArray.map(pair => pair[0]);

        const sortedData = [];
        
        routeIDS.forEach(id => {
            const obj = coordinates.find(item => item.id.toString() === id);
            if (obj) {
            sortedData.push(obj);
            }
        });
        const route = sortedData;
        route.push(facilitaOBJ);

        return res.status(200).json(route);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = { calculateRoute }