/**
 * Gladiator Archive & Catalog Logic
 * Supports filtering, multi-criteria sorting, search, pagination, and 14-field detail modal
 */

let allGladiators = [];
let filteredGladiators = [];
let currentPage = 1;
const PAGE_SIZE = 25;

document.addEventListener('DOMContentLoaded', async () => {
  const loadingIndicator = document.getElementById('table-loading');
  const tableBody = document.getElementById('gladiators-tbody');
  
  // 1. Fetch Gladiators JSON
  try {
    const res = await fetch('data/gladiators.json');
    if (res.ok) {
      allGladiators = await res.json();
    } else {
      throw new Error("HTTP " + res.status);
    }
  } catch (err) {
    console.error("Failed to load data/gladiators.json:", err);
    if (loadingIndicator) {
      loadingIndicator.innerHTML = `
        <div style="padding: 3rem; text-align: center; color: #ef4444;">
          <i class="fi fi-rr-exclamation" style="font-size: 2rem;"></i>
          <p style="margin-top: 1rem;">ไม่สามารถโหลดข้อมูล gladiators.json ได้ กรุณาเปิดผ่าน Local Server (เช่น http://localhost:8000)</p>
        </div>
      `;
    }
    return;
  }

  filteredGladiators = [...allGladiators];

  // 2. Check URL search param (e.g. from header search on another page)
  const urlParams = new URLSearchParams(window.location.search);
  const initialQuery = urlParams.get('search');
  if (initialQuery) {
    const searchInput = document.getElementById('gladiator-search');
    if (searchInput) searchInput.value = initialQuery;
  }

  // 3. Setup event listeners
  setupControls();

  // 4. Initial filter & render
  applyFiltersAndSort();
});

function setupControls() {
  const searchInput = document.getElementById('gladiator-search');
  const sortSelect = document.getElementById('sort-select');
  const originFilter = document.getElementById('filter-origin');
  const categoryFilter = document.getElementById('filter-category');
  const weaponFilter = document.getElementById('filter-weapon');
  const resetBtn = document.getElementById('reset-filters-btn');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentPage = 1;
      applyFiltersAndSort();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentPage = 1;
      applyFiltersAndSort();
    });
  }

  if (originFilter) {
    originFilter.addEventListener('change', () => {
      currentPage = 1;
      applyFiltersAndSort();
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
      currentPage = 1;
      applyFiltersAndSort();
    });
  }

  if (weaponFilter) {
    weaponFilter.addEventListener('change', () => {
      currentPage = 1;
      applyFiltersAndSort();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (sortSelect) sortSelect.value = 'wins-desc';
      if (originFilter) originFilter.value = 'all';
      if (categoryFilter) categoryFilter.value = 'all';
      if (weaponFilter) weaponFilter.value = 'all';
      currentPage = 1;
      applyFiltersAndSort();
    });
  }

  // Modal Close Listeners
  const modalBackdrop = document.getElementById('gladiator-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  if (modalCloseBtn && modalBackdrop) {
    modalCloseBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('open');
    });
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('open');
      }
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop) {
      modalBackdrop.classList.remove('open');
    }
  });
}

function applyFiltersAndSort() {
  const searchVal = (document.getElementById('gladiator-search')?.value || '').toLowerCase().trim();
  const sortVal = document.getElementById('sort-select')?.value || 'wins-desc';
  const originVal = document.getElementById('filter-origin')?.value || 'all';
  const categoryVal = document.getElementById('filter-category')?.value || 'all';
  const weaponVal = document.getElementById('filter-weapon')?.value || 'all';

  // Filtering
  filteredGladiators = allGladiators.filter(g => {
    // Search match
    if (searchVal) {
      const matchName = g.name.toLowerCase().includes(searchVal);
      const matchOrigin = g.origin.toLowerCase().includes(searchVal);
      const matchCategory = g.category.toLowerCase().includes(searchVal);
      const matchWeapon = g.weapon.toLowerCase().includes(searchVal);
      const matchOccupation = (g.previousOccupation || '').toLowerCase().includes(searchVal);
      if (!matchName && !matchOrigin && !matchCategory && !matchWeapon && !matchOccupation) {
        return false;
      }
    }

    // Origin
    if (originVal !== 'all' && g.origin !== originVal) return false;

    // Category
    if (categoryVal !== 'all' && g.category !== categoryVal) return false;

    // Weapon
    if (weaponVal !== 'all' && !g.weapon.toLowerCase().includes(weaponVal.toLowerCase())) return false;

    return true;
  });

  // Sorting
  filteredGladiators.sort((a, b) => {
    switch (sortVal) {
      case 'wins-desc':
        return b.wins - a.wins;
      case 'wins-asc':
        return a.wins - b.wins;
      case 'losses-desc':
        return b.losses - a.losses;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'age-asc':
        return a.age - b.age;
      case 'age-desc':
        return b.age - a.age;
      default:
        return b.wins - a.wins;
    }
  });

  // Update Result Count
  const countEl = document.getElementById('result-count');
  if (countEl) {
    countEl.textContent = filteredGladiators.length.toLocaleString();
  }

  const originCityMap = {
  "rome": "rome",
  "numidia": "numidia",
  "greece": "greece",
  "germania": "germania",
  "gaul": "gaul",
  "thrace": "thrace"
};

function createOriginLink(origin) {
  const city = String(origin || "").trim();
  const cityKey = originCityMap[city.toLowerCase()];

  // ถ้าไม่มีเมืองนี้ในแผนที่ ให้แสดงเป็นป้ายธรรมดา
  if (!cityKey) {
    return `<span class="badge-tag">${city}</span>`;
  }

  return `
    <a class="badge-tag origin-city-link"
       href="maps.html?city=${encodeURIComponent(cityKey)}"
       title="ดูแผนที่เมือง ${city}">
      ${city}
    </a>
  `;
}

  renderTable();
  renderPagination();
}

function renderTable() {
  const tableBody = document.getElementById('gladiators-tbody');
  const loadingIndicator = document.getElementById('table-loading');
  if (loadingIndicator) loadingIndicator.style.display = 'none';
  if (!tableBody) return;

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const pageData = filteredGladiators.slice(startIndex, endIndex);

  if (pageData.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <i class="fi fi-rr-search-alt" style="font-size: 2rem; display: block; margin-bottom: 0.8rem; opacity: 0.4;"></i>
          ไม่พบข้อมูลนักสู้ที่ตรงกับเงื่อนไขการค้นหา
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = pageData.map((g, index) => `
    <tr>
      <td style="color: var(--text-muted); font-size: 0.8rem; width: 60px;">
        #${startIndex + index + 1}
      </td>
      <td>
        <span class="gladiator-name-link" onclick="openGladiatorModal(${g.id})">
          ${g.name}
          <i class="fi fi-rr-arrow-up-right"></i>
        </span>
      </td>
      <td>
        <span style="font-weight: 500;">${g.age} ปี</span>
      </td>
      <td>
        <span class="badge-tag highlight">${g.origin}</span>
      </td>
      <td>
        <span class="badge-tag highlight">${g.category}</span>
      </td>
      <td>
        <div class="record-pill">
          <span class="win-val">${g.wins}W</span>
          <span class="sep">/</span>
          <span class="loss-val">${g.losses}L</span>
        </div>
      </td>
    </tr>
  `).join('');
}

function renderPagination() {
  const paginationWrapper = document.getElementById('pagination-wrapper');
  const paginationInfo = document.getElementById('pagination-info');
  const paginationBtns = document.getElementById('pagination-buttons');
  if (!paginationWrapper || !paginationBtns) return;

  const totalPages = Math.ceil(filteredGladiators.length / PAGE_SIZE) || 1;

  if (paginationInfo) {
    const start = filteredGladiators.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
    const end = Math.min(currentPage * PAGE_SIZE, filteredGladiators.length);
    paginationInfo.textContent = `แสดง ${start.toLocaleString()} - ${end.toLocaleString()} จาก ${filteredGladiators.length.toLocaleString()} รายการ`;
  }

  let buttonsHtml = `
    <button class="page-btn" onclick="changePage(1)" ${currentPage === 1 ? 'disabled' : ''} title="หน้าแรก">
      <i class="fi fi-rr-angle-double-left"></i>
    </button>
    <button class="page-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} title="หน้าก่อนหน้า">
      <i class="fi fi-rr-angle-left"></i>
    </button>
  `;

  // Sliding window pagination
  let startP = Math.max(1, currentPage - 2);
  let endP = Math.min(totalPages, currentPage + 2);

  if (startP > 1) {
    buttonsHtml += `<button class="page-btn" onclick="changePage(1)">1</button>`;
    if (startP > 2) buttonsHtml += `<span style="color: var(--text-muted); padding: 0 4px;">...</span>`;
  }

  for (let p = startP; p <= endP; p++) {
    buttonsHtml += `
      <button class="page-btn ${p === currentPage ? 'active' : ''}" onclick="changePage(${p})">
        ${p}
      </button>
    `;
  }

  if (endP < totalPages) {
    if (endP < totalPages - 1) buttonsHtml += `<span style="color: var(--text-muted); padding: 0 4px;">...</span>`;
    buttonsHtml += `<button class="page-btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
  }

  buttonsHtml += `
    <button class="page-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} title="หน้าถัดไป">
      <i class="fi fi-rr-angle-right"></i>
    </button>
    <button class="page-btn" onclick="changePage(${totalPages})" ${currentPage === totalPages ? 'disabled' : ''} title="หน้าสุดท้าย">
      <i class="fi fi-rr-angle-double-right"></i>
    </button>
  `;

  paginationBtns.innerHTML = buttonsHtml;
}

window.changePage = function(page) {
  const totalPages = Math.ceil(filteredGladiators.length / PAGE_SIZE) || 1;
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderTable();
  renderPagination();
  document.querySelector('.table-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// Open Detail Modal with 14 Required Fields
window.openGladiatorModal = function(id) {
  const gladiator = allGladiators.find(g => g.id === id);
  if (!gladiator) return;

  const modal = document.getElementById('gladiator-modal');
  if (!modal) return;

  // Header
  document.getElementById('m-name').textContent = gladiator.name;
  document.getElementById('m-category-origin').textContent = `${gladiator.category} • ${gladiator.origin}`;

  // Top Combat Ribbon
  document.getElementById('m-wins').textContent = gladiator.wins;
  document.getElementById('m-losses').textContent = gladiator.losses;
  const winRate = gladiator.wins + gladiator.losses > 0 
    ? Math.round((gladiator.wins / (gladiator.wins + gladiator.losses)) * 100) 
    : 0;
  document.getElementById('m-winrate').textContent = `${winRate}%`;
  document.getElementById('m-favor').textContent = gladiator.publicFavor.toFixed(2);

  // 14 Required Detail Fields
  document.getElementById('f-name').textContent = gladiator.name;
  document.getElementById('f-age').textContent = `${gladiator.age} ปี`;
  document.getElementById('f-birthyear').textContent = `${gladiator.birthYear} (ค.ศ. / AD)`;
  document.getElementById('f-origin').textContent = gladiator.origin;
  document.getElementById('f-weight').textContent = `${gladiator.weight} กก. (kg)`;
  document.getElementById('f-height').textContent = `${gladiator.height} ซม. (cm)`;
  document.getElementById('f-category').textContent = gladiator.category;
  document.getElementById('f-wins').textContent = `${gladiator.wins} ครั้ง`;
  document.getElementById('f-losses').textContent = `${gladiator.losses} ครั้ง`;
  document.getElementById('f-weapon').textContent = gladiator.weapon;
  document.getElementById('f-occupation').textContent = gladiator.previousOccupation || 'ไม่ระบุ';
  document.getElementById('f-patron').textContent = `${gladiator.patronWealth} Wealth`;
  document.getElementById('f-training').textContent = `${gladiator.trainingIntensity} Intensity`;
  document.getElementById('f-publicfavor').textContent = `${gladiator.publicFavor.toFixed(2)} (ดัชนีความนิยม)`;

  modal.classList.add('open');
};

// คลิกชื่อเมืองต้นกำเนิดเพื่อเปิดแผนที่เมืองนั้น
document.addEventListener("click", function (event) {
  const cell = event.target.closest("#gladiators-tbody td");

  if (!cell) return;

  const row = cell.closest("tr");
  if (!row) return;

  // คอลัมน์เมืองต้นกำเนิดคือลำดับที่ 4
  if (cell.cellIndex !== 3) return;

  const cityName = cell.textContent.trim();

  const cityMap = {
    "rome": "rome",
    "numidia": "numidia",
    "greece": "greece",
    "germania": "germania",
    "gaul": "gaul",
    "thrace": "thrace"
  };

  const cityKey = cityMap[cityName.toLowerCase()];

  if (!cityKey) return;

  window.location.href =
    `maps.html?city=${encodeURIComponent(cityKey)}`;
});