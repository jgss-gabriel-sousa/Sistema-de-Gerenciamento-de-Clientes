import React from 'react';

const ClientTable = ({ clients }) => (
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
				<td>{client.nome}</td>
				<td>{client.email}</td>
				<td>{client.telefone}</td>
				<td>{client.coord_x}</td>
				<td>{client.coord_y}</td>
			</tr>
		))}
		</tbody>
	</table>
);

export default ClientTable;
