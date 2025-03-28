// Identidade do Site
const siteConfig = {
    name: "LinguaLearn",
    slogan: "Aprenda Idiomas de Forma Divertida",
    primaryColor: "#2E8B57",
    secondaryColor: "#3CB371",
    objectives: [
        "Proporcionar aprendizado de idiomas eficiente",
        "Tornar o estudo divertido e gamificado",
        "Oferecer conteúdo personalizado",
        "Criar uma comunidade de aprendizes"
    ]
};

// Objetivos do Site
console.log(`Bem-vindo ao ${siteConfig.name} - ${siteConfig.slogan}`);
console.log("Nossos objetivos:");
siteConfig.objectives.forEach((obj, index) => {
    console.log(`${index + 1}. ${obj}`);
});

// Dados do Usuário
const userData = {
    name: "Usuário",
    xp: 1250,
    league: "Divisão Fruita",
    position: 15,
    streak: 3,
    languages: ["Inglês", "Espanhol"]
};

// Atualizar elementos da página
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar progresso de XP
    const xpProgress = document.getElementById('xp-progress');
    const xpCurrent = document.getElementById('xp-current');
    const xpTotal = document.getElementById('xp-total');
    
    // Simular progresso (pode ser substituído por dados reais)
    const currentXP = 8;
    const totalXP = 18;
    const progressPercentage = (currentXP / totalXP) * 100;
    
    xpProgress.style.width = `${progressPercentage}%`;
    xpCurrent.textContent = currentXP;
    xpTotal.textContent = totalXP;
    
    // Navegação do menu
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Aqui você pode adicionar lógica para carregar diferentes seções
            const section = this.getAttribute('data-section');
            console.log(`Navegando para: ${section}`);
        });
    });
    
    // Lições clicáveis
    const lessons = document.querySelectorAll('.lesson');
    lessons.forEach(lesson => {
        lesson.addEventListener('click', function() {
            const lessonId = this.getAttribute('data-lesson');
            console.log(`Iniciando lição ${lessonId}: ${this.textContent}`);
            // Aqui você pode adicionar lógica para iniciar a lição
        });
    });
    
    // Botão de trial
    const trialButton = document.getElementById('pro-trial');
    trialButton.addEventListener('click', function() {
        console.log("Iniciando teste gratuito de 2 semanas");
        alert("Teste gratuito iniciado! Aproveite os recursos premium por 2 semanas.");
    });
    
    // Atualizar dados da liga
    const leagueContent = document.querySelector('.league-content');
    leagueContent.textContent = 
        `Muito bem, ${userData.name}! Você terminou em ${userData.position}º lugar e manterá sua posição na ${userData.league}.`;
});

// Funções adicionais
function updateDailyProgress() {
    // Esta função pode ser usada para atualizar o progresso diário
    console.log("Atualizando progresso diário...");
}

function checkDailyMissions() {
    // Verificar missões diárias completadas
    console.log("Verificando missões diárias...");
}

// Simular dados atualizados
setInterval(() => {
    checkDailyMissions();
}, 300000); // A cada 5 minutos