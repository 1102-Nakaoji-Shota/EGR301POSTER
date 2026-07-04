const posterButton = document.querySelector("#poster-button");
const referencesList = document.querySelector("#references-list");
const lightbox = document.querySelector("#image-lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");

let lastFocusedElement = null;

async function loadReferences() {
  try {
    const response = await fetch("data/references.json");

    if (!response.ok) {
      throw new Error("Unable to load references.");
    }

    const references = await response.json();
    renderReferences(references);
  } catch (error) {
    referencesList.innerHTML = '<p class="loading-message">References could not be loaded. Check data/references.json.</p>';
  }
}

posterButton.addEventListener("click", () => {
  openLightbox(posterButton.dataset.image, posterButton.dataset.title, posterButton.dataset.alt);
});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});

function openLightbox(image, title, alt) {
  lastFocusedElement = document.activeElement;
  lightboxImage.src = image;
  lightboxImage.alt = alt || title;
  lightboxCaption.textContent = title || "";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  lightboxCaption.textContent = "";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function renderReferences(references) {
  if (!Array.isArray(references) || references.length === 0) {
    referencesList.innerHTML = '<p class="loading-message">No references have been added yet.</p>';
    return;
  }

  const referenceItems = references
    .map((reference) => {
      const title = escapeHtml(reference.title || "Untitled Reference");
      const source = escapeHtml(reference.source || "Source pending");
      const link = escapeHtml(reference.link || "#");

      return `
        <li>
          <p class="reference-title">${title}</p>
          <p class="reference-source">${source}</p>
          <a href="${link}" target="_blank" rel="noopener noreferrer">View Source</a>
        </li>
      `;
    })
    .join("");

  referencesList.innerHTML = `<ol class="reference-list">${referenceItems}</ol>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

loadReferences();
