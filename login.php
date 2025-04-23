<?php
session_start();
require_once './database.php';

// Verifica se o usuário já está logado e redireciona
if (isset($_SESSION['logged_in'])) {
    header('Location: /learn.php');
    exit;
}

// Inicializa variáveis
$error = '';
$email = '';

// Processa o formulário de login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitiza e valida os dados de entrada
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'] ?? '';

    // Validação dos campos
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Por favor, insira um e-mail válido';
    } elseif (strlen($password) < 6) {
        $error = 'A senha deve ter pelo menos 6 caracteres';
    } else {
        try {
            // Busca o usuário no banco de dados
            $stmt = db_query(
                "SELECT id, email, username, password_hash FROM users WHERE email = ? AND is_active = 1 LIMIT 1", 
                [$email]
            );
            
            if ($stmt && $user = $stmt->fetch()) {
                // Verifica a senha
                if (password_verify($password, $user['password_hash'])) {
                    // Registra a sessão do usuário
                    $_SESSION['user_id'] = $user['id'];
                    $_SESSION['user_email'] = $user['email'];
                    $_SESSION['user_name'] = $user['username'];
                    $_SESSION['logged_in'] = true;
                    $_SESSION['last_activity'] = time();
                    $_SESSION['ip_address'] = $_SERVER['REMOTE_ADDR'];
                    $_SESSION['user_agent'] = $_SERVER['HTTP_USER_AGENT'];
                    
                    // Atualiza o último login
                    db_query(
                        "UPDATE users SET last_login = NOW(), last_ip = ? WHERE id = ?",
                        [$_SERVER['REMOTE_ADDR'], $user['id']]
                    );
                    
                    // Redireciona para a página protegida
                    header('Location: /learn.php');
                    exit;
                }
            }
            
            // Mensagem genérica para evitar enumeração de usuários
            $error = 'Credenciais inválidas ou conta inativa';
            
        } catch (PDOException $e) {
            error_log("[" . date('Y-m-d H:i:s') . "] Erro no login - IP: {$_SERVER['REMOTE_ADDR']} - " . $e->getMessage());
            $error = 'Erro ao processar login. Tente novamente.';
        }
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR" data-theme="dark-theme">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | CodeNext</title>
    <meta name="description" content="Faça login na plataforma CodeNext para acessar seus cursos de programação">
    
    <!-- CSS -->
    <link rel="stylesheet" href="../assets/css/login.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Favicon -->
    <link rel="icon" href="./assets/images/favicon.ico" type="image/x-icon">
</head>
<body>
    <div class="login-container">
        <div class="logo">
            <div class="logo-icon">{ }</div>
            <div class="logo-text">CodeNext</div>
            <div class="logo-subtext">Aprenda. Pratique. Domine.</div>
        </div>

        <?php if ($error): ?>
            <div class="notification-container">
                <div class="notification error">
                    <i class="fas fa-exclamation-circle"></i> <?php echo htmlspecialchars($error); ?>
                </div>
            </div>
        <?php endif; ?>

        <form class="login-form" id="loginForm" method="POST" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" novalidate>
            <div class="input-group">
                <label for="email">
                    <i class="fas fa-envelope"></i> E-mail
                </label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="seu@email.com" 
                    required
                    value="<?php echo htmlspecialchars($email); ?>"
                    autocomplete="email"
                >
                <div class="input-error" id="email-error">
                    <i class="fas fa-exclamation-triangle"></i> Por favor, insira um e-mail válido
                </div>
            </div>

            <div class="input-group">
                <label for="password">
                    <i class="fa-solid fa-key"></i> Senha
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    minlength="6"
                    autocomplete="current-password"
                >
                <div class="input-error" id="password-error">
                    <i class="fas fa-exclamation-triangle"></i> A senha deve ter pelo menos 6 caracteres
                </div>
            </div>

            <button type="submit" class="login-button" id="submitBtn">
                <span class="spinner" id="spinner"></span>
                <span id="buttonText">Entrar</span>
            </button>
        </form>

        <div class="divider">ou continue com</div>

        <div class="social-login">
            <a href="auth/google.php" class="social-btn" aria-label="Login com Google">
                <i class="fa-brands fa-google"></i>
            </a>
            <a href="auth/github.php" class="social-btn" aria-label="Login com GitHub">
                <i class="fa-brands fa-github"></i>
            </a>
            <a href="auth/linkedin.php" class="social-btn" aria-label="Login com LinkedIn">
                <i class="fa-brands fa-linkedin-in"></i>
            </a>
        </div>

        <div class="footer-links">
            <div>
                <a href="register.php">
                    <i class="fas fa-user-plus"></i> Crie uma conta
                </a>
            </div>
            <div>
                <a href="forgot-password.php">
                    <i class="fa-solid fa-key"></i> Esqueceu a senha?
                </a>
            </div>
        </div>
    </div>

    <!-- JavaScript -->
    <script src="../assets/js/login.js"></script>
</body>
</html>