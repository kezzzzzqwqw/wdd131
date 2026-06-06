const products = [
  { id: "fc-1888", name: "flux capacitor",    averagerating: 4.5 },
  { id: "fc-2050", name: "power laces",       averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits",     averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer",    averagerating: 5.0 }
];

function populateProductSelect() {
  const select = document.getElementById("product-name");
  if (!select) return;

  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    select.appendChild(option);
  });
}

function setLastModified() {
  const el = document.getElementById("last-modified");
  if (el) el.textContent = "Last Modification: " + document.lastModified;
}

function incrementReviewCount() {
  const el = document.getElementById("review-count");
  if (!el) return; 

  const count = (parseInt(localStorage.getItem("reviewCount") || "0", 10)) + 1;
  localStorage.setItem("reviewCount", count);
  el.textContent = count;
}

document.addEventListener("DOMContentLoaded", () => {
  populateProductSelect();
  setLastModified();
  incrementReviewCount();
});

const today = new Date();

const currentYear = today.getFullYear();

document.getElementById("currentyear").textContent = currentYear;
document.getElementById("lastModified").innerHTML = document.lastModified;