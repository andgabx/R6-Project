-- V2__seed.sql

-- Modos de Jogo (Dados estáticos de exemplo)
INSERT INTO Modo_de_Jogo (Nome, Descricao, Tipo) VALUES
                                                     ('Casual', 'Modo de jogo rápido sem impacto no ranking', 'PVP'),
                                                     ('Competitivo', 'Modo ranqueado com sistema de pontos', 'PVP'),
                                                     ('Deathmatch', 'Aquecimento com foco em trocação', 'PVP');

-- Armas (Dados estáticos de exemplo)
INSERT INTO Arma (Nome, Cadencia, Tipo, Dano, Capacidade) VALUES
                                                              ('R4-C', 860, 'Rifle de Assalto', 39, 30),
                                                              ('M590A1', 180, 'Espingarda', 48, 7),
                                                              ('MP7', 900, 'Submetralhadora', 32, 30),
                                                              ('LMG-E', 900, 'Metralhadora Leve', 41, 150),
                                                              ('AK-12', 850, 'Rifle de Assalto', 45, 30),
                                                              ('T-5 SMG', 900, 'Submetralhadora', 28, 30),
                                                              ('F2', 980, 'Rifle de Assalto', 37, 25),
                                                              ('UMP45', 600, 'Submetralhadora', 38, 25),
                                                              ('MP5', 800, 'Submetralhadora', 27, 30);

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
INSERT INTO Dados (Nivel, Winrate, RankJogador, Headshot, KD) VALUES
                                                                  (751, 95.5, 'Diamond V', 44.5, 1.21),
                                                                  (50, 44.5, 'Bronze V', 34.5, 0.60),
                                                                  (3501, 64.5, 'Champion', 54.5, 1.41),
                                                                  (751, 64.5, 'Diamond V', 54.5, 1.41),
                                                                  (2501, 54.5, 'Champion', 44.5, 1.41),
                                                                  (2501, 54.5, 'Diamond I', 44.5, 1.41),
                                                                  (301, 44.5, 'Platinum II', 44.5, 0.80),
                                                                  (1501, 54.5, 'Gold II', 54.5, 0.80),
                                                                  (1501, 64.5, 'Gold V', 44.5, 1.01),
                                                                  (4500, 54.5, 'Gold V', 54.5, 0.80),
                                                                  (2501, 44.5, 'Bronze V', 54.5, 0.80),
                                                                  (301, 54.5, 'Silver II', 44.5, 1.01),
                                                                  (1501, 54.5, 'Bronze III', 44.5, 1.41),
                                                                  (301, 44.5, 'Bronze I', 44.5, 0.80),
                                                                  (3501, 44.5, 'Bronze V', 54.5, 0.60),
                                                                  (2501, 54.5, 'Platinum II', 64.5, 1.21),
                                                                  (3501, 54.5, 'Copper I', 54.5, 1.41),
                                                                  (1501, 54.5, 'Bronze III', 54.5, 1.21),
                                                                  (751, 44.5, 'Gold I', 44.5, 0.80),
                                                                  (301, 54.5, 'Gold II', 54.5, 1.01),
                                                                  (1501, 44.5, 'Gold II', 44.5, 1.01),
                                                                  (4500, 54.5, 'Gold II', 44.5, 1.01),
                                                                  (1501, 44.5, 'Gold I', 24.5, 0.80),
                                                                  (301, 54.5, 'Platinum V', 44.5, 1.21),
                                                                  (50, 54.5, 'Platinum IV', 54.5, 1.41),
                                                                  (50, 54.5, 'Silver II', 34.5, 0.80),
                                                                  (2501, 74.5, 'Silver II', 44.5, 1.41),
                                                                  (2501, 34.5, 'Silver V', 44.5, 1.21),
                                                                  (4500, 44.5, 'Copper V', 14.5, 0.60),
                                                                  (4500, 95.5, 'Champion', 90.0, 2.01),
                                                                  (1501, 34.5, 'Silver V', 74.5, 1.21),
                                                                  (2501, 85.0, 'Champion', 74.5, 2.01),
                                                                  (50, 95.5, 'Champion', 90.0, 2.01),
                                                                  (301, 54.5, 'Copper I', 24.5, 1.01),
                                                                  (1501, 74.5, 'Diamond II', 64.5, 1.61),
                                                                  (301, 44.5, 'Bronze III', 24.5, 0.80),
                                                                  (751, 44.5, 'Gold IV', 54.5, 1.21),
                                                                  (751, 74.5, 'Diamond I', 90.0, 1.61);

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
                                                                                                      (5, 2, 'Breaching Round', 'Dispara um projétil explosivo'),
                                                                                                      (16, 2, 'Breaching Hammer', 'Marreta para destruir superfícies'),
                                                                                                      (11, 2, 'Skeleton Key', 'Espingarda acoplada para abrir paredes'),
                                                                                                      (15, 2, 'KS79 LIFELINE', 'Lança granadas de concussão e impacto');

INSERT INTO Defesa (fk_Operador_ID_Operador, Gadget_Unico_Defesa, Habilidade_Unica_Defesa, Preparo) VALUES
                                                                                                        (2, 'Stim Pistol', 'Cura ou revive aliados a distância', 'Manter posição'),
                                                                                                        (4, 'Armor Pack', 'Fornece coletes de armadura', 'Manter posição'),
                                                                                                        (7, 'Bandit Battery', 'Eletrifica superfícies de metal', 'Preparar armadilha'),
                                                                                                        (8, 'Mute Jammer', 'Bloqueia sinal de gadgets eletrônicos', 'Preparar armadilha'),
                                                                                                        (9, 'Black Eye Camera', 'Câmeras adesivas que podem ser colocadas em qualquer lugar', 'Coletar informação');

-- Associação Operador <-> Arma (Dados de exemplo)
INSERT INTO Porta (fk_Operador_ID_Operador, fk_Arma_ID_Arma) VALUES
                                                                 (1, 7), (1, 2), -- Twitch: F2, M590A1
                                                                 (5, 1), (5, 2), -- Ash: R4-C, M590A1
                                                                 (2, 9), (2, 2), -- Doc: MP5, M590A1
                                                                 (4, 9), (4, 2), -- Rook: MP5, M590A1
                                                                 (7, 9), (7, 2), -- Bandit: MP7, M590A1
                                                                 (8, 9), (8, 2), -- Mute: MP5, M590A1
                                                                 (15, 4), (15, 5), -- Zofia: LMG-E, AK-12
                                                                 (29, 6), -- Mozzie: T-5 SMG
                                                                 (32, 2); -- Sledge: M590A1