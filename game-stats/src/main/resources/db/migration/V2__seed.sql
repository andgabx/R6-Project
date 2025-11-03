-- Remove dados existentes para evitar conflitos de ID
-- Desabilita a verificação de chaves estrangeiras (MySQL equivalent of CASCADE)
SET FOREIGN_KEY_CHECKS=0;

-- Trunca cada tabela individualmente (MySQL TRUNCATE already resets auto_increment)
TRUNCATE TABLE jogador;
TRUNCATE TABLE time;
TRUNCATE TABLE operador;
TRUNCATE TABLE ataque;
TRUNCATE TABLE defesa;
TRUNCATE TABLE arma;
TRUNCATE TABLE operador_arma;
TRUNCATE TABLE modo_de_jogo;
TRUNCATE TABLE mapa;
TRUNCATE TABLE partida;
TRUNCATE TABLE participa;
TRUNCATE TABLE dados;

-- Habilita a verificação de chaves estrangeiras novamente
SET FOREIGN_KEY_CHECKS=1;
-- Inserir 30 Jogadores
INSERT INTO jogador (nome, nivel, patente) VALUES
('AceKiller', 150, 'Diamante'), ('BlitzMain', 89, 'Ouro II'), ('CaveiraHunter', 210, 'Platina I'),
('DocSavior', 120, 'Ouro III'), ('EchoIntel', 300, 'Diamante'), ('FuzeHostage', 50, 'Cobre V'),
('GlazSniper', 170, 'Prata I'), ('HibanaBreech', 220, 'Platina II'), ('IanaGemini', 130, 'Ouro I'),
('JagerADS', 400, 'Campeão'), ('KapkanTrapper', 110, 'Prata III'), ('LionScanner', 90, 'Bronze II'),
('MiraWindow', 250, 'Platina III'), ('NokkStealth', 140, 'Ouro II'), ('OsaShield', 70, 'Prata V'),
('PulseSensor', 180, 'Ouro I'), ('Quantum', 190, 'Platina II'), ('RookArmor', 60, 'Bronze I'),
('SledgeHammer', 230, 'Diamante'), ('ThatcherEMP', 270, 'Platina I'), ('UbiFan', 10, 'Cobre V'),
('VigilGhost', 160, 'Ouro III'), ('WardenGlasses', 80, 'Prata II'), ('X-Factor', 310, 'Campeão'),
('YingFlash', 100, 'Prata IV'), ('ZeroCam', 200, 'Platina III'), ('ShadowR6', 125, 'Ouro II'),
('ViperStrike', 240, 'Platina I'), ('R6Pro', 350, 'Campeão'), ('Newbie123', 5, 'Cobre V');

-- Inserir 30 Times
INSERT INTO time (nome) VALUES
('G2 Esports'), ('Team SoloMid'), ('Ninjas in Pyjamas'), ('FaZe Clan'), ('Team Liquid'),
('Spacestation Gaming'), ('BDS Esport'), ('DarkZero Esports'), ('MiBR'), ('Virtus.pro'),
('Team Empire'), ('Fnatic'), ('Chaos Esports Club'), ('PENTA Sports'), ('Evil Geniuses'),
('Rogue'), ('Team Secret'), ('Cloud9'), ('Natus Vincere'), ('Black Dragons'), ('w7m Esports'),
('FURIA Esports'), ('Team oNe eSports'), ('INTZ e-Sports'), ('Santos e-Sports'), ('Alpha Pack'),
('Bravo Six'), ('Delta Force R6'), ('Cyber Athletes'), ('Vortex Gaming');

-- Inserir 30 Modos de Jogo
INSERT INTO modo_de_jogo (nome, descricao) VALUES
('Bomba', 'Atacantes plantam o desativador, Defensores protegem as bombas.'),
('Proteger Área', 'Atacantes capturam a sala, Defensores impedem a captura.'),
('Refém', 'Atacantes resgatam o refém, Defensores protegem o refém.'),
('Mata-Mata em Equipe', 'Combate puro para aquecimento.'),
('Arcade: Golden Gun', 'Um tiro, uma morte.'), ('Arcade: Headshots Only', 'Apenas tiros na cabeça causam dano.'),
('Ranqueado', 'Modo competitivo principal.'), ('Standard', 'Modo casual com regras de ranqueado.'),
('Novo Recruta', 'Apenas para jogadores abaixo do nível 50.'), ('Evento: Outbreak', 'Modo PvE contra infectados.'),
('Evento: Showdown', 'Modo 3v3 no Forte da Verdade.'), ('Evento: Doktor''s Curse', 'Modo esconde-esconde de Halloween.'),
('Evento: M.U.T.E. Protocol', 'Defensores viajam por câmeras.'), ('Evento: Rengoku', 'Evento temático do Japão.'),
('Treinamento: Caça-Terrorista', 'Modo PvE clássico.'), ('Treinamento: Situações', 'Cenários de tutorial.'),
('Personalizado', 'Jogo com regras customizadas.'), ('Arcade: Sugar Fright', 'Evento de Halloween com coleta de doces.'),
('Arcade: Atiradores de Elite', 'Apenas rifles de precisão.'), ('Evento: Apocalipse', 'Modo com controle de usina.'),
('Evento: Containment', 'Evento temático de Extraction.'), ('Arcade: TDM - Sem Habilidade', 'Mata-Mata sem habilidades de operador.'),
('Modo de Teste 1', 'Modo em desenvolvimento A.'), ('Modo de Teste 2', 'Modo em desenvolvimento B.'),
('Modo de Teste 3', 'Modo em desenvolvimento C.'), ('Modo de Teste 4', 'Modo em desenvolvimento D.'),
('Modo de Teste 5', 'Modo em desenvolvimento E.'), ('Modo de Teste 6', 'Modo em desenvolvimento F.'),
('Modo de Teste 7', 'Modo em desenvolvimento G.'), ('Modo de Teste 8', 'Modo em desenvolvimento H.');

-- Inserir 30 Mapas
INSERT INTO mapa (nome) VALUES
('Banco'), ('Fronteira'), ('Casa de Campo'), ('Litoral'), ('Consulado'), ('Favela'), ('Fortaleza'),
('Hereford (Novo)'), ('Arranha-Céu (Novo)'), ('Canal (Novo)'), ('Kafe Dostoyevsky'), ('Oregon (Novo)'),
('Outback (Novo)'), ('Parque Temático (Novo)'), ('Arranha-Céu'), ('Torre'), ('Vila'), ('Iate'),
('Nighthaven Labs'), ('Covil'), ('Esmeralda'), ('Estádio (Ranqueado)'), ('Casa (Ranqueado)'),
('Avião (Casual)'), ('Base Hereford (Antiga)'), ('Universidade Bartlett'), ('Fábrica (TDM)'),
('Arena (TDM)'), ('Mapa de Evento 1'), ('Mapa de Evento 2');

-- Inserir 30 Armas
INSERT INTO arma (nome, tipo, dano) VALUES
('R4-C', 'Rifle de Assalto', 39), ('MP5', 'Submetralhadora', 27), ('M590A1', 'Espingarda', 48),
('416-C Carbine', 'Rifle de Assalto', 38), ('L85A2', 'Rifle de Assalto', 47), ('SMG-11', 'Submetralhadora', 35),
('G36C', 'Rifle de Assalto', 38), ('Vector .45 ACP', 'Submetralhadora', 23), ('MP7', 'Submetralhadora', 32),
('AK-12', 'Rifle de Assalto', 45), ('9x19VSN', 'Submetralhadora', 34), ('SPEAR .308', 'Rifle de Assalto', 42),
('P10 RONI', 'Submetralhadora', 26), ('Commando 9', 'Rifle de Assalto', 36), ('ALDA 5.56', 'Metralhadora Leve', 35),
('TCSG12', 'Espingarda (Slug)', 63), ('F2', 'Rifle de Assalto', 37), ('MPX', 'Submetralhadora', 26),
('C8-SFW', 'Rifle de Assalto', 40), ('M762', 'Rifle de Assalto', 45), ('K1A', 'Submetralhadora', 36),
('Mx4 Storm', 'Submetralhadora', 26), ('AUG A2', 'Rifle de Assalto', 42), ('P90', 'Submetralhadora', 22),
('SC3000K', 'Rifle de Assalto', 45), ('ARX200', 'Rifle de Assalto', 47), ('FMG-9', 'Submetralhadora', 34),
('M4', 'Rifle de Assalto', 44), ('CSRX 300', 'Rifle de Precisão', 97), ('Bailiff 410', 'Revólver (Espingarda)', 30);

-- Inserir 60 Operadores (30 Ataque, 30 Defesa)
-- IDs 1-30: Ataque
INSERT INTO operador (id, nome, velocidade, vida) VALUES
(1, 'Sledge', 2, 2), (2, 'Thatcher', 2, 2), (3, 'Ash', 3, 1), (4, 'Thermite', 2, 2), (5, 'Twitch', 2, 2),
(6, 'Fuze', 1, 3), (7, 'Blitz', 2, 2), (8, 'IQ', 3, 1), (9, 'Buck', 2, 2), (10, 'Hibana', 3, 1),
(11, 'Jackal', 2, 2), (12, 'Zofia', 2, 2), (13, 'Finka', 2, 2), (14, 'Maverick', 3, 1), (15, 'Nomad', 2, 2),
(16, 'Gridlock', 1, 3), (17, 'Nokk', 2, 2), (18, 'Amaru', 3, 1), (19, 'Kali', 2, 2), (20, 'Iana', 2, 2),
(21, 'Ace', 2, 2), (22, 'Zero', 2, 2), (23, 'Flores', 2, 2), (24, 'Osa', 2, 2), (25, 'Sens', 1, 3),
(26, 'Grim', 3, 1), (27, 'Brava', 3, 1), (28, 'Ram', 1, 3), (29, 'Striker (2025)', 2, 2), (30, 'Vortex (2025)', 2, 2);

-- IDs 31-60: Defesa
INSERT INTO operador (id, nome, velocidade, vida) VALUES
(31, 'Smoke', 2, 2), (32, 'Mute', 2, 2), (33, 'Castle', 2, 2), (34, 'Pulse', 3, 1), (35, 'Doc', 1, 3),
(36, 'Rook', 1, 3), (37, 'Kapkan', 2, 2), (38, 'Tachanka', 1, 3), (39, 'Jager', 2, 2), (40, 'Bandit', 3, 1),
(41, 'Frost', 2, 2), (42, 'Valkyrie', 2, 2), (43, 'Caveira', 3, 1), (44, 'Echo', 1, 3), (45, 'Mira', 1, 3),
(46, 'Lesion', 2, 2), (47, 'Ela', 3, 1), (48, 'Vigil', 3, 1), (49, 'Maestro', 1, 3), (50, 'Alibi', 3, 1),
(51, 'Clash', 1, 3), (52, 'Kaid', 1, 3), (53, 'Mozzie', 2, 2), (54, 'Warden', 1, 3), (55, 'Goyo', 2, 2),
(56, 'Wamai', 2, 2), (57, 'Oryx', 2, 2), (58, 'Melusi', 3, 1), (59, 'Aruni', 2, 2), (60, 'Thunderbird', 2, 2);

-- Especificar tipo Ataque (30)
INSERT INTO ataque (id, habilidade_especial) VALUES
(1, 'Marreta Tática'), (2, 'Granada PEM'), (3, 'Projétil de Infiltração'), (4, 'Carga Exotérmica'), (5, 'Drone de Choque'),
(6, 'Cargas de Fragmentação'), (7, 'Escudo Tático'), (8, 'Detector de Eletrônicos'), (9, 'Chave-Mestra'), (10, 'X-KAIROS'),
(11, 'Eyenox'), (12, 'KS79 Lifeline'), (13, 'Surto de Adrenalina'), (14, 'Maçarico'), (15, 'Lançador "Airjab"'),
(16, 'Trax Stingers'), (17, 'Redutor de Presença HEL'), (18, 'Gancho Garra'), (19, 'Rifle CSRX 300'), (20, 'Replicador Gemini'),
(21, 'S.E.L.M.A.'), (22, 'Câmera Argus'), (23, 'Drone RCE-Ratero'), (24, 'Escudo Talon'), (25, 'Projetor R.O.U.'),
(26, 'Lançador Kawan'), (27, 'Drone Kludge'), (28, 'BU-GI Auto-Breacher'), (29, 'Pulso Sônico'), (30, 'Distorção Temporal');

-- Especificar tipo Defesa (30)
INSERT INTO defesa (id, habilidade_especial) VALUES
(31, 'Granada de Gás Remota'), (32, 'Bloqueador de Sinal'), (33, 'Painel de Blindagem'), (34, 'Sensor Cardíaco'), (35, 'Pistola Estimulante'),
(36, 'Bolsa de Blindagem'), (37, 'Dispositivo de Entrada'), (38, 'Lançador Incendiário'), (39, 'Sistema de Defesa Ativa'), (40, 'Fio de Choque'),
(41, 'Capacho "Welcome"'), (42, 'Câmera "Black Eye"'), (43, 'Passo Silencioso'), (44, 'Drone Yokai'), (45, 'Espelho Negro'),
(46, 'Mina "Gu"'), (47, 'Mina Grzmot'), (48, 'ERC-7'), (49, 'Olho Maligno'), (50, 'Prisma'),
(51, 'Escudo CCE'), (52, 'Eletrogarra RTILA'), (53, 'Lançador de Pestes'), (54, 'Óculos Glance'), (55, 'Escudo Volcán'),
(56, 'Sistema Mag-NET'), (57, 'Arranque'), (58, 'Defesa Sônica Banshee'), (59, 'Porta Surya'), (60, 'Estação Kona');

-- Inserir 30+ Relações Operador-Arma (Exemplos)
INSERT INTO operador_arma (operador_id, arma_id) VALUES
(1, 5), (1, 6), (3, 1), (3, 7), (5, 17), (6, 10), (9, 19), (10, 26), (11, 19), (12, 20), (13, 12), (14, 28), (15, 10),
(16, 27), (17, 27), (18, 14), (19, 29), (20, 7), (21, 10), (22, 25), (23, 26), (24, 12), (25, 12), (26, 14), (27, 17), (28, 7), (29, 1), (30, 25),
(31, 2), (31, 3), (32, 2), (32, 3), (33, 3), (34, 3), (35, 2), (35, 3), (36, 2), (36, 3), (37, 11), (37, 3), (38, 11),
(39, 4), (40, 9), (41, 3), (42, 18), (43, 3), (44, 2), (45, 8), (46, 27), (47, 8), (48, 21), (49, 15), (50, 22), (51, 6),
(52, 16), (53, 14), (54, 18), (55, 16), (56, 9), (57, 16), (58, 9), (59, 13), (60, 12);

-- Inserir 30 Partidas
INSERT INTO partida (mapa_id, modo_de_jogo_id, time_vencedor_id, duracao_minutos) VALUES
(1, 1, 1, 25), (2, 2, 3, 18), (3, 3, 2, 22), (4, 1, 4, 30), (5, 2, 5, 15),
(6, 3, 1, 28), (7, 1, 6, 19), (8, 2, 7, 24), (9, 3, 8, 21), (10, 1, 9, 27),
(11, 2, 10, 16), (12, 3, 1, 23), (13, 1, 3, 29), (14, 2, 5, 14), (15, 3, 7, 26),
(16, 1, 2, 20), (17, 2, 4, 17), (18, 3, 6, 25), (19, 1, 8, 22), (20, 2, 10, 30),
(21, 3, 1, 18), (22, 1, 3, 28), (23, 2, 5, 19), (24, 3, 7, 24), (25, 1, 9, 21),
(26, 2, 2, 27), (27, 3, 4, 16), (28, 1, 6, 23), (29, 2, 8, 29), (30, 3, 10, 14);

-- Inserir 30 Participações (Usando IDs de operadores 1-60)
INSERT INTO participa (jogador_id, partida_id, time_id, operador_id, pontuacao, kills, deaths, assists) VALUES
(1, 1, 1, 3, 3500, 8, 2, 1), (2, 1, 1, 1, 2800, 5, 3, 2), (3, 1, 1, 10, 3100, 6, 2, 3),
(4, 1, 1, 2, 2400, 4, 3, 1), (5, 1, 1, 14, 3000, 7, 2, 0),
(6, 2, 2, 31, 2900, 6, 4, 0), (7, 2, 2, 39, 4000, 10, 3, 1), (8, 2, 2, 40, 2200, 3, 4, 3),
(9, 2, 2, 45, 3300, 7, 3, 1), (10, 2, 2, 46, 2600, 5, 4, 2),
(11, 3, 3, 5, 3200, 7, 5, 1), (12, 3, 3, 8, 2700, 4, 5, 3), (13, 3, 3, 12, 3800, 9, 4, 1),
(14, 3, 3, 15, 2500, 3, 5, 4), (15, 3, 3, 9, 2900, 6, 4, 0),
(16, 4, 4, 32, 3100, 6, 2, 2), (17, 4, 4, 33, 2600, 4, 3, 1), (18, 4, 4, 35, 2800, 5, 2, 3),
(19, 4, 4, 37, 3000, 7, 2, 0), (20, 4, 4, 42, 3400, 8, 3, 1),
(21, 5, 5, 4, 3600, 9, 4, 1), (22, 5, 5, 6, 2300, 2, 5, 2), (23, 5, 5, 11, 3000, 6, 4, 3),
(24, 5, 5, 13, 2900, 5, 4, 1), (25, 5, 5, 7, 3100, 7, 4, 0),
(26, 6, 6, 50, 2800, 5, 3, 2), (27, 6, 6, 51, 2400, 3, 3, 1), (28, 6, 6, 55, 3200, 7, 2, 1),
(29, 6, 6, 58, 3500, 8, 2, 0), (30, 6, 6, 60, 2700, 4, 3, 3);

-- Inserir 30 Dados (um para cada participação)
INSERT INTO dados (participa_id, headshots, gadgets_destruidos) VALUES
(1, 4, 2), (2, 1, 5), (3, 3, 1), (4, 2, 8), (5, 5, 3), (6, 2, 1), (7, 6, 3),
(8, 1, 0), (9, 4, 2), (10, 2, 4), (11, 3, 3), (12, 1, 6), (13, 5, 2), (14, 0, 1),
(15, 3, 0), (16, 2, 7), (17, 1, 2), (18, 2, 0), (19, 4, 1), (20, 3, 5), (21, 5, 2),
(22, 0, 0), (23, 3, 4), (24, 2, 1), (25, 3, 0), (26, 2, 2), (27, 1, 0), (28, 4, 3),
(29, 3, 1), (30, 2, 0);