-- V2__seed.sql

-- Modos de Jogo (Dados estáticos de exemplo)
INSERT INTO Modo_de_Jogo (Nome, Descricao, Tipo) VALUES
                                                     ('Casual', 'Modo de jogo rápido sem impacto no ranking', 'PVP'),
                                                     ('Competitivo', 'Modo ranqueado com sistema de pontos', 'PVP'),
                                                     ('Deathmatch', 'Aquecimento com foco em trocação', 'PVP');

-- Armas (Dados estáticos de exemplo)
INSERT INTO Arma (ID_Arma, Nome, Cadencia, Tipo, Dano, Capacidade) VALUES
(1, 'R4-C', 860, 'Rifle de Assalto', 39, 30),
(2, 'M590A1', 180, 'Espingarda', 48, 7),
(3, 'MP7', 900, 'Submetralhadora', 32, 30),
(4, 'LMG-E', 900, 'Metralhadora Leve', 41, 150),
(5, 'AK-12', 850, 'Rifle de Assalto', 45, 30),
(6, 'T-5 SMG', 900, 'Submetralhadora', 28, 30),
(7, 'F2', 980, 'Rifle de Assalto', 37, 25),
(8, 'UMP45', 600, 'Submetralhadora', 38, 25),
(9, 'MP5', 800, 'Submetralhadora', 27, 30),
(10, 'P90', 970, 'Submetralhadora', 22, 50),
(11, 'SCAR-H', 550, 'Fuzil de Batalha', 49, 20),
(12, 'G36C', 780, 'Rifle de Assalto', 38, 30),
(13, '9mm C1', 575, 'Submetralhadora', 45, 33),
(14, 'C8-SFW', 837, 'Rifle de Assalto', 40, 30),
(15, '416-C Carbine', 740, 'Carabina', 43, 30),
(16, 'M870', 100, 'Espingarda', 60, 7),
(17, '9x19VSN', 750, 'Submetralhadora', 34, 30),
(18, 'M12', 550, 'Submetralhadora', 40, 30),
(19, 'PARA-308', 650, 'Rifle de Assalto', 47, 25),
(20, 'Commando 9', 780, 'Submetralhadora', 36, 25),
(21, 'P10 RONI', 960, 'Submetralhadora', 26, 19),
(22, 'AR-15.50', 1, 'Fuzil de Atirador', 62, 10);

-- Mapas (Extraído dos dados)
INSERT INTO Mapa (Nome) VALUES
                            ('Clubhouse'),
                            ('Villa'),
                            ('Skyscraper'),
                            ('Oregon'),
                            ('Kafe Dostoyevsky'),
                            ('Bank'),
                            ('Chalet'),
                            ('Coastline'),
                            ('Consulate'),
                            ('Border');

-- Operadores (Extraído dos dados - Velocidade, Blindagem e Unidade são exemplos)
INSERT INTO Operador (Nome, Velocidade, Blindagem, Unidade_Especial) VALUES
                                                                         ('Twitch', 2, 2, 'GIGN'),
                                                                         ('Doc', 1, 3, 'GIGN'),
                                                                         ('Blackbeard', 2, 2, 'Navy SEALs'),
                                                                         ('Rook', 1, 3, 'GIGN'),
                                                                         ('Ash', 3, 1, 'FBI SWAT'),
                                                                         ('Azami', 2, 2, 'SAT'),
                                                                         ('Bandit', 3, 1, 'GSG 9'),
                                                                         ('Mute', 2, 2, 'SAS'),
                                                                         ('Valkyrie', 2, 2, 'Navy SEALs'),
                                                                         ('Buck', 2, 2, 'JTF2'),
                                                                         ('Frost', 2, 2, 'JTF2'),
                                                                         ('Finka', 2, 2, 'Spetsnaz'),
                                                                         ('Lion', 2, 2, 'GIGN'),
                                                                         ('Ace', 2, 2, 'NIGHTHAVEN'),
                                                                         ('Zofia', 2, 2, 'GROM'),
                                                                         ('Jäger', 3, 1, 'GSG 9'),
                                                                         ('Lesion', 2, 2, 'SDU'),
                                                                         ('Caveira', 3, 1, 'BOPE'),
                                                                         ('Nomad', 2, 2, 'GIGR'),
                                                                         ('Aruni', 2, 2, 'NIGHTHAVEN'),
                                                                         ('Iana', 2, 2, 'REU'),
                                                                         ('Thorn', 2, 2, 'NIGHTHAVEN'),
                                                                         ('Flores', 2, 2, 'N/A'),
                                                                         ('Kapkan', 2, 2, 'Spetsnaz'),
                                                                         ('Solis', 2, 2, 'N/A'),
                                                                         ('Melusi', 3, 1, 'N/A'),
                                                                         ('Maverick', 3, 1, 'N/A'),
                                                                         ('Capitão', 3, 1, 'BOPE'),
                                                                         ('Mozzie', 2, 2, 'SASR'),
                                                                         ('Pulse', 3, 1, 'FBI SWAT'),
                                                                         ('Hibana', 3, 1, 'SAT'),
                                                                         ('Sledge', 2, 2, 'SAS');

-- Dados (Estatísticas de cada jogador extraídas dos dados)
INSERT INTO Dados (Nivel, Winrate, RankJogador, Headshot, KD, Plataforma, Horas_jogadas, Main_role, Preferencia_jogo, fk_Mapa_favorito, fk_Mapa_mais_vitorias, fk_Mapa_mais_derrotas) VALUES
(751, 95.5, 'Diamond V', 44.5, 1.21, 'PC', 1200, 'Flex', 'Competitivo', 1, 2, 3),
(50, 44.5, 'Bronze V', 34.5, 0.60, 'PS5', 150, 'Suporte', 'Casual', 4, 5, 6),
(3501, 64.5, 'Champion', 54.5, 1.41, 'PC', 4000, 'Entry Fragger', 'Competitivo', 7, 8, 9),
(751, 64.5, 'Diamond V', 54.5, 1.41, 'Xbox', 1100, 'Ancora', 'Competitivo', 10, 1, 2),
(2501, 54.5, 'Champion', 44.5, 1.41, 'PC', 3000, 'Flex', 'Competitivo', 3, 4, 5),
(2501, 54.5, 'Diamond I', 44.5, 1.41, 'PS5', 2800, 'Suporte', 'Competitivo', 6, 7, 8),
(301, 44.5, 'Platinum II', 44.5, 0.80, 'PC', 500, 'Entry Fragger', 'Casual', 9, 10, 1),
(1501, 54.5, 'Gold II', 54.5, 0.80, 'Xbox', 1800, 'Ancora', 'Competitivo', 2, 3, 4),
(1501, 64.5, 'Gold V', 44.5, 1.01, 'PC', 1700, 'Flex', 'Casual', 5, 6, 7),
(4500, 54.5, 'Gold V', 54.5, 0.80, 'PS5', 5000, 'Suporte', 'Competitivo', 8, 9, 10),
(2501, 44.5, 'Bronze V', 54.5, 0.80, 'PC', 2600, 'Entry Fragger', 'Casual', 1, 2, 3),
(301, 54.5, 'Silver II', 44.5, 1.01, 'Xbox', 450, 'Ancora', 'Competitivo', 4, 5, 6),
(1501, 54.5, 'Bronze III', 44.5, 1.41, 'PC', 1600, 'Flex', 'Casual', 7, 8, 9),
(301, 44.5, 'Bronze I', 44.5, 0.80, 'PS5', 400, 'Suporte', 'Competitivo', 10, 1, 2),
(3501, 44.5, 'Bronze V', 54.5, 0.60, 'PC', 3800, 'Entry Fragger', 'Casual', 3, 4, 5),
(2501, 54.5, 'Platinum II', 64.5, 1.21, 'Xbox', 2900, 'Ancora', 'Competitivo', 6, 7, 8),
(3501, 54.5, 'Copper I', 54.5, 1.41, 'PC', 3700, 'Flex', 'Casual', 9, 10, 1),
(1501, 54.5, 'Bronze III', 54.5, 1.21, 'PS5', 1500, 'Suporte', 'Competitivo', 2, 3, 4),
(751, 44.5, 'Gold I', 44.5, 0.80, 'PC', 900, 'Entry Fragger', 'Casual', 5, 6, 7),
(301, 54.5, 'Gold II', 54.5, 1.01, 'Xbox', 600, 'Ancora', 'Competitivo', 8, 9, 10),
(1501, 44.5, 'Gold II', 44.5, 1.01, 'PC', 1400, 'Flex', 'Casual', 1, 2, 3),
(4500, 54.5, 'Gold II', 44.5, 1.01, 'PS5', 4800, 'Suporte', 'Competitivo', 4, 5, 6),
(1501, 44.5, 'Gold I', 24.5, 0.80, 'PC', 1300, 'Entry Fragger', 'Casual', 7, 8, 9),
(301, 54.5, 'Platinum V', 44.5, 1.21, 'Xbox', 700, 'Ancora', 'Competitivo', 10, 1, 2),
(50, 54.5, 'Platinum IV', 54.5, 1.41, 'PC', 200, 'Flex', 'Casual', 3, 4, 5),
(50, 54.5, 'Silver II', 34.5, 0.80, 'PS5', 250, 'Suporte', 'Competitivo', 6, 7, 8),
(2501, 74.5, 'Silver II', 44.5, 1.41, 'PC', 2700, 'Entry Fragger', 'Casual', 9, 10, 1),
(2501, 34.5, 'Silver V', 44.5, 1.21, 'Xbox', 2500, 'Ancora', 'Competitivo', 2, 3, 4),
(4500, 44.5, 'Copper V', 14.5, 0.60, 'PC', 4600, 'Flex', 'Casual', 5, 6, 7),
(4500, 95.5, 'Champion', 90.0, 2.01, 'PS5', 6000, 'Suporte', 'Competitivo', 8, 9, 10),
(1501, 34.5, 'Silver V', 74.5, 1.21, 'PC', 1250, 'Entry Fragger', 'Casual', 1, 2, 3),
(2501, 85.0, 'Champion', 74.5, 2.01, 'Xbox', 3200, 'Ancora', 'Competitivo', 4, 5, 6),
(50, 95.5, 'Champion', 90.0, 2.01, 'PC', 300, 'Flex', 'Competitivo', 7, 8, 9),
(301, 54.5, 'Copper I', 24.5, 1.01, 'PS5', 550, 'Suporte', 'Casual', 10, 1, 2),
(1501, 74.5, 'Diamond II', 64.5, 1.61, 'PC', 1900, 'Entry Fragger', 'Competitivo', 3, 4, 5),
(301, 44.5, 'Bronze III', 24.5, 0.80, 'Xbox', 350, 'Ancora', 'Casual', 6, 7, 8),
(751, 44.5, 'Gold IV', 54.5, 1.21, 'PC', 1000, 'Flex', 'Competitivo', 9, 10, 1),
(751, 74.5, 'Diamond I', 90.0, 1.61, 'PS5', 1300, 'Suporte', 'Competitivo', 2, 3, 4);

-- Jogadores (Extraído dos dados)
INSERT INTO Jogador (Nickname, fk_Dados_Dados_PK_INT) VALUES
                                                          ('CHONP0964711_', 1),
                                                          ('rx_marco_rx', 2),
                                                          ('walsh', 3),
                                                          ('EstEufE23', 4),
                                                          ('Maath1910', 5),
                                                          ('AuxilioDsempreg', 6),
                                                          ('Vuiuu', 7),
                                                          ('twitchbuIIys', 8),
                                                          ('YxziiDZ', 9),
                                                          ('Skish04', 10),
                                                          ('Pastipelis', 11),
                                                          ('Epicgamer6481', 12),
                                                          ('DONTDOWEEDPOT', 13),
                                                          ('Bluntxzsz', 14),
                                                          ('Vermouth599', 15),
                                                          ('ibafilho09', 16),
                                                          ('BlitzBlindMe', 17),
                                                          ('sheld__', 18),
                                                          ('F1nalD3V1L', 19),
                                                          ('matrix.bray', 20),
                                                          ('Coca-M', 21),
                                                          ('Monsterboss01', 22),
                                                          ('Marcolina', 23),
                                                          ('ILGELATAIO.', 24),
                                                          ('MakeAwishKid._F', 25),
                                                          ('xiaoxueseng233', 26),
                                                          ('KUNAM4ta', 27),
                                                          ('LUffyWolf', 28),
                                                          ('SeTuLeuTu4G4y', 29),
                                                          ('Chup4BCT', 30),
                                                          ('Matrix-de-segunda', 31),
                                                          ('AG.M.A.G', 32),
                                                          ('Toneco123', 33),
                                                          ('TrumpIng', 34),
                                                          ('EstUfAdO', 35),
                                                          ('Maciela', 36),
                                                          ('caomeiguozhi', 37),
                                                          ('CartMan', 38);

-- Classificação (Ataque/Defesa - Dados de exemplo, associando alguns operadores)
INSERT INTO Ataque (fk_Operador_ID_Operador, Drone, Gadget_Unico_Ataque, Habilidade_Unica_Ataque) VALUES
(1, 2, 'Twitch Drone', 'Dispara laser para destruir gadgets'),
(3, 2, 'Rifle Shield', 'Escudo montado na arma que protege a cabeça'),
(5, 2, 'Breaching Round', 'Dispara um projétil explosivo que destrói superfícies'),
(10, 2, 'Skeleton Key', 'Espingarda acoplada para abrir paredes e pisos'),
(12, 2, 'Adrenal Surge', 'Aumenta a vida e revive aliados caídos'),
(13, 2, 'EE-ONE-D', 'Detecta inimigos em movimento com um drone aéreo'),
(14, 2, 'S.E.L.M.A. Aquabreacher', 'Explosivo aquático que destrói paredes reforçadas'),
(15, 2, 'KS79 LIFELINE', 'Lança granadas de concussão e de impacto'),
(19, 2, 'Airjab', 'Mina de ar que empurra os inimigos para trás'),
(21, 2, 'Gemini Replicator', 'Cria um holograma controlável para enganar inimigos'),
(23, 2, 'RCE-RATERO Charge', 'Drone explosivo que pode ser guiado sob portas'),
(27, 2, 'Breaching Torch', 'Maçarico silencioso para criar pequenas aberturas'),
(28, 2, 'Tactical Crossbow', 'Besta que dispara dardos asfixiantes e de fumaça'),
(31, 2, 'X-KAIROS', 'Lança projéteis explosivos que abrem paredes reforçadas'),
(32, 2, 'Breaching Hammer', 'Marreta para destruir superfícies não reforçadas');

INSERT INTO Defesa (fk_Operador_ID_Operador, Gadget_Unico_Defesa, Habilidade_Unica_Defesa, Preparo) VALUES
(2, 'Stim Pistol', 'Cura ou revive aliados a distância', 'Manter posição'),
(4, 'Armor Pack', 'Fornece coletes de armadura extra para a equipe', 'Manter posição'),
(6, 'Kiba Barrier', 'Lança uma barreira expansível que bloqueia a visão e projéteis', 'Bloquear área'),
(7, 'Bandit Battery', 'Eletrifica superfícies de metal, destruindo gadgets', 'Preparar armadilha'),
(8, 'Mute Jammer', 'Bloqueia sinais de gadgets eletrônicos inimigos', 'Preparar armadilha'),
(9, 'Black Eye Camera', 'Câmeras adesivas que podem ser colocadas em qualquer lugar', 'Coletar informação'),
(11, 'Welcome Mat', 'Armadilha mecânica que incapacita inimigos', 'Preparar armadilha'),
(16, 'Active Defense System (ADS)', 'Destrói projéteis inimigos que entram na sua área de efeito', 'Manter posição'),
(17, 'Gu Mine', 'Mina venenosa e invisível que causa dano e revela inimigos', 'Preparar armadilha'),
(18, 'Silent Step', 'Habilidade que permite mover-se silenciosamente', 'Roaming'),
(20, 'Surya Gate', 'Barreira laser que causa dano e destrói drones', 'Bloquear área'),
(22, 'Razorbloom Shell', 'Dispositivo que explode e lança espinhos quando detecta inimigos', 'Preparar armadilha'),
(24, 'Entry Denial Device (EDD)', 'Armadilha laser que explode em portas e janelas', 'Preparar armadilha'),
(25, 'SPEC-IO Electro-Sensor', 'Detecta gadgets eletrônicos através de paredes', 'Coletar informação'),
(26, 'Banshee Sonic Defense', 'Dispositivo que desacelera e desorienta inimigos', 'Bloquear área'),
(29, 'Pest Launcher', 'Lança pequenas aranhas robóticas que hackeiam drones inimigos', 'Coletar informação'),
(30, 'Cardiac Sensor', 'Detecta batimentos cardíacos de inimigos próximos através de paredes', 'Coletar informação');

-- Associação Operador <-> Arma (Dados de exemplo)
INSERT INTO Porta (fk_Operador_ID_Operador, fk_Arma_ID_Arma) VALUES
-- Twitch
(1, 7), (1, 2),
-- Doc
(2, 9), (2, 10),
-- Blackbeard
(3, 11), (3, 22),
-- Rook
(4, 9), (4, 10),
-- Ash
(5, 1), (5, 12),
-- Bandit
(7, 3), (7, 16),
-- Mute
(8, 9), (8, 2),
-- Buck
(10, 14), (10, 22),
-- Frost
(11, 13), (11, 2),
-- Zofia
(15, 4), (15, 5),
-- Jäger
(16, 15), (16, 16),
-- Caveira
(18, 12), (18, 18),
-- Mozzie
(20, 20), (20, 21),
-- Capitão
(28, 19), (28, 4),
-- Pulse
(30, 8), (30, 2),
-- Sledge
(32, 1), (32, 2);