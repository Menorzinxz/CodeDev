// Função para mostrar notificações
function showNotification(type, message, duration = 3000) {
  const container = document.getElementById('notificationContainer');
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠️',
    info: 'ⓘ'
  };

  notification.innerHTML = `
    <span>${icons[type]}</span>
    <span>${message}</span>
    <span class="notification-close">×</span>
  `;

  container.appendChild(notification);
  setTimeout(() => notification.classList.add('show'), 10);

  // Fechar automaticamente após a duração especificada
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, duration);

  // Fechar ao clicar no botão
  notification.querySelector('.notification-close').addEventListener('click', () => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  });
}

// Validação do formulário de login
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const submitBtn = document.getElementById('submitBtn');
  const spinner = document.getElementById('spinner');
  const buttonText = document.getElementById('buttonText');

  // Validação básica
  if (!email || !password) {
    showNotification('error', 'Por favor, preencha todos os campos');
    return;
  }

  // Mostrar spinner de carregamento
  submitBtn.disabled = true;
  spinner.style.display = 'inline-block';
  buttonText.textContent = 'Autenticando...';

  // Simular autenticação (substitua por chamada real à API)
  setTimeout(() => {
    if (email === 'admin@example.com' && password === 'senha123') {
      showNotification('success', 'Login realizado com sucesso!');
      // Redirecionar após 2 segundos
      setTimeout(() => window.location.href = 'dashboard.html', 2000);
    } else {
      showNotification('error', 'E-mail ou senha incorretos');
      submitBtn.disabled = false;
      spinner.style.display = 'none';
      buttonText.textContent = 'Entrar';
    }
  }, 1500);
});

// Controle do tema dark/light
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const themeLabel = document.getElementById('themeLabel');
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');

  // Verificar preferência salva ou do sistema
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('darkMode');

  if (savedTheme === 'true' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-mode');
    updateThemeUI(true);
  }

  // Configurar o toggle
  themeToggle.addEventListener('click', function() {
    const isDark = !body.classList.contains('dark-mode');
    body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('darkMode', isDark);
    updateThemeUI(isDark);
  });

  function updateThemeUI(isDark) {
    themeLabel.textContent = isDark ? 'Modo Escuro' : 'Modo Claro';
    sunIcon.style.opacity = isDark ? '1' : '0';
    moonIcon.style.opacity = isDark ? '0' : '1';
  }
});

// Navegação para outras páginas
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = this.getAttribute('onclick').match(/'(.*?)'/)[1];
    window.location.href = target;
  });
});