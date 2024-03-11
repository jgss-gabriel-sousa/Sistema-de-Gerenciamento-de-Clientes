import React, { useState } from 'react';

const ClientForm = ({ onClientRegister }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [coord_x, setCoordX] = useState('');
	const [coord_y, setCoordY] = useState('');

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		const newClient = {
			name,
			email,
			phone,
			coord_x: coord_x,
			coord_y: coord_y,
		};

		// Callback para o cadastro
		onClientRegister(newClient);

		// Limpar os campos apos o cadastro
		setName('');
		setEmail('');
		setPhone('');
		setCoordX('');
		setCoordY('');
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<label>Nome:</label>
			<input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

			<label>Email:</label>
			<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

			<label>Telefone:</label>
			<input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />

			<label>Coordenada X:</label>
			<input type="number" value={coord_x} onChange={(e) => setCoordX(e.target.value)} required />

			<label>Coordenada Y:</label>
			<input type="number" value={coord_y} onChange={(e) => setCoordY(e.target.value)} required />

			<button type="submit">Cadastrar</button>
		</form>
	);
};

export default ClientForm;
