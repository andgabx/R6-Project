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

-- Habilita a verificação de chaves estrangeiras novamente
SET FOREIGN_KEY_CHECKS=1;

-- 1. Inserir Tabelas Independentes (Pais)

-- Inserir Mapas (do seu V2 antigo)
INSERT INTO Mapa (ID_Mapa, Nome) VALUES
                                     (1, 'Banco'), (2, 'Fronteira'), (3, 'Casa de Campo'), (4, 'Litoral'), (5, 'Consulado'),
                                     (6, 'Favela'), (7, 'Fortaleza'), (8, 'Hereford (Novo)'), (9, 'Arranha-Céu (Novo)'), (10, 'Canal (Novo)'),
                                     (11, 'Kafe Dostoyevsky'), (12, 'Oregon (Novo)'), (13, 'Outback (Novo)'), (14, 'Parque Temático (Novo)'), (15, 'Arranha-Céu'),
                                     (16, 'Torre'), (17, 'Vila'), (18, 'Iate'), (19, 'Nighthaven Labs'), (20, 'Covil'),
                                     (21, 'Esmeralda'), (22, 'Estádio (Ranqueado)'), (23, 'Casa (Ranqueado)'), (24, 'Avião (Casual)'), (25, 'Base Hereford (Antiga)'),
                                     (26, 'Universidade Bartlett'), (27, 'Fábrica (TDM)'), (28, 'Arena (TDM)'), (29, 'Mapa de Evento 1'), (30, 'Mapa de Evento 2');

-- Inserir Modos de Jogo (do seu V2 antigo, com 'Tipo' genérico)
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

-- Inserir Armas (do seu V2 antigo, com Cadencia e Capacidade genéricos)
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

-- Inserir Acessorios (Genéricos, pois não existiam no V2 antigo)
INSERT INTO Acessorio (ID_Acessorio, Nome, Tipo) VALUES
                                                     (1, 'Mira Holográfica', 'Mira'), (2, 'Mira Reflex', 'Mira'), (3, 'Mira ACOG 2.5x', 'Mira'),
                                                     (4, 'Silenciador', 'Cano'), (5, 'Freio de Boca', 'Cano'), (6, 'Cabo Vertical', 'Empunhadura');

-- Inserir Operadores (do V2 antigo, com Blindagem = 4-Velocidade, e Unidade Especial genérica)
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

-- Inserir Times (do V2 antigo)
INSERT INTO Time (ID_Time, Nome) VALUES
                                     (1, 'G2 Esports'), (2, 'Team SoloMid'), (3, 'Ninjas in Pyjamas'), (4, 'FaZe Clan'), (5, 'Team Liquid'),
                                     (6, 'Spacestation Gaming'), (7, 'BDS Esport'), (8, 'DarkZero Esports'), (9, 'MiBR'), (10, 'Virtus.pro'),
                                     (11, 'Team Empire'), (12, 'Fnatic'), (13, 'Chaos Esports Club'), (14, 'PENTA Sports'), (15, 'Evil Geniuses'),
                                     (16, 'Rogue'), (17, 'Team Secret'), (18, 'Cloud9'), (19, 'Natus Vincere'), (20, 'Black Dragons'),
                                     (21, 'w7m Esports'), (22, 'FURIA Esports'), (23, 'Team oNe eSports'), (24, 'INTZ e-Sports'), (25, 'Santos e-Sports'),
                                     (26, 'Alpha Pack'), (27, 'Bravo Six'), (28, 'Delta Force R6'), (29, 'Cyber Athletes'), (30, 'Vortex Gaming');


-- 2. Inserir Tabelas Dependentes (Filhos)

-- Inserir Dados (Baseado nos jogadores do V2 antigo, com estatísticas genéricas)
INSERT INTO Dados (Dados_PK_INT, Nivel, RankJogador, Winrate, KD, Plataforma, Horas_jogadas) VALUES
                                                                                                 (1, 150, 'Diamante', 1.5, 1.2, 'PC', 500), (2, 89, 'Ouro II', 1.0, 0.9, 'PC', 150),
                                                                                                 (3, 210, 'Platina I', 1.3, 1.1, 'PC', 700), (4, 120, 'Ouro III', 0.9, 0.8, 'Console', 300),
                                                                                                 (5, 300, 'Diamante', 1.6, 1.4, 'PC', 1000), (6, 50, 'Cobre V', 0.6, 0.5, 'PC', 50),
                                                                                                 (7, 170, 'Prata I', 1.0, 1.0, 'Console', 400), (8, 220, 'Platina II', 1.2, 1.1, 'PC', 650),
                                                                                                 (9, 130, 'Ouro I', 1.1, 1.0, 'PC', 350), (10, 400, 'Campeão', 2.0, 1.8, 'PC', 1500),
                                                                                                 (11, 110, 'Prata III', 0.9, 0.9, 'Console', 250), (12, 90, 'Bronze II', 0.8, 0.7, 'PC', 100),
                                                                                                 (13, 250, 'Platina III', 1.2, 1.1, 'PC', 800), (14, 140, 'Ouro II', 1.0, 1.0, 'PC', 300),
                                                                                                 (15, 70, 'Prata V', 0.7, 0.8, 'Console', 90), (16, 180, 'Ouro I', 1.1, 1.1, 'PC', 550),
                                                                                                 (17, 190, 'Platina II', 1.3, 1.2, 'PC', 600), (18, 60, 'Bronze I', 0.8, 0.8, 'Console', 70),
                                                                                                 (19, 230, 'Diamante', 1.5, 1.3, 'PC', 750), (20, 270, 'Platina I', 1.4, 1.2, 'PC', 900),
                                                                                                 (21, 10, 'Cobre V', 0.5, 0.5, 'PC', 10), (22, 160, 'Ouro III', 0.9, 1.0, 'Console', 450),
                                                                                                 (23, 80, 'Prata II', 0.9, 0.9, 'PC', 120), (24, 310, 'Campeão', 1.8, 1.6, 'PC', 1200),
                                                                                                 (25, 100, 'Prata IV', 0.8, 0.8, 'Console', 200), (26, 200, 'Platina III', 1.2, 1.1, 'PC', 600),
                                                                                                 (27, 125, 'Ouro II', 1.0, 1.0, 'PC', 300), (28, 240, 'Platina I', 1.3, 1.2, 'PC', 800),
                                                                                                 (29, 350, 'Campeão', 1.9, 1.7, 'PC', 1400), (30, 5, 'Cobre V', 0.4, 0.4, 'Console', 5);

-- Inserir Jogadores (Baseado no V2 antigo, linkando aos Dados 1-30)
INSERT INTO Jogador (ID_Jogador, Nickname, fk_Dados_Dados_PK_INT) VALUES
                                                                      (1, 'AceKiller', 1), (2, 'BlitzMain', 2), (3, 'CaveiraHunter', 3), (4, 'DocSavior', 4),
                                                                      (5, 'EchoIntel', 5), (6, 'FuzeHostage', 6), (7, 'GlazSniper', 7), (8, 'HibanaBreech', 8),
                                                                      (9, 'IanaGemini', 9), (10, 'JagerADS', 10), (11, 'KapkanTrapper', 11), (12, 'LionScanner', 12),
                                                                      (13, 'MiraWindow', 13), (14, 'NokkStealth', 14), (15, 'OsaShield', 15), (16, 'PulseSensor', 16),
                                                                      (17, 'Quantum', 17), (18, 'RookArmor', 18), (19, 'SledgeHammer', 19), (20, 'ThatcherEMP', 20),
                                                                      (21, 'UbiFan', 21), (22, 'VigilGhost', 22), (23, 'WardenGlasses', 23), (24, 'X-Factor', 24),
                                                                      (25, 'YingFlash', 25), (26, 'ZeroCam', 26), (27, 'ShadowR6', 27), (28, 'ViperStrike', 28),
                                                                      (29, 'R6Pro', 29), (30, 'Newbie123', 30);

-- Inserir Ataque (do V2 antigo)
INSERT INTO Ataque (fk_Operador_ID_Operador, Habilidade_Unica_Ataque) VALUES
                                                                          (1, 'Marreta Tática'), (2, 'Granada PEM'), (3, 'Projétil de Infiltração'), (4, 'Carga Exotérmica'), (5, 'Drone de Choque'),
                                                                          (6, 'Cargas de Fragmentação'), (7, 'Escudo Tático'), (8, 'Detector de Eletrônicos'), (9, 'Chave-Mestra'), (10, 'X-KAIROS'),
                                                                          (11, 'Eyenox'), (12, 'KS79 Lifeline'), (13, 'Surto de Adrenalina'), (14, 'Maçarico'), (15, 'Lançador "Airjab"'),
                                                                          (16, 'Trax Stingers'), (17, 'Redutor de Presença HEL'), (18, 'Gancho Garra'), (19, 'Rifle CSRX 300'), (20, 'Replicador Gemini'),
                                                                          (21, 'S.E.L.M.A.'), (22, 'Câmera Argus'), (23, 'Drone RCE-Ratero'), (24, 'Escudo Talon'), (25, 'Projetor R.O.U.'),
                                                                          (26, 'Lançador Kawan'), (27, 'Drone Kludge'), (28, 'BU-GI Auto-Breacher'), (29, 'Pulso Sônico'), (30, 'Distorção Temporal');

-- Inserir Defesa (do V2 antigo)
INSERT INTO Defesa (fk_Operador_ID_Operador, Habilidade_Unica_Defesa) VALUES
                                                                          (31, 'Granada de Gás Remota'), (32, 'Bloqueador de Sinal'), (33, 'Painel de Blindagem'), (34, 'Sensor Cardíaco'), (35, 'Pistola Estimulante'),
                                                                          (36, 'Bolsa de Blindagem'), (37, 'Dispositivo de Entrada'), (38, 'Lançador Incendiário'), (39, 'Sistema de Defesa Ativa'), (40, 'Fio de Choque'),
                                                                          (41, 'Capacho "Welcome"'), (42, 'Câmera "Black Eye"'), (43, 'Passo Silencioso'), (44, 'Drone Yokai'), (45, 'Espelho Negro'),
                                                                          (46, 'Mina "Gu"'), (47, 'Mina Grzmot'), (48, 'ERC-7'), (49, 'Olho Maligno'), (50, 'Prisma'),
                                                                          (51, 'Escudo CCE'), (52, 'Eletrogarra RTILA'), (53, 'Lançador de Pestes'), (54, 'Óculos Glance'), (55, 'Escudo Volcán'),
                                                                          (56, 'Sistema Mag-NET'), (57, 'Arranque'), (58, 'Defesa Sônica Banshee'), (59, 'Porta Surya'), (60, 'Estação Kona');

-- Inserir Partidas (do V2 antigo, adaptado para V1)
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

-- Inserir Honras (Genérico, pois não existia no V2 antigo)
INSERT INTO Honra (ID_Honra, Tipo, fk_Jogador_Destinatario, fk_Jogador_Remetente, DataHora) VALUES
                                                                                                (1, 'Respeitoso', 1, 2, NOW()), (2, 'Prestativo', 2, 1, NOW()), (3, 'Liderança', 10, 5, NOW()),
                                                                                                (4, 'Respeitoso', 3, 7, NOW()), (5, 'Prestativo', 15, 20, NOW());


-- 3. Inserir Tabelas de Junção (Muitos-para-Muitos)

-- Inserir Porta (do V2 antigo, adaptado)
INSERT INTO Porta (fk_Operador_ID_Operador, fk_Arma_ID_Arma) VALUES
                                                                 (1, 5), (1, 6), (3, 1), (3, 7), (5, 17), (6, 10), (9, 19), (10, 26), (11, 19), (12, 20), (13, 12), (14, 28), (15, 10),
                                                                 (16, 27), (17, 27), (18, 14), (19, 29), (20, 7), (21, 10), (22, 25), (23, 26), (24, 12), (25, 12), (26, 14), (27, 17), (28, 7), (29, 1), (30, 25),
                                                                 (31, 2), (31, 3), (32, 2), (32, 3), (33, 3), (34, 3), (35, 2), (35, 3), (36, 2), (36, 3), (37, 11), (37, 3), (38, 11),
                                                                 (39, 4), (40, 9), (41, 3), (42, 18), (43, 3), (44, 2), (45, 8), (46, 27), (47, 8), (48, 21), (49, 15), (50, 22), (51, 6),
                                                                 (52, 16), (53, 14), (54, 18), (55, 16), (56, 9), (57, 16), (58, 9), (59, 13), (60, 12);

-- Inserir Contem (Genérico, pois não existia)
INSERT INTO Contem (fk_Arma_ID_Arma, fk_Acessorio_ID_Acessorio) VALUES
                                                                    (1, 1), (1, 5), (1, 6), (2, 2), (2, 4), (4, 1), (4, 5), (4, 6), (5, 3), (5, 5), (5, 6);

-- Inserir Tem (Ligação Jogador-Time, genérico)
-- Atribui 5 jogadores a 6 times
INSERT INTO Tem (fk_Time_ID_Time, fk_Jogador_ID_Jogador) VALUES
                                                             (1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
                                                             (2, 6), (2, 7), (2, 8), (2, 9), (2, 10),
                                                             (3, 11), (3, 12), (3, 13), (3, 14), (3, 15),
                                                             (4, 16), (4, 17), (4, 18), (4, 19), (4, 20),
                                                             (5, 21), (5, 22), (5, 23), (5, 24), (5, 25),
                                                             (6, 26), (6, 27), (6, 28), (6, 29), (6, 30);

-- Inserir Participa (Ligação Partida-Time, genérico)
-- Coloca 2 times em cada uma das 30 partidas
INSERT INTO Participa (fk_Partida_ID_Partida, fk_Time_ID_Time) VALUES
                                                                   (1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (3, 6), (4, 7), (4, 8), (5, 9), (5, 10),
                                                                   (6, 11), (6, 12), (7, 13), (7, 14), (8, 15), (8, 16), (9, 17), (9, 18), (10, 19), (10, 20),
                                                                   (11, 21), (11, 22), (12, 23), (12, 24), (13, 25), (13, 26), (14, 27), (14, 28), (15, 29), (15, 30),
                                                                   (16, 1), (16, 3), (17, 2), (17, 4), (18, 5), (18, 7), (19, 6), (19, 8), (20, 9), (20, 11),
                                                                   (21, 10), (21, 12), (22, 13), (22, 15), (23, 14), (23, 16), (24, 17), (24, 19), (25, 18), (25, 20),
                                                                   (26, 21), (26, 23), (27, 22), (27, 24), (28, 25), (28, 27), (29, 26), (29, 28), (30, 29), (30, 1);

-- Inserir Jogador_Op_Atk (Genérico)
INSERT INTO Jogador_Op_Atk (fk_Jogador_ID_Jogador, fk_Operador_Ataque_ID, Winrate) VALUES
                                                                                       (1, 3, 1.5), (1, 10, 1.2), (2, 1, 0.8), (10, 3, 2.0), (10, 21, 1.8);

-- Inserir Jogador_Op_Def (Genérico)
INSERT INTO Jogador_Op_Def (fk_Jogador_ID_Jogador, fk_Operador_Defesa_ID, Winrate) VALUES
                                                                                       (1, 39, 1.4), (1, 45, 1.3), (2, 36, 0.9), (10, 39, 2.2), (10, 40, 1.9);