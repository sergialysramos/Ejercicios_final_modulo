const initCharLinea = () => {
    const ctx = document.getElementById('myChart');
    const CocktailYear = {};
    cocktails.forEach((cocktail) => {
        if (cocktail.dateModified) {
            const year = new Date(cocktail.dateModified).getFullYear();
            if (!CocktailYear[year]) {
                CocktailYear[year] = 1;
            } else {
                CocktailYear[year]++;
            }
        }
    })

    const labels = Object.keys(CocktailYear);
    const data = Object.values(CocktailYear);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {   
                    label: "Cocktails",
                    data: data,
                },
            ],
        },
    });
}
initCharLinea()

const initChartPie = () => {
    const ctx = document.getElementById('myChart2');
    const arrayIgredients = ['gin', 'vodka', 'tequila', 'rum', 'whiskey'];
    const ingredientsQty = {
        gin: 0,
        vodka: 0,
        tequila: 0,
        rum: 0,
        whiskey: 0
    };
    cocktails.forEach(cocktail => {
        for (let i = 1; i <= 15; i++) {
            const ingredientKey = `strIngredient${i}`;

            if (cocktail[ingredientKey] && ingredientsQty[cocktail[ingredientKey].toLowerCase()] !== undefined) {
                ingredientsQty[cocktail[ingredientKey].toLowerCase()] += 1;
            }
        }
    });
    const labels = Object.keys(ingredientsQty);
    const data = Object.values(ingredientsQty);
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [
                {   
                    label: "Ingredients",
                    data: data,
                    backgroundColor: [ 'rgb(96, 179, 182)', 'rgb(219, 155, 182)', 'rgb(160, 155, 219)','rgb(199, 194, 121)', 'rgb(93, 85, 211)']
                },
            ],
        },
    });

}
initChartPie()
