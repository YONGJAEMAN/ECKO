document.addEventListener("DOMContentLoaded", function () {
  const linkButton = document.getElementById("linkShareButton");

  if (linkButton) {
    linkButton.addEventListener("click", function () {
      const currentUrl = window.location.href;

      navigator.clipboard.writeText(currentUrl)
        .then(() => {
          alert("The link has been copied to the clipboard:\n" + currentUrl);
        })
        .catch(err => {
          console.error("Failed to copy the link:", err);
          alert("Failed to copy the link.");
        });
    });
  }
});
