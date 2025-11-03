-- Use o nome do seu schema
CREATE SCHEMA IF NOT EXISTS game_stats DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE game_stats;

-- Tabelas de Dimensão (Lookup Tables)

CREATE TABLE mapa (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      nome VARCHAR(255) NOT NULL
);

CREATE TABLE modo_de_jogo (
                              id INT AUTO_INCREMENT PRIMARY KEY,
                              nome VARCHAR(255) NOT NULL,
                              descricao TEXT
);

CREATE TABLE jogador (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         nome VARCHAR(255) NOT NULL UNIQUE,
                         nivel INT,
                         patente VARCHAR(100)
);

CREATE TABLE time (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      nome VARCHAR(255) NOT NULL
);

CREATE TABLE arma (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      nome VARCHAR(255) NOT NULL,
                      tipo VARCHAR(100),
                      dano INT
);

CREATE TABLE operador (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          nome VARCHAR(255) NOT NULL,
                          velocidade INT,
                          vida INT
);

-- Tabelas de Especialização (Herança)

CREATE TABLE ataque (
                        id INT PRIMARY KEY,
                        habilidade_especial VARCHAR(255),
                        CONSTRAINT fk_ataque_operador FOREIGN KEY (id) REFERENCES operador(id) ON DELETE CASCADE
);

CREATE TABLE defesa (
                        id INT PRIMARY KEY,
                        habilidade_especial VARCHAR(255),
                        CONSTRAINT fk_defesa_operador FOREIGN KEY (id) REFERENCES operador(id) ON DELETE CASCADE
);

-- Tabela de Junção (Muitos-para-Muitos)

CREATE TABLE operador_arma (
                               operador_id INT NOT NULL,
                               arma_id INT NOT NULL,
                               PRIMARY KEY (operador_id, arma_id),
                               CONSTRAINT fk_operadorarma_operador FOREIGN KEY (operador_id) REFERENCES operador(id) ON DELETE CASCADE,
                               CONSTRAINT fk_operadorarma_arma FOREIGN KEY (arma_id) REFERENCES arma(id) ON DELETE CASCADE
);

-- Tabela de Fatos Principal

CREATE TABLE partida (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         mapa_id INT NOT NULL,
                         modo_de_jogo_id INT NOT NULL,
                         time_vencedor_id INT, -- Pode ser nulo se a partida for indefinida
                         duracao_minutos INT,
                         CONSTRAINT fk_partida_mapa FOREIGN KEY (mapa_id) REFERENCES mapa(id),
                         CONSTRAINT fk_partida_modo FOREIGN KEY (modo_de_jogo_id) REFERENCES modo_de_jogo(id),
                         CONSTRAINT fk_partida_time_vencedor FOREIGN KEY (time_vencedor_id) REFERENCES time(id)
);

-- Tabela de Fatos (Desempenho)

CREATE TABLE participa (
                           id INT AUTO_INCREMENT PRIMARY KEY,
                           jogador_id INT NOT NULL,
                           partida_id INT NOT NULL,
                           time_id INT NOT NULL,
                           operador_id INT NOT NULL,
                           pontuacao INT DEFAULT 0,
                           kills INT DEFAULT 0,
                           deaths INT DEFAULT 0,
                           assists INT DEFAULT 0,

                           CONSTRAINT fk_participa_jogador FOREIGN KEY (jogador_id) REFERENCES jogador(id),
                           CONSTRAINT fk_participa_partida FOREIGN KEY (partida_id) REFERENCES partida(id) ON DELETE CASCADE,
                           CONSTRAINT fk_participa_time FOREIGN KEY (time_id) REFERENCES time(id),
                           CONSTRAINT fk_participa_operador FOREIGN KEY (operador_id) REFERENCES operador(id)
);

-- Tabela de Fatos (Detalhes do Desempenho)

CREATE TABLE dados (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       participa_id INT NOT NULL UNIQUE, -- Relação 1:1 com a participação
                       headshots INT DEFAULT 0,
                       gadgets_destruidos INT DEFAULT 0,

                       CONSTRAINT fk_dados_participa FOREIGN KEY (participa_id) REFERENCES participa(id) ON DELETE CASCADE
);