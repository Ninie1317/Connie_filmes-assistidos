-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS filmes_db;

-- Seleciona o banco de dados
USE filmes_db;

-- Criação da tabela de filmes
CREATE TABLE IF NOT EXISTS filmes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    duracao INT NOT NULL,
    assistido BOOLEAN NOT NULL
);
