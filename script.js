document.addEventListener("DOMContentLoaded", function () {
  const linksContainer = document.getElementById("links-container");
  const addLinkBtn = document.getElementById("add-link");
  const linkNameInput = document.getElementById("link-name");
  const linkUrlInput = document.getElementById("link-url");

  // Load existing links
  loadLinks();

  addLinkBtn.addEventListener("click", function () {
    const name = linkNameInput.value.trim();
    const url = linkUrlInput.value.trim();

    if (name && url) {
      addLink(name, url);
      $("#addLinkModal").modal("hide");
      linkNameInput.value = "";
      linkUrlInput.value = "";
    }
  });

  function addLink(name, url) {
    const linkCard = document.createElement("div");
    linkCard.className = "link-card";
    linkCard.innerHTML = `
        <div class="card">
            <button class="delete-link text-secondary">
                <i class="fas fa-times"></i>
            </button>
            <div class="card-body">
                <a href="${url}" target="_blank" class="text-decoration-none">
                    <h6 class="card-title mb-0">${name}</h6>
                </a>
            </div>
        </div>
    `;

    // Insert before the add button
    linksContainer.insertBefore(linkCard, linksContainer.lastElementChild);

    // Add delete functionality
    const deleteBtn = linkCard.querySelector(".delete-link");
    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      linkCard.remove();
      saveLinks();
    });

    saveLinks();
  }

  function saveLinks() {
    const links = [];
    document
      .querySelectorAll(".link-card:not(.add-link-card)")
      .forEach((card) => {
        const title = card.querySelector(".card-title").textContent;
        const url = card.querySelector("a").href;
        links.push({ name: title, url: url });
      });
    localStorage.setItem("quickLinks", JSON.stringify(links));
  }

  function loadLinks() {
    const links = JSON.parse(localStorage.getItem("quickLinks") || "[]");

    // Clear container
    linksContainer.innerHTML = "";

    // Add saved links
    links.forEach((link) => addLink(link.name, link.url));

    // Re-add the "Add Link" button
    const addButton = `
        <div class="link-card add-link-card" data-toggle="modal" data-target="#addLinkModal">
            <div class="card h-100">
                <div class="card-body d-flex align-items-center justify-content-center">
                    <i class="fas fa-plus"></i>
                </div>
            </div>
        </div>
    `;
    linksContainer.insertAdjacentHTML("beforeend", addButton);
  }
});
