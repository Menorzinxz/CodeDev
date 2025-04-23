<?php
session_start();
require_once './database.php';

// Inicializa CSRF token
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

$errors = [];
$username = $email = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verifica CSRF token
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        $errors['general'] = 'Token de segurança inválido';
    } else {
        $username = trim($_POST['username']);
        $email = trim($_POST['email']);
        $password = $_POST['password'];
        $confirm_password = $_POST['confirm_password'];

        // Validações
        if (empty($username)) {
            $errors['username'] = 'Nome de usuário obrigatório';
        } elseif (strlen($username) < 3) {
            $errors['username'] = 'Mínimo 3 caracteres';
        }

        if (empty($email)) {
            $errors['email'] = 'E-mail obrigatório';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'E-mail inválido';
        }

        if (empty($password)) {
            $errors['password'] = 'Senha obrigatória';
        } elseif (strlen($password) < 6) {
            $errors['password'] = 'Senha deve ter 6+ caracteres';
        } elseif ($password !== $confirm_password) {
            $errors['confirm_password'] = 'Senhas não coincidem';
        }

        // Verifica se usuário/email já existe
        if (empty($errors)) {
            try {
                $stmt = $db->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
                $stmt->execute([$username, $email]);
                
                if ($stmt->rowCount() > 0) {
                    $errors['general'] = 'Usuário ou e-mail já cadastrado';
                }
            } catch (PDOException $e) {
                error_log("Erro ao verificar usuário: " . $e->getMessage());
                $errors['general'] = 'Erro ao verificar usuário';
            }
        }

        // Cadastra o usuário
        if (empty($errors)) {
            try {
                $password_hash = password_hash($password, PASSWORD_BCRYPT);
                
                $stmt = $db->prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)");
                $stmt->execute([$username, $email, $password_hash]);
                
                // Debug: Verifique se a inserção funcionou
                if ($stmt->rowCount() > 0) {
                    $_SESSION['registration_success'] = true;
                    header('Location: login.php');
                    exit();
                } else {
                    $errors['general'] = 'Falha ao registrar usuário';
                }
                
            } catch (PDOException $e) {
                error_log("Erro ao cadastrar usuário: " . $e->getMessage());
                $errors['general'] = 'Erro ao cadastrar. Tente novamente.';
            }
        }
    }
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Criar Conta - CodeDev</title>
    <link rel="stylesheet" href="./assets/css/register.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"/>
    <style>
        .is-invalid {
            border-color: #dc3545 !important;
            background-color: #fff3f3;
        }
        .invalid-feedback {
            color: #dc3545;
            font-size: 0.875em;
            margin-top: 0.25rem;
        }
        .alert-danger {
            color: #721c24;
            background-color: #f8d7da;
            border-color: #f5c6cb;
            padding: 0.75rem 1.25rem;
            margin-bottom: 1rem;
            border: 1px solid transparent;
            border-radius: 0.25rem;
        }
    </style>
</head>
<body>
    <div class="main-content">
        <div class="auth-container">
            <div class="auth-header">
                <h1 class="auth-title">Crie sua conta</h1>
                <p class="auth-subtitle">
                    Junte-se a nossa comunidade de aprendizado
                </p>
            </div>

            <div class="auth-card">
                <?php if (!empty($errors['general'])): ?>
                    <div class="alert alert-danger"><?php echo $errors['general']; ?></div>
                <?php endif; ?>

                <form id="registerForm" method="POST" action="">
                    <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">

                    <div class="form-group">
                        <label for="username" class="form-label">
                            <i class="fas fa-user"></i> Nome de usuário
                        </label>
                        <input type="text" id="username" name="username" class="form-input <?php echo isset($errors['username']) ? 'is-invalid' : ''; ?>" 
                               placeholder="Seu nome de usuário" required minlength="3" value="<?php echo htmlspecialchars($username); ?>">
                        <?php if (isset($errors['username'])): ?>
                            <div class="invalid-feedback"><?php echo $errors['username']; ?></div>
                        <?php endif; ?>
                    </div>

                    <div class="form-group">
                        <label for="email" class="form-label">
                            <i class="fas fa-envelope"></i> Email
                        </label>
                        <input type="email" id="email" name="email" class="form-input <?php echo isset($errors['email']) ? 'is-invalid' : ''; ?>" 
                               placeholder="seu@email.com" required value="<?php echo htmlspecialchars($email); ?>">
                        <?php if (isset($errors['email'])): ?>
                            <div class="invalid-feedback"><?php echo $errors['email']; ?></div>
                        <?php endif; ?>
                    </div>

                    <div class="form-group">
                        <label for="password" class="form-label">
                            <i class="fa-solid fa-key"></i> Senha
                        </label>
                        <input type="password" id="password" name="password" class="form-input <?php echo isset($errors['password']) ? 'is-invalid' : ''; ?>" 
                               placeholder="••••••••" required minlength="6">
                        <?php if (isset($errors['password'])): ?>
                            <div class="invalid-feedback"><?php echo $errors['password']; ?></div>
                        <?php endif; ?>
                    </div>

                    <div class="form-group">
                        <label for="confirmPassword" class="form-label">
                            <i class="fa-solid fa-key"></i> Confirme sua senha
                        </label>
                        <input type="password" id="confirmPassword" name="confirm_password" 
                               class="form-input <?php echo isset($errors['confirm_password']) ? 'is-invalid' : ''; ?>" 
                               placeholder="••••••••" required>
                        <?php if (isset($errors['confirm_password'])): ?>
                            <div class="invalid-feedback"><?php echo $errors['confirm_password']; ?></div>
                        <?php endif; ?>
                    </div>

                    <button type="submit" class="auth-btn" id="submitBtn">
                        <span class="spinner" id="spinner" style="display: none;"></span>
                        <span id="buttonText">Criar conta</span>
                    </button>

                    <div class="auth-footer">
                        Já tem uma conta?
                        <a href="login.php" class="auth-link">
                            <i class="fas fa-sign-in-alt"></i> Faça login
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script>
        // Validação em tempo real
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            const submitBtn = document.getElementById('submitBtn');
            const spinner = document.getElementById('spinner');
            const buttonText = document.getElementById('buttonText');
            
            // Mostra spinner durante o envio
            spinner.style.display = 'inline-block';
            buttonText.textContent = 'Processando...';
            submitBtn.disabled = true;
        });

        // Verificação de senha em tempo real
        document.getElementById('confirmPassword').addEventListener('input', function() {
            const password = document.getElementById('password').value;
            const confirmPassword = this.value;
            const errorElement = this.nextElementSibling;
            
            if (confirmPassword && password !== confirmPassword) {
                this.classList.add('is-invalid');
                errorElement.textContent = 'As senhas não coincidem';
            } else {
                this.classList.remove('is-invalid');
                errorElement.textContent = '';
            }
        });
    </script>
</body>
</html>