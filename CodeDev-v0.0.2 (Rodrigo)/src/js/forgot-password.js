// Ao carregar a página
window.onload = function() {
  const successMessage = document.getElementById('successMessage');
  if (successMessage) {
    successMessage.style.display = 'none'; // Garante que está oculto inicialmente
  }
};

// Controle do formulário de recuperação
document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnIcon = submitBtn.querySelector('.btn-icon');
  const successMessage = document.getElementById('successMessage');
  const sentEmail = document.getElementById('sentEmail');

  // Validação básica
  if (!email.includes('@')) {
    showNotification('error', 'Por favor, insira um e-mail válido');
    return;
  }

  // Simular envio
  submitBtn.disabled = true;
  btnText.textContent = 'Enviando...';
  btnIcon.classList.replace('fa-paper-plane', 'fa-spinner', 'fa-spin');

  setTimeout(() => {
    // Simular sucesso após 1.5s
    successMessage.style.display = 'block';
    sentEmail.textContent = email;
    showNotification('success', `Link enviado para ${email}`);
    
    // Resetar botão
    submitBtn.disabled = false;
    btnText.textContent = 'Enviar link';
    btnIcon.classList.replace('fa-spinner', 'fa-paper-plane');
    btnIcon.classList.remove('fa-spin');
    
    // Limpar formulário
    document.getElementById('forgotPasswordForm').reset();
  }, 1500);
});

// Controle do tema dark/light
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  const body = document.body;

  // Verificar preferência salva
  const savedTheme = localStorage.getItem('darkMode');
  if (savedTheme === 'true') {
    body.classList.add('dark-mode');
    themeLabel.textContent = 'Modo Escuro';
    updateThemeIcons(true);
  }

  // Configurar toggle
  themeToggle.addEventListener('click', function() {
    const isDark = !body.classList.contains('dark-mode');
    body.classList.toggle('dark-mode', isDark);
    localStorage.setItem('darkMode', isDark);
    themeLabel.textContent = isDark ? 'Modo Escuro' : 'Modo Claro';
    updateThemeIcons(isDark);
  });

  function updateThemeIcons(isDark) {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    sunIcon.style.opacity = isDark ? '1' : '0';
    moonIcon.style.opacity = isDark ? '0' : '1';
  }
});