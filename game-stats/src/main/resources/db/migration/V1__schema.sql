-- V1__schema_modificado.sql
CREATE SCHEMA IF NOT EXISTS game_stats DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE game_stats;

-- Mapa
CREATE TABLE Mapa (
                      ID_Mapa INT AUTO_INCREMENT PRIMARY KEY,
                      Nome VARCHAR(255) NOT NULL
);

-- Modo_de_Jogo
CREATE TABLE Modo_de_Jogo (
                              ID_Modo_de_Jogo INT AUTO_INCREMENT PRIMARY KEY,
                              Nome VARCHAR(255) NOT NULL,
                              Descricao TEXT,
                              Tipo VARCHAR(20)
);

-- Dados (Tabela modificada para incluir mais detalhes do jogador)
CREATE TABLE Dados (
                       Dados_PK_INT INT AUTO_INCREMENT PRIMARY KEY,
                       Nivel INT,
                       Winrate DECIMAL(5,2),
                       RankJogador VARCHAR(20),
                       Headshot FLOAT,
                       KD DECIMAL(5,2),
                       Plataforma VARCHAR(50),
                       Horas_jogadas INT,
                       Main_role VARCHAR(100),
                       Preferencia_jogo VARCHAR(100),
                       fk_Mapa_favorito INT,
                       fk_Mapa_mais_vitorias INT,
                       fk_Mapa_mais_derrotas INT,
                       CONSTRAINT FK_Dados_Mapa_Favorito FOREIGN KEY (fk_Mapa_favorito)
                           REFERENCES Mapa(ID_Mapa) ON DELETE SET NULL,
                       CONSTRAINT FK_Dados_Mapa_Vitorias FOREIGN KEY (fk_Mapa_mais_vitorias)
                           REFERENCES Mapa(ID_Mapa) ON DELETE SET NULL,
                       CONSTRAINT FK_Dados_Mapa_Derrotas FOREIGN KEY (fk_Mapa_mais_derrotas)
                           REFERENCES Mapa(ID_Mapa) ON DELETE SET NULL
);

-- Jogador
CREATE TABLE Jogador (
                         ID_Jogador INT AUTO_INCREMENT PRIMARY KEY,
                         Nickname VARCHAR(255) NOT NULL UNIQUE,
                         fk_Dados_Dados_PK_INT INT,
                         CONSTRAINT FK_Jogador_Dados FOREIGN KEY (fk_Dados_Dados_PK_INT)
                             REFERENCES Dados(Dados_PK_INT) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Operador
CREATE TABLE Operador (
                          ID_Operador INT AUTO_INCREMENT PRIMARY KEY,
                          Nome VARCHAR(255) NOT NULL,
                          Velocidade INT,
                          Blindagem INT,
                          Unidade_Especial VARCHAR(255)
);

-- Ataque
CREATE TABLE Ataque (
                        fk_Operador_ID_Operador INT PRIMARY KEY,
                        Drone INT,
                        Gadget_Unico_Ataque VARCHAR(255),
                        Habilidade_Unica_Ataque VARCHAR(255),
                        CONSTRAINT FK_Ataque_Operador FOREIGN KEY (fk_Operador_ID_Operador)
                            REFERENCES Operador(ID_Operador) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Defesa
CREATE TABLE Defesa (
                        fk_Operador_ID_Operador INT PRIMARY KEY,
                        Gadget_Unico_Defesa VARCHAR(255),
                        Habilidade_Unica_Defesa VARCHAR(255),
                        Preparo VARCHAR(255),
                        CONSTRAINT FK_Defesa_Operador FOREIGN KEY (fk_Operador_ID_Operador)
                            REFERENCES Operador(ID_Operador) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Nova Tabela: Jogador_Op_Atk (Associação Jogador com Operador de Ataque e Winrate)
CREATE TABLE Jogador_Op_Atk (
                                fk_Jogador_ID_Jogador INT NOT NULL,
                                fk_Operador_Ataque_ID INT NOT NULL,
                                Winrate DECIMAL(5,2),
                                PRIMARY KEY (fk_Jogador_ID_Jogador, fk_Operador_Ataque_ID),
                                CONSTRAINT FK_Jogador_Op_Atk_Jogador FOREIGN KEY (fk_Jogador_ID_Jogador)
                                    REFERENCES Jogador(ID_Jogador) ON DELETE CASCADE,
                                -- LINHA CORRIGIDA
                                CONSTRAINT FK_Jogador_Op_Atk_Operador FOREIGN KEY (fk_Operador_Ataque_ID)
                                    REFERENCES Operador(ID_Operador) ON DELETE CASCADE
);

-- Nova Tabela: Jogador_Op_Def (Associação Jogador com Operador de Defesa e Winrate)
CREATE TABLE Jogador_Op_Def (
                                fk_Jogador_ID_Jogador INT NOT NULL,
                                fk_Operador_Defesa_ID INT NOT NULL,
                                Winrate DECIMAL(5,2),
                                PRIMARY KEY (fk_Jogador_ID_Jogador, fk_Operador_Defesa_ID),
                                CONSTRAINT FK_Jogador_Op_Def_Jogador FOREIGN KEY (fk_Jogador_ID_Jogador)
                                    REFERENCES Jogador(ID_Jogador) ON DELETE CASCADE,
                                -- LINHA CORRIGIDA
                                CONSTRAINT FK_Jogador_Op_Def_Operador FOREIGN KEY (fk_Operador_Defesa_ID)
                                    REFERENCES Operador(ID_Operador) ON DELETE CASCADE
);

-- Arma
CREATE TABLE Arma (
                      ID_Arma INT AUTO_INCREMENT PRIMARY KEY,
                      Nome VARCHAR(255) NOT NULL,
                      Cadencia INT,
                      Tipo VARCHAR(100),
                      Dano INT,
                      Capacidade INT
);

-- Acessorio
CREATE TABLE Acessorio (
                           ID_Acessorio INT AUTO_INCREMENT PRIMARY KEY,
                           Nome VARCHAR(255) NOT NULL,
                           Tipo VARCHAR(100)
);

-- Partida
CREATE TABLE Partida (
                         ID_Partida INT AUTO_INCREMENT PRIMARY KEY,
                         Resultado VARCHAR(50),
                         fk_Mapa_ID_Mapa INT NOT NULL,
                         fk_Modo_de_Jogo_ID_Modo_de_Jogo INT NOT NULL,
                         DataHora DATETIME NOT NULL,
                         CONSTRAINT FK_Partida_Mapa FOREIGN KEY (fk_Mapa_ID_Mapa) REFERENCES Mapa(ID_Mapa),
                         CONSTRAINT FK_Partida_Modo FOREIGN KEY (fk_Modo_de_Jogo_ID_Modo_de_Jogo) REFERENCES Modo_de_Jogo(ID_Modo_de_Jogo)
);

-- Time
CREATE TABLE Time (
                      ID_Time INT AUTO_INCREMENT PRIMARY KEY,
                      fk_Partida_ID_Partida INT NOT NULL,
                      CONSTRAINT FK_Time_Partida FOREIGN KEY (fk_Partida_ID_Partida)
                          REFERENCES Partida(ID_Partida) ON DELETE CASCADE
);

-- Honra
CREATE TABLE Honra (
                       ID_Honra INT AUTO_INCREMENT PRIMARY KEY,
                       Tipo VARCHAR(100),
                       fk_Jogador_Destinatario INT NOT NULL,
                       fk_Jogador_Remetente INT NOT NULL,
                       DataHora DATETIME NOT NULL,
                       CONSTRAINT FK_Honra_Dest FOREIGN KEY (fk_Jogador_Destinatario) REFERENCES Jogador(ID_Jogador),
                       CONSTRAINT FK_Honra_Rem FOREIGN KEY (fk_Jogador_Remetente) REFERENCES Jogador(ID_Jogador)
);

-- Tem (Time - Jogador)
CREATE TABLE Tem (
                     fk_Time_ID_Time INT NOT NULL,
                     fk_Jogador_ID_Jogador INT NOT NULL,
                     PRIMARY KEY (fk_Time_ID_Time, fk_Jogador_ID_Jogador),
                     CONSTRAINT FK_Tem_Time FOREIGN KEY (fk_Time_ID_Time) REFERENCES Time(ID_Time) ON DELETE CASCADE,
                     CONSTRAINT FK_Tem_Jogador FOREIGN KEY (fk_Jogador_ID_Jogador) REFERENCES Jogador(ID_Jogador) ON DELETE CASCADE
);

-- Participa (Partida - Time)
CREATE TABLE Participa (
                           fk_Partida_ID_Partida INT NOT NULL,
                           fk_Time_ID_Time INT NOT NULL,
                           PRIMARY KEY (fk_Partida_ID_Partida, fk_Time_ID_Time),
                           CONSTRAINT FK_Participa_Partida FOREIGN KEY (fk_Partida_ID_Partida) REFERENCES Partida(ID_Partida) ON DELETE CASCADE,
                           CONSTRAINT FK_Participa_Time FOREIGN KEY (fk_Time_ID_Time) REFERENCES Time(ID_Time) ON DELETE CASCADE
);

-- Porta (Operador - Arma)
CREATE TABLE Porta (
                       fk_Operador_ID_Operador INT NOT NULL,
                       fk_Arma_ID_Arma INT NOT NULL,
                       PRIMARY KEY (fk_Operador_ID_Operador, fk_Arma_ID_Arma),
                       CONSTRAINT FK_Porta_Operador FOREIGN KEY (fk_Operador_ID_Operador) REFERENCES Operador(ID_Operador) ON DELETE CASCADE,
                       CONSTRAINT FK_Porta_Arma FOREIGN KEY (fk_Arma_ID_Arma) REFERENCES Arma(ID_Arma) ON DELETE CASCADE
);

-- Contem (Arma - Acessorio)
CREATE TABLE Contem (
                        fk_Arma_ID_Arma INT NOT NULL,
                        fk_Acessorio_ID_Acessorio INT NOT NULL,
                        PRIMARY KEY (fk_Arma_ID_Arma, fk_Acessorio_ID_Acessorio),
                        CONSTRAINT FK_Contem_Arma FOREIGN KEY (fk_Arma_ID_Arma) REFERENCES Arma(ID_Arma) ON DELETE CASCADE,
                        CONSTRAINT FK_Contem_Acessorio FOREIGN KEY (fk_Acessorio_ID_Acessorio) REFERENCES Acessorio(ID_Acessorio) ON DELETE CASCADE
);