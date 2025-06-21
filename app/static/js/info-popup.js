document.addEventListener('DOMContentLoaded', () => {
  const infoModal = document.getElementById('info-modal');
  const titleEl = document.getElementById('info-modal-title');
  const contentEl = document.getElementById('info-modal-content');
  const closeBtn = document.getElementById('close-info-modal');

  document.querySelectorAll('.open-info-popup').forEach(button => {
    button.addEventListener('click', () => {
      const title = button.getAttribute('data-title');
      const content = button.getAttribute('data-content');
      titleEl.textContent = title;
      contentEl.textContent = content;
      infoModal.style.display = 'block';
    });
  });

  closeBtn.addEventListener('click', () => {
    infoModal.style.display = 'none';
  });

  window.addEventListener('click', event => {
    if (event.target === infoModal) {
      infoModal.style.display = 'none';
    }
  });
});
