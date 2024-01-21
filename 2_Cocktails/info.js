
const cocktailList = document.getElementById('cocktailList');
const cocktailDetails = document.getElementById('cocktailDetails');
const cocktailName = document.getElementById('cocktailName');
const cocktailImage = document.getElementById('cocktailImage');
const cocktailIngredients = document.getElementById('cocktailIngredients');
const cocktailInstructions = document.getElementById('cocktailInstructions');
const cocktailGlass = document.getElementById('cocktailGlass');
const cocktailAlcoholic = document.getElementById('cocktailAlcoholic');
const cocktailSelect = document.getElementById('cocktailSelect')
const cocktailInfo = document.getElementById('info')

const orderCocktails = cocktails.sort((a, b) => {
    const yearA = new Date(a.dateModified);
    const yearB = new Date(b.dateModified);
    if (yearA === null && yearB === null) {
        return 0;
    } else if (yearA === null) {
        return 1;
    } else if (yearB === null) {
        return -1;
    }
    return yearB - yearA;
})

const lastCocktails = orderCocktails.filter((cocktail, index) => index < 20)


lastCocktails.forEach(cocktail => {
    const listItem = document.createElement('li');
    listItem.textContent = cocktail.strDrink;
    listItem.addEventListener('click', () => {
        showCocktailDetails(cocktail)
    });
    cocktailList.appendChild(listItem);


    const option = document.createElement('option');
    option.value = cocktail.strDrink;
    option.textContent = cocktail.strDrink;
    cocktailSelect.appendChild(option);
});

function showSelectedCocktail() {
    const selectedCocktailName = cocktailSelect.value;
    const selectedCocktail = cocktails.find(cocktail => cocktail.strDrink === selectedCocktailName);

    if (selectedCocktail) {
        showCocktailDetails(selectedCocktail);
    }
}

function showCocktailDetails(cocktail) {
    cocktailName.textContent = cocktail.strDrink;
    cocktailImage.src = cocktail.strDrinkThumb;
    cocktailIngredients.innerHTML = generateIngredientsList(cocktail);
    cocktailInstructions.textContent = cocktail.strInstructions;
    cocktailGlass.textContent = cocktail.strGlass;
    cocktailAlcoholic.textContent = cocktail.strAlcoholic;

    cocktailInfo.classList.add('show')

    cocktailSelect.value = cocktail.strDrink;
}

function generateIngredientsList(cocktail) {
    const ingredientsList = [];
    for (let i = 1; i <= 15; i++) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;

        if (cocktail[ingredientKey]) {
            const ingredient = cocktail[ingredientKey];
            const measure = cocktail[measureKey] || '';
            ingredientsList.push(`${measure} ${ingredient}`);
        }
    }
    return ingredientsList.join('<br>');
}