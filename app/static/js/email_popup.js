document.addEventListener("DOMContentLoaded", function () {
  const popup = document.querySelector('.email-popup-overlay');
  const openBtn = document.getElementById('emailShareButton');
  const cancelBtn = document.querySelector('.cancel-btn');

  if (popup && openBtn && cancelBtn) {
    openBtn.addEventListener('click', () => {
      popup.style.display = 'flex';
    });

    cancelBtn.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  } else {
    console.warn("팝업 요소 중 하나라도 찾지 못했습니다.");
  }
});
