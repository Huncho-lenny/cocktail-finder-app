const API_URL = "./db.json";
const container = document.querySelector("#cocktail-container");

async function getCocktails() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Unable to fetch cocktail data.");
    }
    const data = await response.json();
    renderCocktails(data.cocktails);
  } catch (error) {
    console.error("Error:", error.message);
    container.innerHTML = `<p class="error-message">Failed to load cocktails. Please try again later.</p>`;
  }
}

function renderCocktails(cocktails) {
  container.innerHTML = "";
  cocktails.forEach((drink) => {
    const card = document.createElement("div");
    card.className = "cocktail-card";
    card.innerHTML = `
      <img src="${drink.image}" alt="${drink.name}" class="cocktail-image">
      <h2 class="cocktail-title">${drink.name}</h2>
      <p class="cocktail-description">${drink.description}</p>
      <h3>Ingredients</h3>
      <ul class="ingredient-list">
        ${drink.ingredients.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  getCocktails();
});
