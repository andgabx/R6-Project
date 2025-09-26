package com.game_stats.game_stats.config;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Game Stats API",
                version = "1.0.0",
                description = "API para gerenciamento de jogadores, operadores e estatísticas de jogo."
        )
)
public class OpenApiConfig {
}
