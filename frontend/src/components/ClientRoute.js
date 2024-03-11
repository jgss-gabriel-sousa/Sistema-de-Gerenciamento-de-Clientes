import React from 'react';

const ClientRoute = ({ clients }) => (
	<table>
		<thead>
		<tr>
			<th>Nome</th>
			<th>Email</th>
			<th>Telefone</th>
			<th>Coordenada X</th>
			<th>Coordenada Y</th>
		</tr>
		</thead>
		<tbody>
		{clients.map((client) => (
			<tr key={client.id}>
				<td>{client.name}</td>
				<td>{client.email}</td>
				<td>{client.phone}</td>
				<td>{client.x}</td>
				<td>{client.y}</td>
			</tr>
		))}
		</tbody>
	</table>
);

export default ClientRoute;
