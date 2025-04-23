<!DOCTYPE html>
<html lang="pt-br" data-theme="dark-theme">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CodeDev - Aprenda Programação</title>
    <link rel="stylesheet" href="./assets/css/index.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  </head>
  <body>
    <div class="container">
      <header>
        <div class="logo">CodeDev</div>
        <nav>
          <ul class="nav-links"></ul>
        </nav>
        <div class="bnts-header">
          <button class="primary-btn" onclick="window.location.href='login.php'">Entrar</button>
          <button class="primary-btn" onclick="window.location.href='register.php'">Registre-se</button>
        </div>
      </header>

      <section class="hero">
        <div class="hero-content">
          <h1>O jeito grátis, divertido e eficaz de aprender programação!</h1>
          <p>
            Milhões de pessoas estão aprendendo gratuitamente com a CodeDev. A
            maneira mais popular de aprender programação online!
          </p>
        </div>
        <div class="hero-image">
          <img
            src="./assets/images/hero-image.svg"
            alt="CodeDev mascot"
          />
        </div>
      </section>

      <section class="features">
        <div class="feature">
          <div class="feature-icon"><i class="fas fa-trophy"></i></div>
          <h3>Aprendizado Científico</h3>
          <p>
            Nossas lições são adaptadas para te ajudar a aprender no seu próprio
            ritmo.
          </p>
        </div>
        <div class="feature">
          <div class="feature-icon"><i class="fas fa-smile"></i></div>
          <h3>Divertido e Eficaz</h3>
          <p>Aprenda enquanto se diverte com lições curtas e gamificadas.</p>
        </div>
        <div class="feature">
          <div class="feature-icon"><i class="fas fa-globe"></i></div>
          <h3>Para Todos</h3>
          <p>Disponível para todos os níveis de conhecimento.</p>
        </div>
      </section>
    </div>

    <footer>
      <div class="footer-links">
        <a href="#">Sobre</a>
        <a href="#">Carreiras</a>
        <a href="#">Privacidade</a>
        <a href="#">Termos</a>
      </div>
      <p>© 2025 CodeDev - Todos os direitos reservados</p>
    </footer>

    <script src="./assets/js/index.js"></script>
  </body>
</html>