package com.watchshop.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.boot.jdbc.DataSourceBuilder;
import javax.sql.DataSource;
import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class DatabaseConfig {

    @Bean
    public DataSource dataSource() throws URISyntaxException {
        // Check all possible environment variables Render might provide
        String databaseUrl = System.getenv("DATABASE_URL");
        if (databaseUrl == null) databaseUrl = System.getenv("INTERNAL_DATABASE_URL");
        
        String envUser = System.getenv("DATABASE_USER");
        if (envUser == null) envUser = System.getenv("DB_USER");
        
        String envPass = System.getenv("DATABASE_PASSWORD");
        if (envPass == null) envPass = System.getenv("DB_PASSWORD");

        if (databaseUrl == null) {
            // Local fallback
            return DataSourceBuilder.create()
                    .url("jdbc:postgresql://localhost:5432/watch_shop_db")
                    .username("postgres")
                    .password("1234")
                    .driverClassName("org.postgresql.Driver")
                    .build();
        }

        URI dbUri = new URI(databaseUrl);
        String username = (dbUri.getUserInfo() != null) ? dbUri.getUserInfo().split(":")[0] : envUser;
        String password = (dbUri.getUserInfo() != null) ? dbUri.getUserInfo().split(":")[1] : envPass;
        
        // Ensure we use the correct jdbc prefix
        String cleanPath = dbUri.getPath();
        String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + cleanPath;

        return DataSourceBuilder.create()
                .url(dbUrl)
                .username(username)
                .password(password)
                .driverClassName("org.postgresql.Driver")
                .build();
    }
}
