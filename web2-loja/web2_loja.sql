CREATE DATABASE IF NOT EXISTS web2_loja;
USE web2_loja;

CREATE TABLE categoria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(60) NOT NULL
);

CREATE TABLE produto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  preco DECIMAL(10,2) NOT NULL CHECK (preco >= 0),
  estoque INT NOT NULL DEFAULT 0,
  categoria_id INT,
  FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

INSERT INTO categoria (nome) VALUES ('Informática'), ('Papelaria');

INSERT INTO produto (nome, preco, estoque, categoria_id) VALUES
  ('Teclado USB', 89.90, 15, 1),
  ('Mouse sem fio', 59.90, 30, 1),
  ('Caderno 10 mat.', 24.50, 50, 2),
  ('Caneta azul', 2.30, 200, 2);

CREATE USER IF NOT EXISTS 'app_web2'@'localhost' IDENTIFIED BY 'troque-esta-senha';
GRANT SELECT, INSERT, UPDATE, DELETE ON web2_loja.* TO 'app_web2'@'localhost';
