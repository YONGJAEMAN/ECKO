document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("vul-form");
  const spinner = document.getElementById("loading-spinner");
  const status = document.getElementById("status");
  const resultDisplay = document.getElementById("result_display");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (spinner) spinner.style.display = "flex";
      if (status) status.textContent = "Starting vulnerability scan...";

      fetch("/scan_sqli", {
        method: "POST",
        body: new FormData(form)
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            resultDisplay.innerHTML = `<div class="error">${data.error}</div>`;
            return;
          }

          const res = data.results;
          let html = `
            <div class="centered">
              <h2>🔍 Scan Results</h2>
              <p class="scaned_url_text">URL: ${res.url}</p>
            </div>
            <div id="report-content" class="vul-results-left">
              <h3>🧬 SQL Injection</h3>
              <p>Parameters Tested: ${res.sqli_results.param_count}</p>
          `;

          if (res.sqli_results.vulnerable_params.length > 0) {
            html += `<p class="warning-text">⚠️ SQLi vulnerabilities detected!</p><div class="vulnerable-box">`;
            res.sqli_results.vulnerable_params.forEach((v, i, arr) => {
              html += `
                <p><strong>Parameter:</strong> ${v.name}</p>
                <p><strong>Payload used:</strong> ${v.payload}</p>
                ${i !== arr.length - 1 ? '<hr>' : ''}
              `;
            });
            html += `</div>`;
          } else {
            html += `<p class="safe-text">✅ No SQLi vulnerabilities found.</p>`;
          }

          html += `
            <h3>🧪 Cross-Site Scripting (XSS)</h3>
            <p>Forms Detected: ${res.xss_results.form_count}</p>
          `;

          if (res.xss_results.vulnerable_forms.length > 0) {
            html += `<p class="warning-text">⚠️ XSS vulnerabilities detected!</p><div class="vulnerable-box">`;
            res.xss_results.vulnerable_forms.forEach((f, i, arr) => {
              html += `
                <p><strong>Form Action:</strong> ${f.action}</p>
                <p><strong>Method:</strong> ${f.details.method}</p>
                ${i !== arr.length - 1 ? '<hr>' : ''}
              `;
            });
            html += `</div>`;
          } else {
            html += `<p class="safe-text">✅ No XSS vulnerabilities found.</p>`;
          }

          html += `</div>`; // close report-content

          resultDisplay.innerHTML = html;
        })
        .catch(err => {
          resultDisplay.innerHTML = `<div class="error">❌ Scan failed: ${err.message}</div>`;
        })
        .finally(() => {
          if (spinner) spinner.style.display = "none";
        });
    });
  }

  // 📄 Export to PDF
  const pdfBtn = document.getElementById("btn-export-pdf");
  if (pdfBtn) {
    pdfBtn.addEventListener("click", () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      const content = document.getElementById("report-content")?.innerText || "No results available.";
      const lines = doc.splitTextToSize(content, 180);
      doc.text(lines, 10, 10);
      doc.save("scan_results.pdf");
    });
  }

  // 📊 Export to CSV
  const csvBtn = document.getElementById("btn-export-csv");
  if (csvBtn) {
    csvBtn.addEventListener("click", () => {
      const content = document.getElementById("report-content")?.innerText || "";
      const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "scan_results.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // ✉️ Share via Email
  const emailBtn = document.getElementById("btn-share-email");
  if (emailBtn) {
    emailBtn.addEventListener("click", () => {
      const body = encodeURIComponent(document.getElementById("report-content")?.innerText || "No results");
      window.location.href = `mailto:?subject=Vulnerability Scan Report&body=${body}`;
    });
  }

  // 🔗 Share via Link
  const linkBtn = document.getElementById("btn-share-link");
  if (linkBtn) {
    linkBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert("🔗 Page URL copied to clipboard!"))
        .catch(() => alert("❌ Failed to copy link."));
    });
  }
});
