-- Desabilita a verificação de chaves estrangeiras
SET FOREIGN_KEY_CHECKS=0;

-- Trunca cada tabela individualmente (com os nomes corretos do V1)
TRUNCATE TABLE Mapa;
TRUNCATE TABLE Modo_de_Jogo;
TRUNCATE TABLE Dados;
TRUNCATE TABLE Jogador;
TRUNCATE TABLE Operador;
TRUNCATE TABLE Ataque;
TRUNCATE TABLE Defesa;
TRUNCATE TABLE Jogador_Op_Atk;
TRUNCATE TABLE Jogador_Op_Def;
TRUNCATE TABLE Arma;
TRUNCATE TABLE Acessorio;
TRUNCATE TABLE Partida;
TRUNCATE TABLE Time;
TRUNCATE TABLE Honra;
TRUNCATE TABLE Tem;
TRUNCATE TABLE Participa;
TRUNCATE TABLE Porta;
TRUNCATE TABLE Contem;
-- A tabela de log do V6 não deve ser truncada aqui, pois ela é criada DEPOIS.

-- Habilita a verificação de chaves estrangeiras novamente
SET FOREIGN_KEY_CHECKS=1;

-- 1. Inserir Tabelas Independentes (Pais)

-- Inserir Mapas (30 mapas)
INSERT INTO Mapa (ID_Mapa, Nome) VALUES
(1, 'Banco'), (2, 'Fronteira'), (3, 'Casa de Campo'), (4, 'Litoral'), (5, 'Consulado'),
(6, 'Favela'), (7, 'Fortaleza'), (8, 'Hereford (Novo)'), (9, 'Arranha-Céu (Novo)'), (10, 'Canal (Novo)'),
(11, 'Kafe Dostoyevsky'), (12, 'Oregon (Novo)'), (13, 'Outback (Novo)'), (14, 'Parque Temático (Novo)'), (15, 'Arranha-Céu'),
(16, 'Torre'), (17, 'Vila'), (18, 'Iate'), (19, 'Nighthaven Labs'), (20, 'Covil'),
(21, 'Esmeralda'), (22, 'Estádio (Ranqueado)'), (23, 'Casa (Ranqueado)'), (24, 'Avião (Casual)'), (25, 'Base Hereford (Antiga)'),
(26, 'Universidade Bartlett'), (27, 'Fábrica (TDM)'), (28, 'Arena (TDM)'), (29, 'Mapa de Evento 1'), (30, 'Mapa de Evento 2');

-- Inserir Modos de Jogo (30 modos)
INSERT INTO Modo_de_Jogo (ID_Modo_de_Jogo, Nome, Descricao, Tipo) VALUES
(1, 'Bomba', 'Atacantes plantam o desativador, Defensores protegem as bombas.', 'Competitivo'),
(2, 'Proteger Área', 'Atacantes capturam a sala, Defensores impedem a captura.', 'Competitivo'),
(3, 'Refém', 'Atacantes resgatam o refém, Defensores protegem o refém.', 'Casual'),
(4, 'Mata-Mata em Equipe', 'Combate puro para aquecimento.', 'Arcade'),
(5, 'Arcade: Golden Gun', 'Um tiro, uma morte.', 'Arcade'),
(6, 'Arcade: Headshots Only', 'Apenas tiros na cabeça causam dano.', 'Arcade'),
(7, 'Ranqueado', 'Modo competitivo principal.', 'Competitivo'),
(8, 'Standard', 'Modo casual com regras de ranqueado.', 'Casual'),
(9, 'Novo Recruta', 'Apenas para jogadores abaixo do nível 50.', 'Casual'),
(10, 'Evento: Outbreak', 'Modo PvE contra infectados.', 'Evento'),
(11, 'Evento: Showdown', 'Modo 3v3 no Forte da Verdade.', 'Evento'),
(12, 'Evento: Doktor''s Curse', 'Modo esconde-esconde de Halloween.', 'Evento'),
(13, 'Evento: M.U.T.E. Protocol', 'Defensores viajam por câmeras.', 'Evento'),
(14, 'Evento: Rengoku', 'Evento temático do Japão.', 'Evento'),
(15, 'Treinamento: Caça-Terrorista', 'Modo PvE clássico.', 'Treinamento'),
(16, 'Treinamento: Situações', 'Cenários de tutorial.', 'Treinamento'),
(17, 'Personalizado', 'Jogo com regras customizadas.', 'Personalizado'),
(18, 'Arcade: Sugar Fright', 'Evento de Halloween com coleta de doces.', 'Arcade'),
(19, 'Arcade: Atiradores de Elite', 'Apenas rifles de precisão.', 'Arcade'),
(20, 'Evento: Apocalipse', 'Modo com controle de usina.', 'Evento'),
(21, 'Evento: Containment', 'Evento temático de Extraction.', 'Evento'),
(22, 'Arcade: TDM - Sem Habilidade', 'Mata-Mata sem habilidades de operador.', 'Arcade'),
(23, 'Modo de Teste 1', 'Modo em desenvolvimento A.', 'Teste'),
(24, 'Modo de Teste 2', 'Modo em desenvolvimento B.', 'Teste'),
(25, 'Modo de Teste 3', 'Modo em desenvolvimento C.', 'Teste'),
(26, 'Modo de Teste 4', 'Modo em desenvolvimento D.', 'Teste'),
(27, 'Modo de Teste 5', 'Modo em desenvolvimento E.', 'Teste'),
(28, 'Modo de Teste 6', 'Modo em desenvolvimento F.', 'Teste'),
(29, 'Modo de Teste 7', 'Modo em desenvolvimento G.', 'Teste'),
(30, 'Modo de Teste 8', 'Modo em desenvolvimento H.', 'Teste');

-- Inserir Armas (30 armas)
INSERT INTO Arma (ID_Arma, Nome, Tipo, Dano, Cadencia, Capacidade) VALUES
(1, 'R4-C', 'Rifle de Assalto', 39, 860, 30), (2, 'MP5', 'Submetralhadora', 27, 800, 30),
(3, 'M590A1', 'Espingarda', 48, 100, 7), (4, '416-C Carbine', 'Rifle de Assalto', 38, 740, 30),
(5, 'L85A2', 'Rifle de Assalto', 47, 670, 30), (6, 'SMG-11', 'Submetralhadora', 35, 1270, 16),
(7, 'G36C', 'Rifle de Assalto', 38, 780, 30), (8, 'Vector .45 ACP', 'Submetralhadora', 23, 1200, 25),
(9, 'MP7', 'Submetralhadora', 32, 900, 30), (10, 'AK-12', 'Rifle de Assalto', 45, 850, 30),
(11, '9x19VSN', 'Submetralhadora', 34, 750, 30), (12, 'SPEAR .308', 'Rifle de Assalto', 42, 780, 30),
(13, 'P10 RONI', 'Submetralhadora', 26, 960, 19), (14, 'Commando 9', 'Rifle de Assalto', 36, 780, 30),
(15, 'ALDA 5.56', 'Metralhadora Leve', 35, 900, 80), (16, 'TCSG12', 'Espingarda (Slug)', 63, 400, 10),
(17, 'F2', 'Rifle de Assalto', 37, 980, 30), (18, 'MPX', 'Submetralhadora', 26, 830, 30),
(19, 'C8-SFW', 'Rifle de Assalto', 40, 837, 30), (20, 'M762', 'Rifle de Assalto', 45, 730, 30),
(21, 'K1A', 'Submetralhadora', 36, 720, 30), (22, 'Mx4 Storm', 'Submetralhadora', 26, 950, 30),
(23, 'AUG A2', 'Rifle de Assalto', 42, 720, 30), (24, 'P90', 'Submetralhadora', 22, 970, 50),
(25, 'SC3000K', 'Rifle de Assalto', 45, 850, 25), (26, 'ARX200', 'Rifle de Assalto', 47, 700, 20),
(27, 'FMG-9', 'Submetralhadora', 34, 800, 30), (28, 'M4', 'Rifle de Assalto', 44, 750, 30),
(29, 'CSRX 300', 'Rifle de Precisão', 97, 1, 5), (30, 'Bailiff 410', 'Revólver (Espingarda)', 30, 200, 5);

-- Inserir Acessorios (Total: 30)
INSERT INTO Acessorio (ID_Acessorio, Nome, Tipo) VALUES
(1, 'Mira Holográfica', 'Mira'), (2, 'Mira Reflex', 'Mira'), (3, 'Mira ACOG 2.5x', 'Mira'),
(4, 'Silenciador', 'Cano'), (5, 'Freio de Boca', 'Cano'), (6, 'Cabo Vertical', 'Empunhadura'),
(7, 'Mira Red Dot', 'Mira'), (8, 'Mira ACOG 1.5x', 'Mira'), (9, 'Mira ACOG 2.0x', 'Mira'),
(10, 'Mira ACOG 3.0x', 'Mira'), (11, 'Cano Estendido', 'Cano'), (12, 'Compensador', 'Cano'),
(13, 'Corta-Chamas', 'Cano'), (14, 'Cabo Angulado', 'Empunhadura'), (15, 'Laser', 'Sob Cano'),
(16, 'Skin: Ouro', 'Skin'), (17, 'Skin: Platina', 'Skin'), (18, 'Skin: Diamante', 'Skin'),
(19, 'Skin: Black Ice', 'Skin'), (20, 'Amuleto: Chibi Ash', 'Amuleto'), (21, 'Amuleto: Seis de Ouro', 'Amuleto'),
(22, 'Cano Pesado', 'Cano'), (23, 'Mira Magnificada', 'Mira'), (24, 'Empunhadura Horizontal', 'Empunhadura'),
(25, 'Skin: Pro League', 'Skin'), (26, 'Amuleto: Granada', 'Amuleto'), (27, 'Silenciador (Pistola)', 'Cano'),
(28, 'Freio de Boca (Pistola)', 'Cano'), (29, 'Laser (Pistola)', 'Sob Cano'), (30, 'Mira Red Dot (Pistola)', 'Mira');


-- Inserir Operadores (60 operadores)
INSERT INTO Operador (ID_Operador, Nome, Velocidade, Blindagem, Unidade_Especial) VALUES
(1, 'Sledge', 2, 2, 'S.A.S.'), (2, 'Thatcher', 2, 2, 'S.A.S.'), (3, 'Ash', 3, 1, 'FBI SWAT'),
(4, 'Thermite', 2, 2, 'FBI SWAT'), (5, 'Twitch', 2, 2, 'GIGN'), (6, 'Fuze', 1, 3, 'Spetsnaz'),
(7, 'Blitz', 2, 2, 'GSG 9'), (8, 'IQ', 3, 1, 'GSG 9'), (9, 'Buck', 2, 2, 'JTF2'),
(10, 'Hibana', 3, 1, 'S.A.T.'), (11, 'Jackal', 2, 2, 'G.E.O.'), (12, 'Zofia', 2, 2, 'GROM'),
(13, 'Finka', 2, 2, 'CBRN'), (14, 'Maverick', 3, 1, 'GSUTR'), (15, 'Nomad', 2, 2, 'GIGR'),
(16, 'Gridlock', 1, 3, 'SASR'), (17, 'Nokk', 2, 2, 'Jaeger Corps'), (18, 'Amaru', 3, 1, 'APCA'),
(19, 'Kali', 2, 2, 'NIGHTHAVEN'), (20, 'Iana', 2, 2, 'REU'), (21, 'Ace', 2, 2, 'NIGHTHAVEN'),
(22, 'Zero', 2, 2, 'ROS'), (23, 'Flores', 2, 2, 'FES'), (24, 'Osa', 2, 2, 'NIGHTHAVEN'),
(25, 'Sens', 1, 3, 'S.Q.G.'), (26, 'Grim', 3, 1, 'NIGHTHAVEN'), (27, 'Brava', 3, 1, 'Viperstrike'),
(28, 'Ram', 1, 3, 'Redhammer'), (29, 'Striker (2025)', 2, 2, 'Ghosteyes'), (30, 'Vortex (2025)', 2, 2, 'Ghosteyes'),
(31, 'Smoke', 2, 2, 'S.A.S.'), (32, 'Mute', 2, 2, 'S.A.S.'), (33, 'Castle', 2, 2, 'FBI SWAT'),
(34, 'Pulse', 3, 1, 'FBI SWAT'), (35, 'Doc', 1, 3, 'GIGN'), (36, 'Rook', 1, 3, 'GIGN'),
(37, 'Kapkan', 2, 2, 'Spetsnaz'), (38, 'Tachanka', 1, 3, 'Spetsnaz'), (39, 'Jager', 2, 2, 'GSG 9'),
(40, 'Bandit', 3, 1, 'GSG 9'), (41, 'Frost', 2, 2, 'JTF2'), (42, 'Valkyrie', 2, 2, 'Navy SEALs'),
(43, 'Caveira', 3, 1, 'BOPE'), (44, 'Echo', 1, 3, 'S.A.T.'), (45, 'Mira', 1, 3, 'G.E.O.'),
(46, 'Lesion', 2, 2, 'S.D.U.'), (47, 'Ela', 3, 1, 'GROM'), (48, 'Vigil', 3, 1, '707th SMB'),
(49, 'Maestro', 1, 3, 'G.I.S.'), (50, 'Alibi', 3, 1, 'G.I.S.'), (51, 'Clash', 1, 3, 'MPS'),
(52, 'Kaid', 1, 3, 'GIGR'), (53, 'Mozzie', 2, 2, 'SASR'), (54, 'Warden', 1, 3, 'Secret Service'),
(55, 'Goyo', 2, 2, 'FES'), (56, 'Wamai', 2, 2, 'NIGHTHAVEN'), (57, 'Oryx', 2, 2, 'Unaffiliated'),
(58, 'Melusi', 3, 1, 'ITF'), (59, 'Aruni', 2, 2, 'NIGHTHAVEN'), (60, 'Thunderbird', 2, 2, 'Nakoda');

-- Inserir Times (20 Pro-Teams + 10 Genéricos para Partidas)
INSERT INTO Time (ID_Time, Nome) VALUES
-- 20 Times Pro (Rosters 2024-2025)
(1, 'w7m esports'), (2, 'FaZe Clan'), (3, 'G2 Esports'), (4, 'Virtus.pro'), (5, 'Team Liquid'),
(6, 'Spacestation Gaming'), (7, 'DarkZero Esports'), (8, 'M80'), (9, 'Team BDS'), (10, 'Soniqs'),
(11, 'Team Secret'), (12, 'Wolves Esports'), (13, 'SCARZ'), (14, 'FURY'), (15, 'Ninjas in Pyjamas'),
(16, 'Black Dragons'), (17, 'SANDBOX Gaming'), (18, 'Geekay Esports'), (19, 'Dplus KIA'), (20, 'Bleed Esports'),
-- 10 Times Genéricos (para jogadores da comunidade)
(21, 'Alpha Pack'), (22, 'Bravo Six'), (23, 'Delta Force R6'), (24, 'Cyber Athletes'), (25, 'Vortex Gaming'),
(26, 'Omega Squad'), (27, 'Team Phoenix'), (28, 'Quantum Shift'), (29, 'Nova Raiders'), (30, 'Ghost Recon');


-- 2. Inserir Tabelas Dependentes (Filhos)

-- Inserir Dados (30 Comunidade + 100 Pro Players)
-- Colunas: (Dados_PK_INT, Nivel, RankJogador, Winrate, KD, Headshot, Plataforma, Horas_jogadas, Main_role, Preferencia_jogo, fk_Mapa_favorito, fk_Mapa_mais_vitorias, fk_Mapa_mais_derrotas)
INSERT INTO Dados (Dados_PK_INT, Nivel, RankJogador, Winrate, KD, Headshot, Plataforma, Horas_jogadas, Main_role, Preferencia_jogo, fk_Mapa_favorito, fk_Mapa_mais_vitorias, fk_Mapa_mais_derrotas) VALUES
-- 30 Jogadores da Comunidade (Stats Medianos, com Mapas e Roles)
(1, 150, 'Diamante', 1.5, 1.2, 0.45, 'PC', 500, 'Flex', 'Competitivo', 1, 4, 6),
(2, 89, 'Ouro II', 1.0, 0.9, 0.30, 'PC', 150, 'Entry', 'Casual', 2, 5, 7),
(3, 210, 'Platina I', 1.3, 1.1, 0.55, 'PC', 700, 'Suporte', 'Competitivo', 3, 11, 8),
(4, 120, 'Ouro III', 0.9, 0.8, 0.25, 'Console', 300, 'Flex', 'Casual', 4, 12, 9),
(5, 300, 'Diamante', 1.6, 1.4, 0.60, 'PC', 1000, 'Entry', 'Competitivo', 5, 13, 10),
(6, 50, 'Cobre V', 0.6, 0.5, 0.15, 'PC', 50, 'Entry', 'Casual', 6, 1, 11),
(7, 170, 'Prata I', 1.0, 1.0, 0.33, 'Console', 400, 'Suporte', 'Casual', 7, 2, 12),
(8, 220, 'Platina II', 1.2, 1.1, 0.42, 'PC', 650, 'Flex', 'Competitivo', 8, 3, 13),
(9, 130, 'Ouro I', 1.1, 1.0, 0.38, 'PC', 350, 'Entry', 'Competitivo', 9, 4, 14),
(10, 400, 'Campeão', 2.0, 1.8, 0.75, 'PC', 1500, 'Entry', 'Competitivo', 10, 5, 15),
(11, 110, 'Prata III', 0.9, 0.9, 0.28, 'Console', 250, 'Flex', 'Casual', 11, 6, 1),
(12, 90, 'Bronze II', 0.8, 0.7, 0.22, 'PC', 100, 'Suporte', 'Casual', 12, 7, 2),
(13, 250, 'Platina III', 1.2, 1.1, 0.40, 'PC', 800, 'Flex', 'Competitivo', 13, 8, 3),
(14, 140, 'Ouro II', 1.0, 1.0, 0.35, 'PC', 300, 'Entry', 'Competitivo', 14, 9, 4),
(15, 70, 'Prata V', 0.7, 0.8, 0.20, 'Console', 90, 'Suporte', 'Casual', 15, 10, 5),
(16, 180, 'Ouro I', 1.1, 1.1, 0.39, 'PC', 550, 'Flex', 'Competitivo', 16, 11, 6),
(17, 190, 'Platina II', 1.3, 1.2, 0.48, 'PC', 600, 'Entry', 'Competitivo', 17, 12, 7),
(18, 60, 'Bronze I', 0.8, 0.8, 0.26, 'Console', 70, 'Flex', 'Casual', 18, 13, 8),
(19, 230, 'Diamante', 1.5, 1.3, 0.52, 'PC', 750, 'Suporte', 'Competitivo', 19, 14, 9),
(20, 270, 'Platina I', 1.4, 1.2, 0.50, 'PC', 900, 'Flex', 'Competitivo', 20, 15, 10),
(21, 10, 'Cobre V', 0.5, 0.5, 0.10, 'PC', 10, 'Entry', 'Casual', 21, 16, 11),
(22, 160, 'Ouro III', 0.9, 1.0, 0.31, 'Console', 450, 'Suporte', 'Casual', 22, 17, 12),
(23, 80, 'Prata II', 0.9, 0.9, 0.29, 'PC', 120, 'Flex', 'Casual', 23, 18, 13),
(24, 310, 'Campeão', 1.8, 1.6, 0.68, 'PC', 1200, 'Entry', 'Competitivo', 24, 19, 14),
(25, 100, 'Prata IV', 0.8, 0.8, 0.27, 'Console', 200, 'Suporte', 'Casual', 25, 20, 15),
(26, 200, 'Platina III', 1.2, 1.1, 0.41, 'PC', 600, 'Flex', 'Competitivo', 26, 21, 16),
(27, 125, 'Ouro II', 1.0, 1.0, 0.36, 'PC', 300, 'Entry', 'Competitivo', 27, 22, 17),
(28, 240, 'Platina I', 1.3, 1.2, 0.49, 'PC', 800, 'Suporte', 'Competitivo', 28, 23, 18),
(29, 350, 'Campeão', 1.9, 1.7, 0.70, 'PC', 1400, 'Entry', 'Competitivo', 29, 24, 19),
(30, 5, 'Cobre V', 0.4, 0.4, 0.09, 'Console', 5, 'Flex', 'Casual', 30, 25, 20),

-- 100 Pro Players (Stats Elevados, com Mapas e Roles)
-- Time 1: w7m esports (Jogadores 31-35)
(31, 420, 'Campeão', 1.7, 1.5, 0.62, 'PC', 3100, 'Entry', 'Competitivo', 5, 12, 3),
(32, 410, 'Campeão', 1.8, 1.6, 0.65, 'PC', 3000, 'Entry', 'Competitivo', 1, 11, 4),
(33, 390, 'Campeão', 1.6, 1.4, 0.58, 'PC', 2800, 'Flex', 'Competitivo', 11, 1, 5),
(34, 395, 'Campeão', 1.6, 1.4, 0.59, 'PC', 2900, 'Suporte', 'Competitivo', 4, 5, 1),
(35, 400, 'Campeão', 1.7, 1.5, 0.60, 'PC', 2950, 'Flex', 'Competitivo', 12, 3, 2),
-- Time 2: FaZe Clan (Jogadores 36-40)
(36, 430, 'Campeão', 1.7, 1.6, 0.63, 'PC', 3200, 'Flex', 'Competitivo', 12, 11, 1),
(37, 440, 'Campeão', 1.8, 1.7, 0.68, 'PC', 3300, 'Entry', 'Competitivo', 1, 5, 12),
(38, 410, 'Campeão', 1.6, 1.5, 0.60, 'PC', 3000, 'Entry', 'Competitivo', 5, 4, 3),
(39, 400, 'Campeão', 1.5, 1.4, 0.55, 'PC', 2900, 'Suporte', 'Competitivo', 3, 1, 11),
(40, 415, 'Campeão', 1.6, 1.5, 0.61, 'PC', 3050, 'Flex', 'Competitivo', 11, 12, 4),
-- Time 3: G2 Esports (Jogadores 41-45)
(41, 400, 'Campeão', 1.5, 1.4, 0.58, 'PC', 3000, 'Flex', 'Competitivo', 2, 12, 5),
(42, 420, 'Campeão', 1.7, 1.5, 0.62, 'PC', 3100, 'Entry', 'Competitivo', 1, 3, 11),
(43, 430, 'Campeão', 1.7, 1.6, 0.64, 'PC', 3200, 'Entry', 'Competitivo', 12, 2, 4),
(44, 410, 'Campeão', 1.6, 1.5, 0.60, 'PC', 3050, 'Flex', 'Competitivo', 5, 1, 2),
(45, 390, 'Campeão', 1.5, 1.4, 0.57, 'PC', 2900, 'Suporte', 'Competitivo', 3, 5, 1),
-- Time 4: Virtus.pro (Jogadores 46-50)
(46, 450, 'Campeão', 1.8, 1.7, 0.70, 'PC', 3500, 'Entry', 'Competitivo', 11, 1, 3),
(47, 440, 'Campeão', 1.7, 1.6, 0.65, 'PC', 3400, 'Suporte', 'Competitivo', 1, 12, 5),
(48, 430, 'Campeão', 1.7, 1.5, 0.63, 'PC', 3300, 'Flex', 'Competitivo', 5, 3, 2),
(49, 435, 'Campeão', 1.7, 1.6, 0.64, 'PC', 3350, 'Entry', 'Competitivo', 3, 11, 12),
(50, 420, 'Campeão', 1.6, 1.5, 0.61, 'PC', 3200, 'Flex', 'Competitivo', 12, 5, 1),
-- Time 5: Team Liquid (Jogadores 51-55)
(51, 440, 'Campeão', 1.8, 1.7, 0.69, 'PC', 3400, 'Suporte', 'Competitivo', 4, 1, 11),
(52, 460, 'Campeão', 1.9, 1.8, 0.72, 'PC', 3600, 'Entry', 'Competitivo', 1, 12, 4),
(53, 410, 'Campeão', 1.6, 1.5, 0.60, 'PC', 3100, 'Entry', 'Competitivo', 12, 4, 5),
(54, 420, 'Campeão', 1.7, 1.5, 0.62, 'PC', 3200, 'Flex', 'Competitivo', 5, 11, 1),
(55, 430, 'Campeão', 1.7, 1.6, 0.64, 'PC', 3300, 'Flex', 'Competitivo', 11, 5, 12),
-- Time 6: Spacestation Gaming (Jogadores 56-60)
(56, 410, 'Campeão', 1.6, 1.5, 0.61, 'PC', 3100, 'Entry', 'Competitivo', 12, 1, 3),
(57, 400, 'Campeão', 1.5, 1.4, 0.58, 'PC', 3000, 'Flex', 'Competitivo', 1, 5, 4),
(58, 420, 'Campeão', 1.7, 1.5, 0.63, 'PC', 3200, 'Suporte', 'Competitivo', 3, 12, 5),
(59, 390, 'Diamante', 1.5, 1.4, 0.57, 'PC', 2900, 'Flex', 'Competitivo', 5, 4, 1),
(60, 430, 'Campeão', 1.7, 1.6, 0.65, 'PC', 3300, 'Entry', 'Competitivo', 4, 3, 12),
-- Time 7: DarkZero Esports (Jogadores 61-65)
(61, 400, 'Campeão', 1.6, 1.4, 0.59, 'PC', 3000, 'Flex', 'Competitivo', 5, 11, 2),
(62, 390, 'Diamante', 1.5, 1.4, 0.56, 'PC', 2900, 'Suporte', 'Competitivo', 11, 1, 3),
(63, 410, 'Campeão', 1.6, 1.5, 0.61, 'PC', 3100, 'Entry', 'Competitivo', 1, 5, 11),
(64, 440, 'Campeão', 1.8, 1.7, 0.68, 'PC', 3400, 'Entry', 'Competitivo', 2, 3, 1),
(65, 420, 'Campeão', 1.7, 1.5, 0.62, 'PC', 3200, 'Flex', 'Competitivo', 3, 2, 5),
-- Time 8: M80 (Jogadores 66-70)
(66, 450, 'Campeão', 1.9, 1.8, 0.71, 'PC', 3500, 'Entry', 'Competitivo', 12, 1, 5),
(67, 410, 'Campeão', 1.6, 1.5, 0.60, 'PC', 3100, 'Flex', 'Competitivo', 1, 11, 3),
(68, 400, 'Campeão', 1.6, 1.4, 0.58, 'PC', 3000, 'Suporte', 'Competitivo', 5, 12, 1),
(69, 420, 'Campeão', 1.7, 1.5, 0.62, 'PC', 3200, 'Flex', 'Competitivo', 11, 3, 12),
(70, 430, 'Campeão', 1.7, 1.6, 0.64, 'PC', 3300, 'Entry', 'Competitivo', 3, 5, 11),
-- Time 9: Team BDS (Jogadores 71-75)
(71, 480, 'Campeão', 2.0, 1.9, 0.75, 'PC', 4000, 'Entry', 'Competitivo', 1, 12, 4),
(72, 430, 'Campeão', 1.7, 1.6, 0.63, 'PC', 3300, 'Flex', 'Competitivo', 12, 5, 2),
(73, 420, 'Campeão', 1.6, 1.5, 0.61, 'PC', 3200, 'Suporte', 'Competitivo', 4, 1, 3),
(74, 440, 'Campeão', 1.8, 1.7, 0.67, 'PC', 3400, 'Suporte', 'Competitivo', 5, 12, 1),
(75, 410, 'Campeão', 1.6, 1.5, 0.60, 'PC', 3100, 'Entry', 'Competitivo', 2, 4, 5),
-- Time 10: Soniqs (Jogadores 76-80)
(76, 420, 'Campeão', 1.7, 1.5, 0.62, 'PC', 3200, 'Entry', 'Competitivo', 3, 11, 1),
(77, 410, 'Campeão', 1.6, 1.5, 0.60, 'PC', 3100, 'Flex', 'Competitivo', 11, 1, 5),
(78, 430, 'Campeão', 1.7, 1.6, 0.64, 'PC', 3300, 'Suporte', 'Competitivo', 1, 5, 12),
(79, 440, 'Campeão', 1.8, 1.7, 0.68, 'PC', 3400, 'Entry', 'Competitivo', 5, 12, 3),
(80, 400, 'Campeão', 1.6, 1.4, 0.58, 'PC', 3000, 'Flex', 'Competitivo', 12, 3, 11),
-- Time 11: Team Secret (Jogadores 81-85)
(81, 380, 'Diamante', 1.5, 1.3, 0.55, 'PC', 2800, 'Flex', 'Competitivo', 12, 5, 1),
(82, 390, 'Campeão', 1.5, 1.4, 0.57, 'PC', 2900, 'Entry', 'Competitivo', 5, 1, 4),
(83, 370, 'Diamante', 1.4, 1.3, 0.54, 'PC', 2700, 'Suporte', 'Competitivo', 1, 12, 3),
(84, 400, 'Campeão', 1.6, 1.4, 0.59, 'PC', 3000, 'Entry', 'Competitivo', 4, 3, 5),
(85, 385, 'Diamante', 1.5, 1.4, 0.56, 'PC', 2850, 'Flex', 'Competitivo', 3, 4, 12),
-- Time 12: Wolves Esports (Jogadores 86-90)
(86, 400, 'Campeão', 1.6, 1.4, 0.58, 'PC', 3000, 'Entry', 'Competitivo', 1, 11, 5),
(87, 410, 'Campeão', 1.6, 1.5, 0.60, 'PC', 3100, 'Flex', 'Competitivo', 11, 5, 2),
(88, 390, 'Diamante', 1.5, 1.4, 0.57, 'PC', 2900, 'Suporte', 'Competitivo', 5, 1, 12),
(89, 420, 'Campeão', 1.7, 1.5, 0.62, 'PC', 3200, 'Entry', 'Competitivo', 2, 12, 1),
(90, 405, 'Campeão', 1.6, 1.5, 0.59, 'PC', 3050, 'Flex', 'Competitivo', 12, 2, 11),
-- Time 13: SCARZ (Jogadores 91-95)
(91, 410, 'Campeão', 1.6, 1.5, 0.61, 'PC', 3100, 'Entry', 'Competitivo', 3, 1, 12),
(92, 400, 'Campeão', 1.6, 1.4, 0.58, 'PC', 3000, 'Flex', 'Competitivo', 1, 5, 4),
(93, 390, 'Diamante', 1.5, 1.4, 0.56, 'PC', 2900, 'Suporte', 'Competitivo', 12, 3, 1),
(94, 420, 'Campeão', 1.7, 1.5, 0.63, 'PC', 3200, 'Entry', 'Competitivo', 4, 12, 5),
(95, 405, 'Campeão', 1.6, 1.5, 0.60, 'PC', 3050, 'Flex', 'Competitivo', 5, 4, 3),
-- Time 14: FURY (Jogadores 96-100)
(96, 400, 'Campeão', 1.6, 1.4, 0.59, 'PC', 3000, 'Flex', 'Competitivo', 11, 1, 5),
(97, 390, 'Diamante', 1.5, 1.4, 0.57, 'PC', 2900, 'Entry', 'Competitivo', 1, 5, 2),
(98, 410, 'Campeão', 1.6, 1.5, 0.60, 'PC', 3100, 'Suporte', 'Competitivo', 5, 11, 1),
(99, 420, 'Campeão', 1.7, 1.5, 0.62, 'PC', 3200, 'Entry', 'Competitivo', 2, 1, 11),
(100, 405, 'Campeão', 1.6, 1.5, 0.59, 'PC', 3050, 'Flex', 'Competitivo', 1, 2, 5),
-- Time 15: Ninjas in Pyjamas (Jogadores 101-105)
(101, 430, 'Campeão', 1.7, 1.6, 0.65, 'PC', 3300, 'Entry', 'Competitivo', 12, 1, 3),
(102, 420, 'Campeão', 1.7, 1.5, 0.63, 'PC', 3200, 'Flex', 'Competitivo', 1, 3, 4),
(103, 440, 'Campeão', 1.8, 1.7, 0.68, 'PC', 3400, 'Entry', 'Competitivo', 3, 12, 1),
(104, 410, 'Campeão', 1.6, 1.5, 0.60, 'PC', 3100, 'Suporte', 'Competitivo', 4, 1, 12),
(105, 415, 'Campeão', 1.6, 1.5, 0.61, 'PC', 3150, 'Flex', 'Competitivo', 1, 4, 3),
-- Time 16: Black Dragons (Jogadores 106-110)
(106, 400, 'Campeão', 1.6, 1.4, 0.58, 'PC', 3000, 'Entry', 'Competitivo', 5, 12, 1),
(107, 390, 'Diamante', 1.5, 1.4, 0.56, 'PC', 2900, 'Flex', 'Competitivo', 12, 1, 2),
(108, 410, 'Campeão', 1.6, 1.5, 0.60, 'PC', 3100, 'Suporte', 'Competitivo', 1, 5, 12),
(109, 420, 'Campeão', 1.7, 1.5, 0.62, 'PC', 3200, 'Entry', 'Competitivo', 2, 12, 5),
(110, 405, 'Campeão', 1.6, 1.5, 0.59, 'PC', 3050, 'Flex', 'Competitivo', 12, 2, 1),
-- Time 17: SANDBOX Gaming (Jogadores 111-115)
(111, 410, 'Campeão', 1.6, 1.5, 0.61, 'PC', 3100, 'Entry', 'Competitivo', 11, 1, 4),
(112, 400, 'Campeão', 1.6, 1.4, 0.59, 'PC', 3000, 'Flex', 'Competitivo', 1, 4, 3),
(113, 390, 'Diamante', 1.5, 1.4, 0.57, 'PC', 2900, 'Suporte', 'Competitivo', 4, 11, 1),
(114, 420, 'Campeão', 1.7, 1.5, 0.63, 'PC', 3200, 'Entry', 'Competitivo', 3, 1, 11),
(115, 405, 'Campeão', 1.6, 1.5, 0.60, 'PC', 3050, 'Flex', 'Competitivo', 1, 3, 4),
-- Time 18: Geekay Esports (Jogadores 116-120)
(116, 400, 'Campeão', 1.6, 1.4, 0.58, 'PC', 3000, 'Flex', 'Competitivo', 5, 12, 1),
(117, 390, 'Diamante', 1.5, 1.4, 0.56, 'PC', 2900, 'Entry', 'Competitivo', 12, 1, 3),
(118, 410, 'Campeão', 1.6, 1.5, 0.60, 'PC', 3100, 'Suporte', 'Competitivo', 1, 5, 12),
(119, 420, 'Campeão', 1.7, 1.5, 0.62, 'PC', 3200, 'Entry', 'Competitivo', 3, 12, 5),
(120, 405, 'Campeão', 1.6, 1.5, 0.59, 'PC', 3050, 'Flex', 'Competitivo', 12, 3, 1),
-- Time 19: Dplus KIA (Jogadores 121-125)
(121, 410, 'Campeão', 1.6, 1.5, 0.61, 'PC', 3100, 'Entry', 'Competitivo', 4, 1, 11),
(122, 400, 'Campeão', 1.6, 1.4, 0.59, 'PC', 3000, 'Flex', 'Competitivo', 1, 11, 5),
(123, 390, 'Diamante', 1.5, 1.4, 0.57, 'PC', 2900, 'Suporte', 'Competitivo', 11, 4, 1),
(124, 420, 'Campeão', 1.7, 1.5, 0.63, 'PC', 3200, 'Entry', 'Competitivo', 5, 1, 4),
(125, 405, 'Campeão', 1.6, 1.5, 0.60, 'PC', 3050, 'Flex', 'Competitivo', 1, 5, 11),
-- Time 20: Bleed Esports (Jogadores 126-130)
(126, 400, 'Campeão', 1.6, 1.4, 0.58, 'PC', 3000, 'Flex', 'Competitivo', 2, 12, 1),
(127, 390, 'Diamante', 1.5, 1.4, 0.56, 'PC', 2900, 'Entry', 'Competitivo', 12, 1, 3),
(128, 410, 'Campeão', 1.6, 1.5, 0.60, 'PC', 3100, 'Suporte', 'Competitivo', 1, 2, 12),
(129, 420, 'Campeão', 1.7, 1.5, 0.62, 'PC', 3200, 'Entry', 'Competitivo', 3, 12, 2),
(130, 405, 'Campeão', 1.6, 1.5, 0.59, 'PC', 3050, 'Flex', 'Competitivo', 12, 3, 1);


-- Inserir Jogadores (30 Comunidade + 100 Pro Players)
INSERT INTO Jogador (ID_Jogador, Nickname, fk_Dados_Dados_PK_INT) VALUES
-- 30 Jogadores da Comunidade
(1, 'AceKiller', 1), (2, 'BlitzMain', 2), (3, 'CaveiraHunter', 3), (4, 'DocSavior', 4),
(5, 'EchoIntel', 5), (6, 'FuzeHostage', 6), (7, 'GlazSniper', 7), (8, 'HibanaBreech', 8),
(9, 'IanaGemini', 9), (10, 'JagerADS', 10), (11, 'KapkanTrapper', 11), (12, 'LionScanner', 12),
(13, 'MiraWindow', 13), (14, 'NokkStealth', 14), (15, 'OsaShield', 15), (16, 'PulseSensor', 16),
(17, 'Quantum', 17), (18, 'RookArmor', 18), (19, 'SledgeHammer', 19), (20, 'ThatcherEMP', 20),
(21, 'UbiFan', 21), (22, 'VigilGhost', 22), (23, 'WardenGlasses', 23), (24, 'X-Factor', 24),
(25, 'YingFlash', 25), (26, 'ZeroCam', 26), (27, 'ShadowR6', 27), (28, 'ViperStrike', 28),
(29, 'R6Pro', 29), (30, 'Newbie123', 30),

-- 100 Pro Players (2024/2025 Rosters)
-- Time 1: w7m esports
(31, 'HerdsZ', 31), (32, 'Kheyze', 32), (33, 'Jv92', 33), (34, 'FelipoX', 34), (35, 'nade', 35),
-- Time 2: FaZe Clan
(36, 'KDS', 36), (37, 'Vitaking', 37), (38, 'Handyy', 38), (39, 'cameram4n', 39), (40, 'rafaL', 40),
-- Time 3: G2 Esports
(41, 'Virtue', 41), (42, 'Doki', 42), (43, 'Alem4o', 43), (44, 'Benjamaster', 44), (45, 'UUNO', 45),
-- Time 4: Virtus.pro
(46, 'JoyStiCK', 46), (47, 'ShepparD', 47), (48, 'Dan', 48), (49, 'p4sh4', 49), (50, 'Always', 50),
-- Time 5: Team Liquid
(51, 'Lagonis', 51), (52, 'Paluh', 52), (53, 'Nesk', 53), (54, 'resetz', 54), (55, 'Volpz', 55),
-- Time 6: Spacestation Gaming
(56, 'Fultz', 56), (57, 'Hotancold', 57), (58, 'Forrest', 58), (59, 'J9O', 59), (60, 'Ashn', 60),
-- Time 7: DarkZero Esports
(61, 'Nafe', 61), (62, 'Gaveni', 62), (63, 'Panbazou', 63), (64, 'njr', 64), (65, 'Beaulo', 65),
-- Time 8: M80
(66, 'Spoit', 66), (67, 'Kyno', 67), (68, 'Yoggah', 68), (69, 'Dias', 69), (70, 'iconic', 70),
-- Time 9: Team BDS
(71, 'Shaiiko', 71), (72, 'Renshiro', 72), (73, 'Elemzje', 73), (74, 'BriD', 74), (75, 'LikEfac', 75),
-- Time 10: Soniqs
(76, 'Gryxr', 76), (77, 'Rexen', 77), (78, 'Geo', 78), (79, 'CTZN', 79), (80, 'Ambi', 80),
-- Time 11: Team Secret
(81, 'Gruby', 81), (82, 'ASTRO', 82), (83, 'Twiizt', 83), (84, 'Jume', 84), (85, 'Saether', 85),
-- Time 12: Wolves Esports
(86, 'P4', 86), (87, 'BiBooAF', 87), (88, 'Shiinka', 88), (89, 'Mowwwgli', 89), (90, 'DEADSHT', 90),
-- Time 13: SCARZ
(91, 'Rec', 91), (92, 'Pyon', 92), (93, 'Wqs', 93), (94, 'Taiyou', 94), (95, 'Chihro', 95),
-- Time 14: FURY
(96, 'Harp3r', 96), (97, 'Hoven', 97), (98, 'Jsh', 98), (99, 'Pikan', 99), (100, 'BGMan', 100),
-- Time 15: Ninjas in Pyjamas
(101, 'Muzi', 101), (102, 'Pino', 102), (103, 'Psycho', 103), (104, 'kondz', 104), (105, 'Fntzy', 105),
-- Time 16: Black Dragons
(106, 'ion', 106), (107, 'Bassetto', 107), (108, 'Patoxy', 108), (109, 'L0BIN', 109), (110, 'Peres', 110),
-- Time 17: SANDBOX Gaming
(111, 'GoodBoy', 111), (112, 'SyAIL', 112), (113, 'EnvyTaylor', 113), (114, 'Aru', 114), (115, 'Static', 115),
-- Time 18: Geekay Esports
(116, 'Tr1ixd', 116), (117, 'SRSLY', 117), (118, 'X.v_T', 118), (119, 'BlaZ', 119), (120, 'Leadr', 120),
-- Time 19: Dplus KIA
(121, 'coted', 121), (122, 'Woogiman', 122), (123, 'Yass', 123), (124, 'Harper', 124), (125, 'Soldier', 125),
-- Time 20: Bleed Esports
(126, 'Reeps96', 126), (127, 'Terdsta', 127), (128, 'Hxsti', 128), (129, 'Pxlp', 129), (130, 'Asphy', 130);

-- Inserir Ataque (30 operadores)
INSERT INTO Ataque (fk_Operador_ID_Operador, Habilidade_Unica_Ataque) VALUES
(1, 'Marreta Tática'), (2, 'Granada PEM'), (3, 'Projétil de Infiltração'), (4, 'Carga Exotérmica'), (5, 'Drone de Choque'),
(6, 'Cargas de Fragmentação'), (7, 'Escudo Tático'), (8, 'Detector de Eletrônicos'), (9, 'Chave-Mestra'), (10, 'X-KAIROS'),
(11, 'Eyenox'), (12, 'KS79 Lifeline'), (13, 'Surto de Adrenalina'), (14, 'Maçarico'), (15, 'Lançador "Airjab"'),
(16, 'Trax Stingers'), (17, 'Redutor de Presença HEL'), (18, 'Gancho Garra'), (19, 'Rifle CSRX 300'), (20, 'Replicador Gemini'),
(21, 'S.E.L.M.A.'), (22, 'Câmera Argus'), (23, 'Drone RCE-Ratero'), (24, 'Escudo Talon'), (25, 'Projetor R.O.U.'),
(26, 'Lançador Kawan'), (27, 'Drone Kludge'), (28, 'BU-GI Auto-Breacher'), (29, 'Pulso Sônico'), (30, 'Distorção Temporal');

-- Inserir Defesa (30 operadores)
INSERT INTO Defesa (fk_Operador_ID_Operador, Habilidade_Unica_Defesa) VALUES
(31, 'Granada de Gás Remota'), (32, 'Bloqueador de Sinal'), (33, 'Painel de Blindagem'), (34, 'Sensor Cardíaco'), (35, 'Pistola Estimulante'),
(36, 'Bolsa de Blindagem'), (37, 'Dispositivo de Entrada'), (38, 'Lançador Incendiário'), (39, 'Sistema de Defesa Ativa'), (40, 'Fio de Choque'),
(41, 'Capacho "Welcome"'), (42, 'Câmera "Black Eye"'), (43, 'Passo Silencioso'), (44, 'Drone Yokai'), (45, 'Espelho Negro'),
(46, 'Mina "Gu"'), (47, 'Mina Grzmot'), (48, 'ERC-7'), (49, 'Olho Maligno'), (50, 'Prisma'),
(51, 'Escudo CCE'), (52, 'Eletrogarra RTILA'), (53, 'Lançador de Pestes'), (54, 'Óculos Glance'), (55, 'Escudo Volcán'),
(56, 'Sistema Mag-NET'), (57, 'Arranque'), (58, 'Defesa Sônica Banshee'), (59, 'Porta Surya'), (60, 'Estação Kona');

-- Inserir Partidas (30 partidas, usando Times 1-30)
INSERT INTO Partida (ID_Partida, fk_Mapa_ID_Mapa, fk_Modo_de_Jogo_ID_Modo_de_Jogo, Resultado, DataHora) VALUES
(1, 1, 1, 'Vitória Time 1', '2025-10-01 20:00:00'), (2, 2, 2, 'Vitória Time 3', '2025-10-01 20:30:00'),
(3, 3, 3, 'Vitória Time 2', '2025-10-01 21:00:00'), (4, 4, 1, 'Vitória Time 4', '2025-10-02 18:00:00'),
(5, 5, 2, 'Vitória Time 5', '2025-10-02 18:30:00'), (6, 6, 3, 'Vitória Time 1', '2025-10-02 19:00:00'),
(7, 7, 1, 'Vitória Time 6', '2025-10-03 22:00:00'), (8, 8, 2, 'Vitória Time 7', '2025-10-03 22:30:00'),
(9, 9, 3, 'Vitória Time 8', '2025-10-04 15:00:00'), (10, 10, 1, 'Vitória Time 9', '2025-10-04 15:30:00'),
(11, 11, 2, 'Vitória Time 10', '2025-10-05 20:00:00'), (12, 12, 3, 'Vitória Time 1', '2025-10-05 20:30:00'),
(13, 13, 1, 'Vitória Time 3', '2025-10-06 21:00:00'), (14, 14, 2, 'Vitória Time 5', '2025-10-06 21:30:00'),
(15, 15, 3, 'Vitória Time 7', '2025-10-07 19:00:00'), (16, 16, 1, 'Vitória Time 2', '2025-10-07 19:30:00'),
(17, 17, 2, 'Vitória Time 4', '2025-10-08 20:00:00'), (18, 18, 3, 'Vitória Time 6', '2025-10-08 20:30:00'),
(19, 19, 1, 'Vitória Time 8', '2025-10-09 17:00:00'), (20, 20, 2, 'Vitória Time 10', '2025-10-09 17:30:00'),
(21, 21, 3, 'Vitória Time 1', '2025-10-10 23:00:00'), (22, 22, 1, 'Vitória Time 3', '2025-10-10 23:30:00'),
(23, 23, 2, 'Vitória Time 5', '2025-10-11 16:00:00'), (24, 24, 3, 'Vitória Time 7', '2025-10-11 16:30:00'),
(25, 25, 1, 'Vitória Time 9', '2025-10-12 18:00:00'), (26, 26, 2, 'Vitória Time 2', '2025-10-12 18:30:00'),
(27, 27, 3, 'Vitória Time 4', '2025-10-13 20:00:00'), (28, 28, 1, 'Vitória Time 6', '2025-10-13 20:30:00'),
(29, 29, 2, 'Vitória Time 8', '2025-10-14 21:00:00'), (30, 30, 3, 'Vitória Time 10', '2025-10-14 21:30:00');

-- Inserir Honras (Total: 30)
INSERT INTO Honra (ID_Honra, Tipo, fk_Jogador_Destinatario, fk_Jogador_Remetente, DataHora) VALUES
(1, 'Respeitoso', 1, 2, NOW()), (2, 'Prestativo', 2, 1, NOW()), (3, 'Liderança', 10, 5, NOW()),
(4, 'Respeitoso', 3, 7, NOW()), (5, 'Prestativo', 15, 20, NOW()), (6, 'Respeitoso', 4, 8, NOW()),
(7, 'Prestativo', 5, 9, NOW()), (8, 'Liderança', 6, 10, NOW()), (9, 'Respeitoso', 7, 11, NOW()),
(10, 'Prestativo', 8, 12, NOW()), (11, 'Respeitoso', 9, 13, NOW()), (12, 'Prestativo', 10, 14, NOW()),
(13, 'Liderança', 11, 15, NOW()), (14, 'Respeitoso', 12, 16, NOW()), (15, 'Prestativo', 13, 17, NOW()),
(16, 'Respeitoso', 14, 18, NOW()), (17, 'Prestativo', 15, 19, NOW()), (18, 'Liderança', 16, 20, NOW()),
(19, 'Respeitoso', 17, 21, NOW()), (20, 'Prestativo', 18, 22, NOW()), (21, 'Respeitoso', 19, 23, NOW()),
(22, 'Prestativo', 20, 24, NOW()), (23, 'Liderança', 21, 25, NOW()), (24, 'Respeitoso', 22, 26, NOW()),
(25, 'Prestativo', 23, 27, NOW()), (26, 'Respeitoso', 24, 28, NOW()), (27, 'Prestativo', 25, 29, NOW()),
(28, 'Liderança', 26, 30, NOW()), (29, 'Respeitoso', 27, 1, NOW()), (30, 'Prestativo', 28, 2, NOW());


-- 3. Inserir Tabelas de Junção (Muitos-para-Muitos)

-- Inserir Porta (Operador <-> Arma) (Total: 60)
INSERT INTO Porta (fk_Operador_ID_Operador, fk_Arma_ID_Arma) VALUES
(1, 5), (1, 6), (3, 1), (3, 7), (5, 17), (6, 10), (9, 19), (10, 26), (11, 19), (12, 20), (13, 12), (14, 28), (15, 10),
(16, 27), (17, 27), (18, 14), (19, 29), (20, 7), (21, 10), (22, 25), (23, 26), (24, 12), (25, 12), (26, 14), (27, 17), (28, 7), (29, 1), (30, 25),
(31, 2), (31, 3), (32, 2), (32, 3), (33, 3), (34, 3), (35, 2), (35, 3), (36, 2), (36, 3), (37, 11), (37, 3), (38, 11),
(39, 4), (40, 9), (41, 3), (42, 18), (43, 3), (44, 2), (45, 8), (46, 27), (47, 8), (48, 21), (49, 15), (50, 22), (51, 6),
(52, 16), (53, 14), (54, 18), (55, 16), (56, 9), (57, 16), (58, 9), (59, 13), (60, 12);

-- Inserir Contem (Arma <-> Acessorio) (Total: 30)
INSERT INTO Contem (fk_Arma_ID_Arma, fk_Acessorio_ID_Acessorio) VALUES
(1, 1), (1, 5), (1, 6), (2, 2), (2, 4), (4, 1), (4, 5), (4, 6), (5, 3), (5, 5), (5, 6),
(1, 7), (2, 7), (3, 15), (4, 14), (5, 15), (6, 15), (7, 1), (8, 2), (9, 1), (10, 3),
(11, 2), (12, 14), (13, 15), (14, 6), (15, 3), (17, 1), (17, 14), (18, 2), (19, 11), (20, 12);


-- Inserir Tem (Ligação Jogador-Time) (Total: 100)
-- APENAS PRO PLAYERS SÃO VINCULADOS A TIMES
INSERT INTO Tem (fk_Time_ID_Time, fk_Jogador_ID_Jogador) VALUES
-- Time 1: w7m esports
(1, 31), (1, 32), (1, 33), (1, 34), (1, 35),
-- Time 2: FaZe Clan
(2, 36), (2, 37), (2, 38), (2, 39), (2, 40),
-- Time 3: G2 Esports
(3, 41), (3, 42), (3, 43), (3, 44), (3, 45),
-- Time 4: Virtus.pro
(4, 46), (4, 47), (4, 48), (4, 49), (4, 50),
-- Time 5: Team Liquid
(5, 51), (5, 52), (5, 53), (5, 54), (5, 55),
-- Time 6: Spacestation Gaming
(6, 56), (6, 57), (6, 58), (6, 59), (6, 60),
-- Time 7: DarkZero Esports
(7, 61), (7, 62), (7, 63), (7, 64), (7, 65),
-- Time 8: M80
(8, 66), (8, 67), (8, 68), (8, 69), (8, 70),
-- Time 9: Team BDS
(9, 71), (9, 72), (9, 73), (9, 74), (9, 75),
-- Time 10: Soniqs
(10, 76), (10, 77), (10, 78), (10, 79), (10, 80),
-- Time 11: Team Secret
(11, 81), (11, 82), (11, 83), (11, 84), (11, 85),
-- Time 12: Wolves Esports
(12, 86), (12, 87), (12, 88), (12, 89), (12, 90),
-- Time 13: SCARZ
(13, 91), (13, 92), (13, 93), (13, 94), (13, 95),
-- Time 14: FURY
(14, 96), (14, 97), (14, 98), (14, 99), (14, 100),
-- Time 15: Ninjas in Pyjamas
(15, 101), (15, 102), (15, 103), (15, 104), (15, 105),
-- Time 16: Black Dragons
(16, 106), (16, 107), (16, 108), (16, 109), (16, 110),
-- Time 17: SANDBOX Gaming
(17, 111), (17, 112), (17, 113), (17, 114), (17, 115),
-- Time 18: Geekay Esports
(18, 116), (18, 117), (18, 118), (18, 119), (18, 120),
-- Time 19: Dplus KIA
(19, 121), (19, 122), (19, 123), (19, 124), (19, 125),
-- Time 20: Bleed Esports
(20, 126), (20, 127), (20, 128), (20, 129), (20, 130);

-- Inserir Participa (Ligação Partida-Time, usa todos os 30 times) (Total: 60)
INSERT INTO Participa (fk_Partida_ID_Partida, fk_Time_ID_Time) VALUES
(1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (3, 6), (4, 7), (4, 8), (5, 9), (5, 10),
(6, 11), (6, 12), (7, 13), (7, 14), (8, 15), (8, 16), (9, 17), (9, 18), (10, 19), (10, 20),
(11, 21), (11, 22), (12, 23), (12, 24), (13, 25), (13, 26), (14, 27), (14, 28), (15, 29), (15, 30),
(16, 1), (16, 3), (17, 2), (17, 4), (18, 5), (18, 7), (19, 6), (19, 8), (20, 9), (20, 11),
(21, 10), (21, 12), (22, 13), (22, 15), (23, 14), (23, 16), (24, 17), (24, 19), (25, 18), (25, 20),
(26, 21), (26, 23), (27, 22), (27, 24), (28, 25), (28, 27), (29, 26), (29, 28), (30, 29), (30, 1);

-- Inserir Jogador_Op_Atk (Comunidade + Pro Players) (Total: 63)
INSERT INTO Jogador_Op_Atk (fk_Jogador_ID_Jogador, fk_Operador_Ataque_ID, Winrate) VALUES
-- Comunidade
(1, 3, 1.5), (1, 10, 1.2), (2, 1, 0.8), (10, 3, 2.0), (10, 21, 1.8),
-- w7m
(31, 12, 1.8), (31, 20, 1.6), (32, 3, 1.9), (32, 21, 1.7), (33, 20, 1.5), (34, 2, 1.6), (35, 10, 1.7),
-- FaZe
(36, 12, 1.8), (36, 28, 1.7), (37, 20, 2.0), (37, 3, 1.8), (38, 3, 1.7), (39, 1, 1.5), (40, 9, 1.6),
-- G2
(41, 1, 1.6), (41, 9, 1.5), (42, 20, 1.8), (42, 3, 1.7), (43, 28, 1.8), (44, 12, 1.9), (45, 2, 1.4),
-- VP
(46, 3, 1.9), (46, 20, 1.8), (47, 21, 1.7), (47, 10, 1.6), (48, 12, 1.7), (49, 3, 1.8), (50, 1, 1.6),
-- Liquid
(51, 2, 1.7), (51, 21, 1.6), (52, 20, 2.1), (52, 3, 1.9), (53, 3, 2.0), (54, 28, 1.7), (55, 12, 1.8),
-- SSG
(56, 3, 1.7), (56, 20, 1.6), (57, 14, 1.5), (58, 2, 1.6), (59, 21, 1.7), (60, 3, 1.8),
-- DZ
(61, 20, 1.6), (61, 12, 1.5), (62, 1, 1.5), (63, 3, 1.7), (64, 20, 1.9), (65, 3, 1.8),
-- M80
(66, 3, 2.0), (66, 20, 1.9), (67, 1, 1.6), (68, 2, 1.5), (69, 12, 1.7), (70, 21, 1.7),
-- BDS
(71, 3, 2.2), (71, 20, 2.0), (72, 21, 1.7), (73, 1, 1.6), (74, 2, 1.8), (75, 28, 1.8),
-- Soniqs
(76, 20, 1.8), (76, 12, 1.7), (77, 3, 1.9), (78, 2, 1.6), (79, 3, 2.0), (80, 21, 1.6),
-- Secret
(81, 1, 1.4), (82, 3, 1.6), (83, 20, 1.5), (84, 12, 1.6), (85, 2, 1.4),
-- Wolves
(86, 28, 1.6), (87, 1, 1.5), (88, 2, 1.5), (89, 3, 1.7), (90, 20, 1.7),
-- SCARZ
(91, 3, 1.7), (92, 12, 1.6), (93, 21, 1.5), (94, 20, 1.6), (95, 1, 1.4),
-- FURY
(96, 2, 1.5), (97, 3, 1.6), (98, 1, 1.4), (99, 20, 1.7), (100, 12, 1.6),
-- NiP
(101, 3, 1.8), (102, 20, 1.7), (103, 21, 1.7), (104, 1, 1.6), (105, 12, 1.8),
-- BD
(106, 20, 1.6), (107, 3, 1.7), (108, 2, 1.5), (109, 12, 1.7), (110, 1, 1.5),
-- SANDBOX
(111, 3, 1.7), (112, 20, 1.8), (113, 2, 1.6), (114, 12, 1.6), (115, 21, 1.5),
-- Geekay
(116, 20, 1.6), (117, 1, 1.5), (118, 2, 1.5), (119, 3, 1.8), (120, 28, 1.7),
-- Dplus
(121, 12, 1.7), (122, 20, 1.6), (123, 21, 1.6), (124, 3, 1.7), (125, 1, 1.5),
-- Bleed
(126, 2, 1.5), (127, 20, 1.7), (128, 1, 1.4), (129, 3, 1.6), (130, 21, 1.6);

-- Inserir Jogador_Op_Def (Comunidade + Pro Players) (Total: 63)
INSERT INTO Jogador_Op_Def (fk_Jogador_ID_Jogador, fk_Operador_Defesa_ID, Winrate) VALUES
-- Comunidade
(1, 39, 1.4), (1, 45, 1.3), (2, 36, 0.9), (10, 39, 2.2), (10, 40, 1.9),
-- w7m
(31, 48, 1.7), (31, 39, 1.6), (32, 53, 1.8), (32, 40, 1.7), (33, 45, 1.6), (34, 31, 1.7), (35, 32, 1.6),
-- FaZe
(36, 48, 1.8), (36, 59, 1.7), (37, 39, 1.9), (37, 40, 1.8), (38, 48, 1.7), (39, 45, 1.6), (40, 53, 1.7),
-- G2
(41, 32, 1.7), (41, 45, 1.6), (42, 39, 1.8), (42, 48, 1.7), (43, 59, 1.8), (44, 53, 1.9), (45, 31, 1.5),
-- VP
(46, 39, 2.0), (46, 48, 1.9), (47, 32, 1.8), (47, 45, 1.7), (48, 53, 1.7), (49, 39, 1.8), (50, 31, 1.6),
-- Liquid
(51, 32, 1.8), (51, 45, 1.7), (52, 39, 2.0), (52, 48, 1.9), (53, 48, 2.0), (54, 59, 1.8), (55, 53, 1.8),
-- SSG
(56, 48, 1.7), (56, 39, 1.6), (57, 45, 1.6), (58, 32, 1.7), (59, 59, 1.7), (60, 39, 1.8),
-- DZ
(61, 53, 1.6), (61, 31, 1.5), (62, 32, 1.6), (63, 48, 1.7), (64, 39, 2.0), (65, 39, 1.9),
-- M80
(66, 39, 2.1), (66, 48, 2.0), (67, 32, 1.7), (68, 31, 1.6), (69, 53, 1.7), (70, 45, 1.7),
-- BDS
(71, 39, 2.3), (71, 48, 2.1), (72, 45, 1.8), (73, 32, 1.7), (74, 59, 1.9), (75, 40, 1.8),
-- Soniqs
(76, 48, 1.8), (76, 53, 1.7), (77, 39, 1.9), (78, 32, 1.7), (79, 39, 2.0), (80, 45, 1.6),
-- Secret
(81, 31, 1.5), (82, 39, 1.7), (83, 48, 1.6), (84, 53, 1.6), (85, 32, 1.5),
-- Wolves
(86, 59, 1.7), (87, 31, 1.6), (88, 32, 1.6), (89, 48, 1.7), (90, 39, 1.8),
-- SCARZ
(91, 39, 1.8), (92, 53, 1.7), (93, 45, 1.6), (94, 48, 1.7), (95, 32, 1.5),
-- FURY
(96, 32, 1.6), (97, 39, 1.7), (98, 31, 1.5), (99, 48, 1.8), (100, 53, 1.7),
-- NiP
(101, 39, 1.9), (102, 48, 1.8), (103, 32, 1.8), (104, 45, 1.7), (105, 53, 1.8),
-- BD
(106, 48, 1.7), (107, 39, 1.8), (108, 32, 1.6), (109, 53, 1.8), (110, 31, 1.6),
-- SANDBOX
(111, 39, 1.8), (112, 48, 1.9), (113, 32, 1.7), (114, 53, 1.7), (115, 45, 1.6),
-- Geekay
(116, 45, 1.7), (117, 32, 1.6), (118, 31, 1.6), (119, 39, 1.9), (120, 59, 1.8),
-- Dplus
(121, 53, 1.8), (122, 48, 1.7), (123, 45, 1.7), (124, 39, 1.8), (125, 32, 1.6),
-- Bleed
(126, 32, 1.6), (127, 48, 1.8), (128, 31, 1.5), (129, 39, 1.7), (130, 59, 1.7);