import React, { useState, useEffect } from 'react';
import './App.css';
import ClientTable from './components/ClientTable';
import ClientForm from './components/ClientForm';
import ClientRoute from './components/ClientRoute';

function App() {
    const apiURL = 'http://localhost:8080';
    const [clients, setClients] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [filterPhone, setFilterPhone] = useState('');
    const [filterEmail, setFilterEmail] = useState('');
    const [route, setRoute] = useState([]);

    useEffect(() => {
        fetchClients();
    }, []);

    const handleFilterChange = (event) => {
        if(event.target.name === "filter-name"){
            setFilterName(event.target.value);
        }
        if(event.target.name === "filter-phone"){
            setFilterPhone(event.target.value);
        }
        if(event.target.name === "filter-email"){
            setFilterEmail(event.target.value);
        }
    };

    // Função para buscar clientes
    const fetchClients = async () => {
        try {
            const response = await fetch(`${apiURL}/clients`);
            const data = await response.json();
            setClients(data);
        } catch (error) {
            console.error("Erro ao buscar clientes do banco de dados:", error);
        }
    };
    
    // Função que busca a rota dos clientes na API
    const handleCalculateRoutes = async () => {
        try {
            const response = await fetch(`${apiURL}/calculateRoute`);
            const data = await response.json();
            setRoute(data);
        } catch (error) {
            console.error('Erro ao buscar clientes com rota otimizada:', error);
        }
    };

    // Função que registra novos clientes na API
    const handleClientRegister = async (newClient) => {
        try {
            const response = await fetch(`${apiURL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newClient),
            });

            if (response.ok) {
                fetchClients();
            } else {
                console.error("Erro ao cadastrar cliente:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
        }
    };

    // Filtro da lista de clientes
    const filteredClients = clients.filter((client) =>
        client.nome.toLowerCase().includes(filterName.toLowerCase()) &&
        client.telefone.toLowerCase().includes(filterPhone.toLowerCase()) &&
        client.email.toLowerCase().includes(filterEmail.toLowerCase())
    );

    return (
        <div className="App">
            <h1>Gerenciamento de Clientes</h1>
            
            <section className="Container">
			    <h2>Lista de Cliente</h2>
                <div className="Filters">
                    <div>
                        <label>Filtrar por Nome: </label>
                        <input type="text" name="filter-name" value={filterName} onChange={handleFilterChange}/>
                    </div>
                    <div>
                        <label>Filtrar por Telefone: </label>
                        <input type="text" name="filter-phone" value={filterPhone} onChange={handleFilterChange}/>
                    </div>
                    <div>
                        <label>Filtrar por Email: </label>
                        <input type="text" name="filter-email" value={filterEmail} onChange={handleFilterChange}/>
                    </div>
                </div>

                <ClientTable clients={filteredClients}/>
            </section>

            <section className="Container">
			    <h2>Cadastrar Novo Cliente</h2>
                <ClientForm onClientRegister={handleClientRegister}/>
            </section>
            
            <section className="Container">
			    <h2>Rota dos Cliente</h2>
                <button onClick={handleCalculateRoutes}>Calcular Rota Otimizada</button>
                
                <ClientRoute clients={route}/>
            </section>
        </div>
    );
}

export default App;
