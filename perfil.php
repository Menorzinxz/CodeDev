<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CodeDev - Aprenda Programação</title>
    <link rel="stylesheet" href="../assets/css/learn.css" />
  </head>
  <body>
    <div class="sidebar">
      <div class="logo">CodeDev</div>

      <div class="menu">
        <div class="menu-item" onclick="window.location.href='learn.php'">
          <i class="icon-learn"></i><span>learn</span>
        </div>
        <div class="menu-item" onclick="window.location.href='praticar.php'">
          <i class="icon-practice"></i><span>PRATICAR</span>
        </div>
        <div class="menu-item" onclick="window.location.href='ligas.php'">
          <i class="icon-leagues"></i><span>LIGAS</span>
        </div>
        <div class="menu-item" onclick="window.location.href='missoes.php'">
          <i class="icon-missions"></i><span>MISSÕES</span>
        </div>
        <div class="menu-item" onclick="window.location.href='loja.php'">
          <i class="icon-shop"></i><span>LOJA</span>
        </div>
        <div
          class="menu-item active"
          onclick="window.location.href='perfil.php'"
        >
          <i class="icon-profile"></i><span>PERFIL</span>
        </div>
        <div
          class="menu-item"
          onclick="window.location.href='config.php'"
        >
          <i class="icon-gear"></i><span>CONFIGURAÇÕES</span>
        </div>
      </div>
    </div>
    <div class="theme-toggle-container">
      <span class="theme-toggle-label" id="themeLabel">Tema</span>
      <button class="theme-toggle" id="themeToggle" aria-label="Alternar tema">
        <span class="theme-icon sun-icon">☀️</span>
        <span class="theme-icon moon-icon">🌙</span>
      </button>
    </div>
    <script src="../assets/js/theme.js"></script>
  </body>
</html>
