// Dados das linguagens
const languages = [
    {
        name: "Python",
        icon: "fab fa-python",
        description: "Linguagem versátil para web, dados e automação",
        popularity: 92,
        students: "12.4M",
        badge: { text: "TOP 1", class: "trending-top" }
    },
    {
        name: "JavaScript",
        icon: "fab fa-js",
        description: "Essencial para desenvolvimento web",
        popularity: 88,
        students: "8.7M",
        badge: { text: "+42%", class: "trending-up" }
    },
    {
        name: "Java",
        icon: "fab fa-java",
        description: "Para aplicações empresariais robustas",
        popularity: 76,
        students: "5.2M"
    },
    {
        name: "C#",
        icon: "fas fa-code",
        description: "Linguagem moderna para desenvolvimento .NET",
        popularity: 68,
        students: "3.8M",
        badge: { text: "+18%", class: "trending-up" }
    },
    {
        name: "Rust",
        icon: "fas fa-cog",
        description: "Linguagem de sistemas com foco em segurança",
        popularity: 65,
        students: "620K",
        badge: { text: "+65%", class: "trending-up" }
    },
    {
        name: "Go",
        icon: "fab fa-google",
        description: "Eficiente para sistemas distribuídos",
        popularity: 58,
        students: "890K"
    }
];

// Gerar cards dinamicamente
function renderLanguages() {
    const container = document.getElementById('languageContainer');
    container.innerHTML = languages.map(lang => `
        <div class="language-card">
            <div class="language-header">
                <div class="language-icon">
                    <i class="${lang.icon}"></i>
                </div>
                <h2 class="language-name">${lang.name}</h2>
            </div>
            <p class="language-desc">${lang.description}</p>
            
            <div class="progress-container">
                <div class="progress-label">
                    <span>Popularidade</span>
                    <span>${lang.popularity}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${lang.popularity}%"></div>
                </div>
            </div>
            
            <div class="language-meta">
                <div class="language-students">
                    <strong>${lang.students}</strong> alunos
                </div>
                ${lang.badge ? `<span class="trending-badge ${lang.badge.class}">${lang.badge.text}</span>` : ''}
            </div>
        </div>
    `).join('');
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderLanguages();
    setupTheme();
});