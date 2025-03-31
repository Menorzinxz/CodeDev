// Sistema de Notificações
function showNotification(type, message, duration = 5000) {
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
  
    // Fechar automaticamente
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, duration);
  
    // Fechar manualmente
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    });
  }
  
  // Controle do Tema
  function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');
    const body = document.body;
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
  
    // Verificar preferência salva
    const savedTheme = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
    if (savedTheme === 'true' || (!savedTheme && prefersDark)) {
      body.classList.add('dark-mode');
      updateThemeUI(true);
    }
  
    // Configurar toggle
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
  }
  
  // Validação do Formulário de Registro
  function setupFormValidation() {
    const form = document.getElementById('registerForm');
    const spinner = document.getElementById('spinner');
    const buttonText = document.getElementById('buttonText');
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
  
      // Validação de e-mail
      if (!email.includes('@') || !email.includes('.')) {
        showNotification('error', 'Por favor, insira um e-mail válido');
        return;
      }
  
      // Validação de senha
      if (password.length < 6) {
        showNotification('error', 'A senha deve ter pelo menos 6 caracteres');
        return;
      }
  
      // Confirmação de senha
      if (password !== confirmPassword) {
        showNotification('error', 'As senhas não coincidem');
        return;
      }
  
      // Simular envio
      spinner.style.display = 'inline-block';
      buttonText.textContent = 'Criando conta...';
      form.querySelector('button').disabled = true;
  
      // Simular requisição
      setTimeout(() => {
        showNotification('success', 'Conta criada com sucesso!');
        spinner.style.display = 'none';
        buttonText.textContent = 'Conta criada!';
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      }, 1500);
    });
  }
  
  // Inicialização
  document.addEventListener('DOMContentLoaded', function() {
    setupThemeToggle();
    setupFormValidation();
  });