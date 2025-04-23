-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS `codedev_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `codedev_db`;

-- Tabela de usuários (para registro/login)
CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `avatar` VARCHAR(255) DEFAULT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela para autenticação social (Google)
CREATE TABLE `social_logins` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `provider` VARCHAR(20) NOT NULL COMMENT 'google, github, etc',
  `provider_id` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `provider_unique` (`provider`,`provider_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de perfis de usuários
CREATE TABLE `profiles` (
  `user_id` INT NOT NULL,
  `full_name` VARCHAR(100) DEFAULT NULL,
  `bio` TEXT DEFAULT NULL,
  `website` VARCHAR(255) DEFAULT NULL,
  `location` VARCHAR(100) DEFAULT NULL,
  `skills` TEXT DEFAULT NULL COMMENT 'JSON array de habilidades',
  PRIMARY KEY (`user_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de projetos
CREATE TABLE `projects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `repository_url` VARCHAR(255) DEFAULT NULL,
  `is_public` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela para reset de senha
CREATE TABLE `password_resets` (
  `email` VARCHAR(100) NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`email`),
  KEY `token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de sessões (opcional para controle de logins)
CREATE TABLE `sessions` (
  `session_id` VARCHAR(255) NOT NULL,
  `user_id` INT DEFAULT NULL,
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `user_agent` TEXT DEFAULT NULL,
  `payload` TEXT NOT NULL,
  `last_activity` INT NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Inserção de usuário admin inicial (senha: Admin@123)
INSERT INTO `users` (`username`, `email`, `password_hash`) VALUES
('admin', 'admin@codedev.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Inserção de perfil do admin
INSERT INTO `profiles` (`user_id`, `full_name`, `bio`) VALUES
(1, 'Administrador do Sistema', 'Conta administrativa inicial do sistema');