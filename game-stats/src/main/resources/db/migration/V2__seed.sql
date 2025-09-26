-- V2__seed.sql

-- Mapas
INSERT INTO Mapa (Nome) VALUES ('Banco'), ('Casa'), ('Consulado');

-- Modos de Jogo
INSERT INTO Modo_de_Jogo (Nome, Descricao, Tipo) VALUES
('Casual', 'Modo de jogo rápido', 'PVP'),
('Competitivo', 'Modo ranqueado', 'PVP'),
('Treinamento', 'Modo contra bots', 'PVE');

-- Dados (estatísticas base para Jogadores)
INSERT INTO Dados (Nivel, Winrate, RankJogador, Headshot, KD) VALUES
(50, 55.5, 'Prata', 47.8, 1.2),
(120, 62.3, 'Ouro', 49.0, 1.5),
(200, 70.1, 'Diamante', 52.4, 1.9);

-- Jogadores
INSERT INTO Jogador (Nickname, fk_Dados_Dados_PK_INT) VALUES
('ShadowKiller', 1),
('N1njaPro', 2),
('HeadshotMaster', 3);

-- Operadores
INSERT INTO Operador (Nome, Velocidade, Blindagem, Unidade_Especial) VALUES
('Ash', 3, 1, 'FBI'),
('Castle', 2, 2, 'FBI'),
('Sledge', 2, 2, 'SAS'),
('Smoke', 2, 2, 'SAS');

-- Classificação (Ataque/Defesa)
INSERT INTO Ataque (fk_Operador_ID_Operador, Drone, Gadget_Unico_Ataque, Habilidade_Unica_Ataque) VALUES
(1, 2, 'Breach Charge', 'Ash Launcher'),
(3, 2, 'Hammer Smash', 'Sledge Hammer');

INSERT INTO Defesa (fk_Operador_ID_Operador, Gadget_Unico_Defesa, Habilidade_Unica_Defesa, Preparo) VALUES
(2, 'Armor Panel', 'Barricadas Reforçadas', 'Preparar'),
(4, 'Gas Canister', 'Granada de Gás', 'Armar Armadilha');

-- Armas
INSERT INTO Arma (Nome, Cadencia, Tipo, Dano, Capacidade) VALUES
('R4-C', 860, 'Rifle de Assalto', 39, 30),
('M1014', 200, 'Espingarda', 65, 8),
('MP5', 800, 'Submetralhadora', 27, 30);

-- Associação Operador ↔ Arma
INSERT INTO Porta (fk_Operador_ID_Operador, fk_Arma_ID_Arma) VALUES
(1, 1), (1, 2),
(2, 3),
(3, 1),
(4, 3);