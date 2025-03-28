const themeToggle = document.getElementById('themeToggle');
        const themeLabel = document.getElementById('themeLabel');
        const body = document.body;
        const sunIcon = document.querySelector('.sun-icon');
        const moonIcon = document.querySelector('.moon-icon');

        function checkThemePreference() {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const savedTheme = localStorage.getItem('darkMode');
            
            if (savedTheme === 'true' || (!savedTheme && prefersDark)) {
                body.classList.add('dark-mode');
                updateThemeUI(true);
            } else {
                body.classList.remove('dark-mode');
                updateThemeUI(false);
            }
        }

        function updateThemeUI(isDark) {
            themeLabel.textContent = isDark ? 'Modo Escuro' : 'Modo Claro';
            sunIcon.style.opacity = isDark ? '1' : '0';
            moonIcon.style.opacity = isDark ? '0' : '1';
        }

        themeToggle.addEventListener('click', () => {
            const isDark = !body.classList.contains('dark-mode');
            body.classList.toggle('dark-mode', isDark);
            localStorage.setItem('darkMode', isDark);
            updateThemeUI(isDark);
        });

        checkThemePreference();