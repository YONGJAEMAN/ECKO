// tutorial-popup.js
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('video-modal');
  const iframe = document.getElementById('youtube-frame');
  const closeBtn = document.getElementById('close-video-modal');

  document.querySelectorAll('.start-tutorial-btn').forEach(button => {
    button.addEventListener('click', () => {
      const videoId = button.getAttribute('data-video-id'); // now: "Gy-aPBb0djk?start=600"
      iframe.src = `https://www.youtube.com/embed/${videoId}&autoplay=1`;
      modal.style.display = 'block';
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    iframe.src = ''; // stop the video
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
      iframe.src = '';
    }
  });
});
