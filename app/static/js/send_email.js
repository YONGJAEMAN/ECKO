document.addEventListener("DOMContentLoaded", function () {
  const emailButton = document.getElementById("emailShareButton");

  if (emailButton) {
    emailButton.addEventListener("click", function () {
      const recipient = prompt("Enter the recipient's email address:");
      if (!recipient || !recipient.includes("@")) {
        alert("Please enter a valid email address.");
        return;
      }

      const subject = encodeURIComponent("Shared Content");
      const body = encodeURIComponent("Here is the content I wanted to share:\n\n" + window.location.href);

      const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
    });
  }
});
