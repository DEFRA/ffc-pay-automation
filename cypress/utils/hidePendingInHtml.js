const fs = require('fs');

function hidePendingInHtml(htmlFile) {
  let html = fs.readFileSync(htmlFile, 'utf8');

  const script = `
<script>
document.addEventListener("DOMContentLoaded", function () {

  const banner = document.createElement("div");
  banner.textContent = "Pending tests hidden by default";
  banner.style.cssText = "background:#e6ffe6;color:#155724;padding:8px;margin:10px 0;font-size:14px;";
  document.body.prepend(banner);

  function hidePending(root) {
    const rows = root.querySelectorAll('[class*="test--pending---"]');
    rows.forEach(row => row.style.display = "none");
    return rows;
  }

  let pendingRows = new Set();

  // Observe DOM changes
  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          const found = hidePending(node);
          found.forEach(r => pendingRows.add(r));
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Toggle button
  const btn = document.createElement("button");
  btn.textContent = "Show/Hide Pending Tests";
  btn.style.cssText = "margin:10px;padding:6px 12px;cursor:pointer;";
  btn.onclick = () => {
    pendingRows.forEach(row => {
      row.style.display = row.style.display === "none" ? "" : "none";
    });
  };

  document.body.prepend(btn);
});
</script>
`;

  html = html.replace(/<\/body>/i, script + '\n</body>');
  fs.writeFileSync(htmlFile, html, 'utf8');
  console.log('✔ Pending tests hidden using MutationObserver.');
}

hidePendingInHtml(process.argv[2]);