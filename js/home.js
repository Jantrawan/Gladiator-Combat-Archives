/**
 * Home Page Logic - Chart.js Visualizations & Statistics
 */

document.addEventListener('DOMContentLoaded', async () => {
  let statsData = null;

  try {
    const res = await fetch('data/stats.json');
    if (res.ok) {
      statsData = await res.json();
    }
  } catch (e) {
    console.warn('Could not fetch data/stats.json directly, falling back to embedded dataset stats.', e);
  }

  // Robust fallback data if fetch fails
  if (!statsData) {
    statsData = {
      totalGladiators: 9976,
      totalWins: 78256,
      totalLosses: 17270,
      avgWins: 7.8,
      avgLosses: 1.7,
      categories: {
        "Provocator": 1771,
        "Thraex": 1715,
        "Retiarius": 1638,
        "Secutor": 1633,
        "Hoplomachus": 1626,
        "Murmillo": 1593
      },
      weapons: {
        "Dagger": 4186,
        "Gladius (Sword)": 2507,
        "Sica (Curved Sword)": 843,
        "Trident": 820,
        "Net": 818,
        "Spear": 802
      },
      injuries: {
        "Low": 7920,
        "High": 2056
      },
      topFighters: [
        { name: "Minicius Mamilius", wins: 23, losses: 8, origin: "Rome", category: "Provocator", weapon: "Dagger" },
        { name: "Sicinius Aelius", wins: 22, losses: 12, origin: "Germania", category: "Retiarius", weapon: "Net" },
        { name: "Candidus Numonius", wins: 22, losses: 12, origin: "Rome", category: "Murmillo", weapon: "Dagger" },
        { name: "Fulcinia Vincentius", wins: 22, losses: 5, origin: "Numidia", category: "Hoplomachus", weapon: "Spear" }
      ]
    };
  }

  // Animate Big Counter Numbers
  animateCounter('counter-total', statsData.totalGladiators);
  animateCounter('counter-wins', statsData.totalWins);
  animateCounter('counter-losses', statsData.totalLosses);
  animateCounter('counter-avg-wins', statsData.avgWins, true);

  // Render Charts using Chart.js with Modern Art Museum Monochrome Theme
  initCharts(statsData);

  // Render Top Champions Grid
  renderChampions(statsData.topFighters);
});

function animateCounter(id, target, isDecimal = false) {
  const el = document.getElementById(id);
  if (!el) return;
  
  let current = 0;
  const step = target / 40;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
  }, 25);
}

function initCharts(stats) {
  if (typeof Chart === 'undefined') {
    console.error('Chart.js not loaded');
    return;
  }

  // Global Chart.js styling
  Chart.defaults.font.family = "'Bai Jamjuree', sans-serif";
  Chart.defaults.color = '#e8e8e8';

  // Palette from user requirements:
  const palette = ['#b7b4ae', '#726e68', '#33312f', '#371e1e', '#0a0a0a', '#695f5d'];

  // 1. Chart: Fighting Styles / Categories (Bar Chart with distinct colors)
  const ctxCategory = document.getElementById('chart-category');
  if (ctxCategory) {
    const labels = Object.keys(stats.categories);
    const data = Object.values(stats.categories);

    new Chart(ctxCategory, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'จำนวนนักสู้ (คน)',
          data: data,
          backgroundColor: palette,
          borderColor: '#b7b4ae',
          borderWidth: 1.5,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1c2a49',
            borderColor: '#a6a6a6',
            borderWidth: 1.5,
            titleColor: '#ffffff',
            bodyColor: '#e8e8e8',
            padding: 12
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#e8e8e8', font: { weight: '500' } }
          },
          y: {
            grid: { color: 'rgba(166, 166, 166, 0.25)' },
            ticks: { color: '#cccccc' }
          }
        }
      }
    });
  }

  // 2. Chart: Popular Weapons (Horizontal Bar with distinct colors per bar)
  const ctxWeapons = document.getElementById('chart-weapons');
  if (ctxWeapons) {
    const labels = Object.keys(stats.weapons);
    const data = Object.values(stats.weapons);
    const weaponColors = ['#161616', '#36332f', '#695f5d', '#ac9e9b', '#e8e8e8', '#f9f6f2'];

    new Chart(ctxWeapons, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          axis: 'y',
          label: 'จำนวนผู้ใช้อาวุธ (คน)',
          data: data,
          backgroundColor: weaponColors,
          borderColor: '#a6a6a6',
          borderWidth: 1.5,
          borderRadius: 4
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1c2a49',
            borderColor: '#a6a6a6',
            borderWidth: 1.5,
            titleColor: '#ffffff',
            bodyColor: '#e8e8e8',
            padding: 12
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(166, 166, 166, 0.25)' },
            ticks: { color: '#cccccc' }
          },
          y: {
            grid: { display: false },
            ticks: { color: '#e8e8e8', font: { weight: '500' } }
          }
        }
      }
    });
  }

  // 3. Chart: Injury History (Doughnut with distinct contrast colors)
  const ctxInjuries = document.getElementById('chart-injuries');
  if (ctxInjuries) {
    new Chart(ctxInjuries, {
      type: 'doughnut',
      data: {
        labels: ['บาดเจ็บต่ำ (Low Injury - 79.4%)', 'บาดเจ็บรุนแรง (High Injury - 20.6%)'],
        datasets: [{
          data: [stats.injuries.Low || 7920, stats.injuries.High || 2056],
          backgroundColor: ['#5e4b42', '#e8e8e8'],
          borderColor: '#3b3b3b',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#e8e8e8',
              padding: 16,
              usePointStyle: true,
              font: { size: 12 }
            }
          },
          tooltip: {
            backgroundColor: '#1c2a49',
            borderColor: '#a6a6a6',
            borderWidth: 1.5,
            titleColor: '#ffffff',
            bodyColor: '#e8e8e8',
            padding: 12
          }
        },
        cutout: '68%'
      }
    });
  }

  // 4. Chart: Wins vs Losses Ratio (Doughnut with distinct colors)
  const ctxWinLoss = document.getElementById('chart-winloss');
  if (ctxWinLoss) {
    new Chart(ctxWinLoss, {
      type: 'doughnut',
      data: {
        labels: [
          `สถิติการชนะ (${stats.totalWins.toLocaleString()} ครั้ง)`,
          `สถิติการแพ้ (${stats.totalLosses.toLocaleString()} ครั้ง)`
        ],
        datasets: [{
          data: [stats.totalWins, stats.totalLosses],
          backgroundColor: ['#5e4b42', '#e8e8e8'],
          borderColor: '#3b3b3b',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#e8e8e8',
              padding: 16,
              usePointStyle: true,
              font: { size: 12 }
            }
          },
          tooltip: {
            backgroundColor: '#1c2a49',
            borderColor: '#a6a6a6',
            borderWidth: 1.5,
            titleColor: '#ffffff',
            bodyColor: '#e8e8e8',
            padding: 12
          }
        },
        cutout: '68%'
      }
    });
  }
}

function renderChampions(fighters) {
  const container = document.getElementById('champions-grid');
  if (!container || !fighters) return;

  container.innerHTML = fighters.slice(0, 4).map((f, idx) => `
    <div class="champion-card">
      <div class="champion-rank">CHAMPION RANK #${idx + 1}</div>
      <h3 class="champion-name">${f.name}</h3>
      <div class="champion-meta">
        <span class="champion-pill">${f.category}</span>
        <span class="champion-pill">${f.origin}</span>
      </div>
      <div class="champion-stats-row">
        <div class="champion-stat-item">
          <div class="champion-stat-num win">${f.wins}</div>
          <div class="champion-stat-label">ชัยชนะ</div>
        </div>
        <div class="champion-stat-item">
          <div class="champion-stat-num loss">${f.losses}</div>
          <div class="champion-stat-label">ความพ่ายแพ้</div>
        </div>
      </div>
      <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1.2rem;">
        <i class="fi fi-rr-sword" style="margin-right: 4px;"></i> อาวุธ: <strong style="color: var(--text-primary);">${f.weapon}</strong>
      </div>
      <a href="gladiators.html?search=${encodeURIComponent(f.name)}" class="btn btn-secondary" style="margin-top: auto; font-size: 0.8rem; padding: 0.6rem;">
        ดูบันทึกประวัติ <i class="fi fi-rr-arrow-right"></i>
      </a>
    </div>
  `).join('');
}
