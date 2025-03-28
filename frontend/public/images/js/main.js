// DOM Elements
const lessonElements = document.querySelectorAll('.lesson');
const promoButton = document.querySelector('.promo-button');
const streakWidget = document.querySelector('.streak-widget');
const menuItems = document.querySelectorAll('.menu-item');

// User Data
let userData = {
  name: 'Usuário',
  xp: 1250,
  streak: 3,
  league: 'Divisão Fruita',
  position: 15,
  dailyMissions: [
    { id: 1, title: 'Ganhe 10 XP', completed: 8, total: 18 },
    { id: 2, title: 'Consiga 80% ou mais de acertos em 3 lições', completed: 3, total: 3 }
  ]
};

// Initialize the app
function initApp() {
  updateUserData();
  setupEventListeners();
  checkDailyLogin();
}

// Update UI with user data
function updateUserData() {
  // Update league info
  document.querySelector('.league-content').textContent = 
    `Muito bem, ${userData.name}! Você terminou em ${userData.position}º lugar e manterá sua posição na ${userData.league}.`;
  
  // Update missions
  const missionsGrid = document.querySelector('.missions-grid');
  missionsGrid.innerHTML = userData.dailyMissions.map(mission => `
    <div class="mission-card">
      <div class="mission-title">${mission.title}</div>
      <div class="progress-container">
        <div class="progress-bar" style="width: ${(mission.completed / mission.total) * 100}%"></div>
      </div>
      <div class="progress-text">${mission.completed} / ${mission.total}</div>
    </div>
  `).join('');
}

// Setup event listeners
function setupEventListeners() {
  // Lesson click handler
  lessonElements.forEach(lesson => {
    lesson.addEventListener('click', function() {
      startLesson(this.dataset.lessonId);
    });
  });
  
  // Promo button click
  promoButton.addEventListener('click', startFreeTrial);
  
  // Streak widget click
  streakWidget.addEventListener('click', showStreakModal);
  
  // Menu navigation
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      navigateToSection(this.dataset.section);
    });
  });
}

// API Functions
async function startLesson(lessonId) {
  try {
    const response = await fetch('/api/lessons/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ lessonId })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Update local user data
      userData.xp += data.xpEarned;
      userData.dailyMissions[0].completed += 1;
      
      // Check if mission completed
      if (data.completedMission) {
        userData.dailyMissions[1].completed += 1;
      }
      
      updateUserData();
      showLessonCompleteModal(data);
    } else {
      throw new Error(data.message || 'Failed to start lesson');
    }
  } catch (error) {
    console.error('Lesson error:', error);
    alert(error.message);
  }
}

// Helper Functions
function checkDailyLogin() {
  const lastLogin = localStorage.getItem('lastLogin');
  const today = new Date().toDateString();
  
  if (lastLogin !== today) {
    // New day - update streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastLogin === yesterday.toDateString()) {
      userData.streak += 1;
    } else {
      userData.streak = 1; // Reset streak if broken
    }
    
    localStorage.setItem('lastLogin', today);
    updateUserData();
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);