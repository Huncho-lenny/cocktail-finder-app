const API_URL = "./db.json";
const cocktailContainer = document.getElementById('cocktail-container');
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-button');
let cocktailList = [];

window.addEventListener('DOMContentLoaded', loadCocktails);
searchBtn.addEventListener('click', filterCocktails);
searchBar.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') filterCocktails();
});

async function loadCocktails() {
  try {
    cocktailContainer.innerHTML = '<p>Loading drinks...</p>';
    const response = await fetch('db.json');
    const data = await response.json();
    cocktailList = data.cocktails || [];
    cocktailList.length > 0 ? showCocktails(cocktailList) : showMessage('No cocktails found.');
  } catch (err) {
    console.error('Error loading cocktails:', err);
    showMessage('Failed to load cocktails. Please try again.');
  }
}

function showCocktails(cocktails) {
  cocktailContainer.innerHTML = cocktails.length
    ? cocktails.map((drink) => `
      <div class="drink-card">
        <img src="${drink.image}" alt="${drink.name}" class="drink-img">
        <h2>${drink.name}</h2>
        <p>${drink.description || 'A delicious cocktail!'}</p>
        <h3>Ingredients:</h3>
        <ul>${drink.ingredients.map((item) => `<li>${item}</li>`).join('')}</ul>
      </div>
    `).join('')
    : showMessage('No cocktails match your search.');
}

function filterCocktails() {
  const searchText = searchBar.value.toLowerCase().trim();
  const filtered = searchText
    ? cocktailList.filter((drink) => 
        drink.name.toLowerCase().includes(searchText) ||
        drink.ingredients.some((ing) => ing.toLowerCase().includes(searchText))
      )
    : cocktailList;
  showCocktails(filtered);
}

function showMessage(msg) {
  cocktailContainer.innerHTML = `<p class="message">${msg}</p>`;
}