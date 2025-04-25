drop schema if exists crud_tenis;
create schema crud_tenis;
use crud_tenis;

CREATE TABLE tenis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  marca VARCHAR(255) NOT NULL,
  tamanho DECIMAL(3,1) NOT NULL,
  cor VARCHAR(50) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tenis (nome, marca, tamanho, cor, preco) VALUES
('Air Jordan 1 Retro High', 'Nike', 42.5, 'Vermelho/Preto/Branco', 1299.90),
('Yeezy Boost 350 V2', 'Adidas', 41.0, 'Preto/Preto', 1499.99),
('Chuck Taylor All Star', 'Converse', 39.5, 'Branco', 249.90),
('Superstar', 'Adidas', 40.0, 'Branco/Preto', 699.90),
('Air Max 270', 'Nike', 43.0, 'Cinza/Branco', 899.90),
('Ultra Boost', 'Adidas', 41.5, 'Preto/Branco', 1199.90),
('Cortez Classic', 'Nike', 38.0, 'Vermelho/Branco', 499.90),
('Stan Smith', 'Adidas', 42.0, 'Verde/Branco', 599.90),
('New Balance 574', 'New Balance', 40.5, 'Cinza/Branco', 799.90),
('Vans Old School', 'Vans', 39.0, 'Preto/Branco', 399.90);