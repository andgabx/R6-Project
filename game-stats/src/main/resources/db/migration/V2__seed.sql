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
INSERT INTO Mapa (ID_Mapa, Nome) VALUES
(1, 'Clubhouse'), (2, 'Villa'), (3, 'Skyscraper'), (4, 'Oregon'),
(5, 'Kafe Dostoyevsky'), (6, 'Bank'), (7, 'Chalet'), (8, 'Coastline'),
(9, 'Consulate'), (10, 'Border');

-- Operadores (Extraído dos dados)
INSERT INTO Operador (ID_Operador, Nome, Velocidade, Blindagem, Unidade_Especial) VALUES
(1, 'Twitch', 2, 2, 'GIGN'), (2, 'Doc', 1, 3, 'GIGN'), (3, 'Blackbeard', 2, 2, 'Navy SEALs'),
(4, 'Rook', 1, 3, 'GIGN'), (5, 'Ash', 3, 1, 'FBI SWAT'), (6, 'Azami', 2, 2, 'SAT'),
(7, 'Bandit', 3, 1, 'GSG 9'), (8, 'Mute', 2, 2, 'SAS'), (9, 'Valkyrie', 2, 2, 'Navy SEALs'),
(10, 'Buck', 2, 2, 'JTF2'), (11, 'Frost', 2, 2, 'JTF2'), (12, 'Finka', 2, 2, 'Spetsnaz'),
(13, 'Lion', 2, 2, 'GIGN'), (14, 'Ace', 2, 2, 'NIGHTHAVEN'), (15, 'Zofia', 2, 2, 'GROM'),
(16, 'Jäger', 3, 1, 'GSG 9'), (17, 'Lesion', 2, 2, 'SDU'), (18, 'Caveira', 3, 1, 'BOPE'),
(19, 'Nomad', 2, 2, 'GIGR'), (20, 'Aruni', 2, 2, 'NIGHTHAVEN'), (21, 'Iana', 2, 2, 'REU'),
(22, 'Thorn', 2, 2, 'NIGHTHAVEN'), (23, 'Flores', 2, 2, 'N/A'), (24, 'Kapkan', 2, 2, 'Spetsnaz'),
(25, 'Solis', 2, 2, 'N/A'), (26, 'Melusi', 3, 1, 'N/A'), (27, 'Maverick', 3, 1, 'N/A'),
(28, 'Capitão', 3, 1, 'BOPE'), (29, 'Mozzie', 2, 2, 'SASR'), (30, 'Pulse', 3, 1, 'FBI SWAT'),
(31, 'Hibana', 3, 1, 'SAT'), (32, 'Sledge', 2, 2, 'SAS');

-- Dados (Estatísticas de cada jogador extraídas dos dados)
INSERT INTO Dados (Dados_PK_INT, Nivel, Winrate, RankJogador, Headshot, KD, Plataforma, Horas_jogadas, Main_role, Preferencia_jogo, fk_Mapa_favorito, fk_Mapa_mais_vitorias, fk_Mapa_mais_derrotas) VALUES
(1, 751, 95.5, 'Diamond V', 44.5, 1.21, 'Playstation', 751, 'Support', 'Duo', 1, 1, 2),
(2, 50, 44.5, 'Bronze V', 34.5, 0.6, 'Playstation', 50, 'Anchor', 'Squad', 1, 1, 3),
(3, 3501, 64.5, 'Champion', 54.5, 1.41, 'PC', 3501, 'Entry', 'Solo', 4, 4, 5),
(4, 751, 64.5, 'Diamond V', 54.5, 1.41, 'Playstation', 751, 'Entry', 'Duo', 1, 1, 3),
(5, 2501, 54.5, 'Champion', 44.5, 1.41, 'PC', 2501, 'Entry', 'Solo', 1, 1, 2),
(6, 2501, 54.5, 'Diamond I', 44.5, 1.41, 'PC', 2501, 'Support', 'Duo', 6, 7, 3),
(7, 301, 44.5, 'Platinum II', 44.5, 0.81, 'Xbox', 301, 'Entry', 'Solo', 7, 7, 6),
(8, 1501, 54.5, 'Gold II', 54.5, 0.81, 'PC', 1501, 'Entry', 'Squad', 4, 3, 6),
(9, 1501, 64.5, 'Gold V', 44.5, 1.01, 'Playstation', 1501, 'Anchor', 'Squad', 4, 4, 6),
(10, 4500, 54.5, 'Gold V', 54.5, 0.81, 'PC', 4500, 'Support', 'Duo', 7, 8, 4),
(11, 2501, 44.5, 'Bronze V', 54.5, 0.81, 'PC', 2501, 'Support', 'Squad', 3, 1, 9),
(12, 301, 54.5, 'Silver II', 44.5, 1.01, 'Xbox', 301, 'Flex', 'Solo', 2, 2, 4),
(13, 1501, 54.5, 'Bronze III', 44.5, 1.41, 'PC', 1501, 'Flex', 'Solo', 2, 8, 1),
(14, 301, 44.5, 'Bronze I', 44.5, 0.81, 'Playstation', 301, 'Anchor', 'Solo', 6, 6, 1),
(15, 3501, 44.5, 'Bronze V', 54.5, 0.6, 'PC', 3501, 'Flex', 'Solo', 10, 4, 8),
(16, 2501, 54.5, 'Platinum II', 64.5, 1.21, 'Playstation', 2501, 'Entry', 'Squad', 8, 8, 3),
(17, 3501, 54.5, 'Copper I', 54.5, 1.41, 'Xbox', 3501, 'Flex', 'Solo', 1, 10, 4),
(18, 1501, 54.5, 'Bronze III', 54.5, 1.21, 'Xbox', 1501, 'Roamer', 'Squad', 9, 9, 2),
(19, 751, 44.5, 'Gold I', 44.5, 0.81, 'PC', 751, 'Entry', 'Duo', 8, 8, 7),
(20, 301, 54.5, 'Gold II', 54.5, 1.01, 'PC', 301, 'Support', 'Duo', 5, 6, 2),
(21, 1501, 44.5, 'Gold II', 44.5, 1.01, 'Xbox', 1501, 'Support', 'Squad', 8, 2, 10),
(22, 4500, 54.5, 'Gold II', 44.5, 1.01, 'PC', 4500, 'Entry', 'Duo', 7, 1, 8),
(23, 1501, 44.5, 'Gold I', 24.5, 0.81, 'PC', 1501, 'Flex', 'Duo', 6, 4, 1),
(24, 301, 54.5, 'Platinum V', 44.5, 1.21, 'PC', 301, 'Roamer', 'Duo', 6, 8, 5),
(25, 50, 54.5, 'Platinum IV', 54.5, 1.41, 'PC', 50, 'Roamer', 'Duo', 6, 9, 7),
(26, 50, 54.5, 'Silver II', 34.5, 0.81, 'Xbox', 50, 'Anchor', 'Solo', 1, 10, 4),
(27, 2501, 74.5, 'Silver II', 44.5, 1.41, 'Xbox', 2501, 'Anchor', 'Solo', 6, 8, 1),
(28, 2501, 34.5, 'Silver V', 44.5, 1.21, 'Xbox', 2501, 'Roamer', 'Duo', 5, 1, 3),
(29, 4500, 44.5, 'Copper V', 14.5, 0.6, 'Xbox', 4500, 'Anchor', 'Duo', 6, 6, 4),
(30, 4500, 95.5, 'Champion', 90.0, 2.01, 'Xbox', 4500, 'Entry', 'Solo', 3, 3, 2),
(31, 1501, 34.5, 'Silver V', 74.5, 1.21, 'Xbox', 1501, 'Support', 'Solo', 1, 4, 2),
(32, 2501, 85.0, 'Champion', 74.5, 2.01, 'PC', 2501, 'Flex', 'Duo', 6, 8, 5),
(33, 50, 95.5, 'Champion', 90.0, 2.01, 'Playstation', 50, 'Entry', 'Duo', 5, 5, 2),
(34, 301, 54.5, 'Copper I', 24.5, 1.01, 'Playstation', 301, 'Support', 'Solo', 1, 4, 3),
(35, 1501, 74.5, 'Diamond II', 64.5, 1.61, 'Playstation', 1501, 'Anchor', 'Duo', 4, 4, 2),
(36, 301, 44.5, 'Bronze III', 24.5, 0.81, 'Xbox', 301, 'Flex', 'Duo', 7, 5, 3),
(37, 751, 44.5, 'Gold IV', 54.5, 1.21, 'PC', 751, 'Flex', 'Duo', 6, 4, 2),
(38, 751, 74.5, 'Diamond I', 90.0, 1.61, 'PC', 751, 'Flex', 'Solo', 2, 7, 3);

-- Jogadores (Extraído dos dados)
INSERT INTO Jogador (ID_Jogador, Nickname, fk_Dados_Dados_PK_INT) VALUES
(1, 'CHONP0964711_', 1), (2, 'rx_marco_rx', 2), (3, 'walsh', 3), (4, 'EstEufE23', 4), (5, 'Maath1910', 5),
(6, 'AuxilioDsempreg', 6), (7, 'Vuiuu', 7), (8, 'twitchbuIIys', 8), (9, 'YxziiDZ', 9), (10, 'Skish04', 10),
(11, 'Pastipelis', 11), (12, 'Epicgamer6481', 12), (13, 'DONTDOWEEDPOT', 13), (14, 'Bluntxzsz', 14),
(15, 'Vermouth599', 15), (16, 'ibafilho09', 16), (17, 'BlitzBlindMe', 17), (18, 'sheld__', 18),
(19, 'F1nalD3V1L', 19), (20, 'matrix.bray', 20), (21, 'Coca-M', 21), (22, 'Monsterboss01', 22),
(23, 'Marcolina', 23),(24, 'ILGELATAIO.', 24), (25, 'MakeAwishKid._F', 25), (26, 'xiaoxueseng233', 26),
(27, 'KUNAM4ta', 27),(28, 'LUffyWolf', 28), (29, 'SeTuLeuTu4G4y', 29), (30, 'Chup4BCT', 30), 
(31, 'Matrix-de-segunda', 31),(32, 'AG.M.A.G', 32), (33, 'Toneco123', 33), (34, 'TrumpIng', 34), 
(35, 'EstUfAdO', 35),(36, 'Maciela', 36), (37, 'caomeiguozhi', 37), (38, 'CartMan', 38);

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

-- V2__seed.sql (Adicionar ao final do arquivo)

-- Adicionando dados de exemplo para associação Jogador <-> Operador
INSERT INTO Jogador_Op_Atk (fk_Jogador_ID_Jogador, fk_Operador_Ataque_ID, Winrate) VALUES
(1, 1, 54.5), (2, 3, 54.5), (3, 5, 54.5), (4, 5, 44.5), (5, 5, 44.5), (6, 1, 44.5),
(7, 5, 54.5), (8, 5, 44.5), (9, 10, 54.5), (10, 12, 44.5), (11, 13, 54.5), (12, 10, 54.5),
(13, 5, 54.5), (14, 14, 44.5), (15, 15, 44.5), (16, 10, 54.5), (17, 5, 54.5), (18, 5, 44.5),
(19, 10, 54.5), (20, 14, 34.5), (21, 5, 44.5), (22, 5, 44.5), (23, 19, 54.5), (24, 14, 44.5),
(25, 14, 44.5), (26, 21, 44.5), (27, 23, 34.5), (28, 1, 54.5), (29, 1, 34.5), (30, 27, 85.0),
(31, 28, 44.5), (32, 15, 95.5), (33, 5, 95.5), (34, 32, 54.5), (35, 31, 74.5), (36, 32, 44.5),
(37, 13, 44.5), (38, 3, 64.5);

INSERT INTO Jogador_Op_Def (fk_Jogador_ID_Jogador, fk_Operador_Defesa_ID, Winrate) VALUES
(1, 2, 85.0), (2, 4, 54.5), (3, 6, 64.5), (4, 7, 64.5), (5, 8, 64.5), (6, 9, 54.5),
(7, 2, 54.5), (8, 2, 54.5), (9, 11, 54.5), (10, 4, 64.5), (11, 9, 54.5), (12, 2, 54.5),
(13, 8, 64.5), (14, 4, 44.5), (15, 9, 64.5), (16, 16, 44.5), (17, 17, 54.5), (18, 2, 54.5),
(19, 4, 64.5), (20, 7, 64.5), (21, 11, 64.5), (22, 18, 54.5), (23, 20, 54.5), (24, 16, 44.5),
(25, 2, 54.5), (26, 22, 85.0), (27, 24, 64.5), (28, 25, 34.5), (29, 26, 44.5), (30, 2, 95.5),
(31, 26, 64.5), (32, 29, 85.0), (33, 2, 85.0), (34, 30, 44.5), (35, 8, 64.5), (36, 4, 34.5),
(37, 29, 74.5), (38, 9, 54.5);