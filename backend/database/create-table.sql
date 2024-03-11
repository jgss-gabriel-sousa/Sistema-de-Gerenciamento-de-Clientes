CREATE TABLE IF NOT EXISTS clientes (
	id 			SERIAL PRIMARY KEY,
	nome 		varchar(50) NOT NULL, 
	email 		varchar(200) NOT NULL,
	telefone 	varchar(20) NOT NULL,
	coord_x 	INT NOT NULL,
	coord_y 	INT NOT NULL
);