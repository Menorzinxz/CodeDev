<?php
// Configurações do ambiente (desenvolvimento/produção)
define('ENVIRONMENT', 'development'); // Altere para 'production' em produção

class Database {
    private static $instance = null;
    private $pdo;

    /**
     * Construtor privado para implementar padrão Singleton
     */
    private function __construct() {
        // Configurações do banco de dados
        $dbConfig = [
            'host' => 'localhost',
            'dbname' => 'codedev_db',
            'username' => 'root',
            'password' => '',
            'charset' => 'utf8mb4'
        ];

        // Opções otimizadas do PDO
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_PERSISTENT => false,
            PDO::ATTR_STRINGIFY_FETCHES => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
            PDO::MYSQL_ATTR_FOUND_ROWS => true,
            PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false
        ];

        try {
            // Cria a conexão PDO
            $dsn = "mysql:host={$dbConfig['host']};dbname={$dbConfig['dbname']};charset={$dbConfig['charset']}";
            $this->pdo = new PDO($dsn, $dbConfig['username'], $dbConfig['password'], $options);
            
            // Configura timeout para evitar conexões travadas
            $this->pdo->setAttribute(PDO::ATTR_TIMEOUT, 5);
            
            // Testa a conexão imediatamente
            $this->pdo->query("SELECT 1")->fetch();

        } catch (PDOException $e) {
            $this->handleConnectionError($e);
        }
    }

    /**
     * Obtém a instância única da classe (Singleton)
     */
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    /**
     * Retorna a conexão PDO
     */
    public function getConnection() {
        return $this->pdo;
    }

    /**
     * Tratamento de erros de conexão
     */
    private function handleConnectionError(PDOException $e) {
        $errorMessage = "[" . date('Y-m-d H:i:s') . "] Erro de conexão: " . $e->getMessage();
        error_log($errorMessage);
        
        if (ENVIRONMENT === 'development') {
            throw new PDOException(
                "Erro de conexão: " . $e->getMessage(),
                (int)$e->getCode()
            );
        }
        
        http_response_code(500);
        die("Erro ao conectar ao sistema. Por favor, tente novamente mais tarde.");
    }

    /**
     * Executa queries SQL com tratamento de erros
     */
    public function query(string $sql, array $params = [], bool $debug = false) {
        try {
            $stmt = $this->pdo->prepare($sql);
            
            if ($debug) {
                error_log("[DEBUG] SQL Query: " . $sql);
                error_log("[DEBUG] SQL Params: " . print_r($params, true));
            }
            
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            $errorMessage = "Erro na query: " . $e->getMessage() . "\nQuery: " . $sql;
            error_log($errorMessage);
            
            if (ENVIRONMENT === 'development') {
                throw new PDOException($errorMessage, (int)$e->getCode());
            }
            return false;
        }
    }

    /**
     * Função auxiliar para inserções no banco de dados
     */
    public function insert(string $table, array $data) {
        $columns = implode(', ', array_keys($data));
        $placeholders = ':' . implode(', :', array_keys($data));
        
        $sql = "INSERT INTO $table ($columns) VALUES ($placeholders)";
        $stmt = $this->query($sql, $data);
        
        return $stmt ? $this->pdo->lastInsertId() : false;
    }

    /**
     * Função auxiliar para atualizações no banco de dados
     */
    public function update(string $table, array $data, string $where, array $whereParams = []) {
        $setParts = [];
        foreach ($data as $column => $value) {
            $setParts[] = "$column = :$column";
        }
        $setClause = implode(', ', $setParts);
        
        $sql = "UPDATE $table SET $setClause WHERE $where";
        $params = array_merge($data, $whereParams);
        
        $stmt = $this->query($sql, $params);
        return $stmt ? $stmt->rowCount() : false;
    }
}

// Uso recomendado:
// $db = Database::getInstance();
// $conn = $db->getConnection();
// $results = $db->query("SELECT * FROM users")->fetchAll();