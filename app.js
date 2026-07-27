/* Certification Hub Application Logic & Progress Persistence */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initChecklists();
  initAccordions();
  initSearch();
  updateGlobalProgress();
});

// Tab Switcher
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  function activateTab(tabId) {
    tabButtons.forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    tabContents.forEach(content => {
      if (content.id === tabId) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });

    window.location.hash = tabId;
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      activateTab(btn.dataset.tab);
    });
  });

  // Handle URL Hash on load
  const currentHash = window.location.hash.replace('#', '');
  if (currentHash && document.getElementById(currentHash)) {
    activateTab(currentHash);
  }
}

// Checklist & LocalStorage Persistence
function initChecklists() {
  const checkboxes = document.querySelectorAll('.custom-checkbox');
  const savedState = JSON.parse(localStorage.getItem('cert_checklist_state') || '{}');

  checkboxes.forEach(cb => {
    const itemId = cb.id;
    if (savedState[itemId]) {
      cb.checked = true;
      const parent = cb.closest('.checklist-item');
      if (parent) parent.classList.add('checked');
    }

    cb.addEventListener('change', (e) => {
      const parent = cb.closest('.checklist-item');
      if (e.target.checked) {
        if (parent) parent.classList.add('checked');
        savedState[itemId] = true;
      } else {
        if (parent) parent.classList.remove('checked');
        delete savedState[itemId];
      }
      localStorage.setItem('cert_checklist_state', JSON.stringify(savedState));
      updateGlobalProgress();
    });
  });
}

// Calculate Global Progress Percentage
function updateGlobalProgress() {
  const checkboxes = document.querySelectorAll('.custom-checkbox');
  const total = checkboxes.length;
  let checkedCount = 0;

  checkboxes.forEach(cb => {
    if (cb.checked) checkedCount++;
  });

  const percentage = total > 0 ? Math.round((checkedCount / total) * 100) : 0;

  const progressFill = document.getElementById('global-progress-fill');
  const progressText = document.getElementById('global-progress-text');
  const countText = document.getElementById('global-count-text');

  if (progressFill) progressFill.style.width = `${percentage}%`;
  if (progressText) progressText.innerText = `${percentage}%`;
  if (countText) countText.innerText = `${checkedCount} de ${total} tópicos`;
}

// Accordions for Study Questions
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      item.classList.toggle('active');
      const icon = header.querySelector('.acc-icon');
      if (icon) {
        icon.innerText = item.classList.contains('active') ? '−' : '+';
      }
    });
  });
}

// Real-time Search Filter
function initSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    const items = document.querySelectorAll('.checklist-item, .card, .accordion-item');

    items.forEach(item => {
      const text = item.innerText.toLowerCase();
      if (term === '' || text.includes(term)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

// Reset Progress Functionality
function resetProgress() {
  if (confirm('Tem certeza que deseja zerar o progresso dos checklists?')) {
    localStorage.removeItem('cert_checklist_state');
    const checkboxes = document.querySelectorAll('.custom-checkbox');
    checkboxes.forEach(cb => {
      cb.checked = false;
      const parent = cb.closest('.checklist-item');
      if (parent) parent.classList.remove('checked');
    });
    updateGlobalProgress();
  }
}
