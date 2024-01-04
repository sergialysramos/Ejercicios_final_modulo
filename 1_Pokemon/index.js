const initChartBar = (labels, data) => {
    const ctx = document.getElementById('myChart');
    const label = 'Stat';

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    backgroundColor: "rgb(146, 185, 146)",
                    label,
                    data,
                },
            ],
        },
    });
};


const searchButton = document.getElementById('searcher')
const randomButton = document.getElementById('random')
const pokemonName = document.getElementById('namePokemon')
const pokemonImage = document.getElementById('imagePokemon')
let chart;


searchButton.addEventListener('click', () => {
    const pokeInput = document.getElementById('pokemon')
    const pokeNumber = pokeInput.value;

    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeNumber}`).then(({ data }) => {

        if (chart) {
            chart.destroy();
        }
        const namePokeApi = data.name;
        pokemonImage.src = data.sprites.other.dream_world.front_default
        pokemonName.textContent = namePokeApi
        const pokemonEstadisticas = {};
        data.stats.forEach((element) => {
            const baseStats = element.base_stat
            const statName = element.stat.name
            pokemonEstadisticas[statName] = baseStats
        })
        const labels = Object.keys(pokemonEstadisticas)
        const dataValues = Object.values(pokemonEstadisticas)
        initChartBar(labels, dataValues);
    }).catch((error) => {
        alert("No se ha encontrado el Pokemon");
    })
})

randomButton.addEventListener('click', () => {
    const randomNumberPoke = Math.floor(Math.random() * 1300)
    console.log(randomNumberPoke)

    axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNumberPoke}`).then(({ data }) => {

        if (chart) {
            chart.destroy();
        }
        const namePokeApi = data.name;
        pokemonImage.src = data.sprites.other.dream_world.front_default
        pokemonName.textContent = namePokeApi
        const pokemonEstadisticas = {};
        data.stats.forEach((element) => {
            const baseStats = element.base_stat
            const statName = element.stat.name
            pokemonEstadisticas[statName] = baseStats
        })
        const labels = Object.keys(pokemonEstadisticas)
        const dataValues = Object.values(pokemonEstadisticas)
        initChartBar(labels, dataValues);
    }).catch((error) => {
        alert("No se ha encontrado el Pokemon");
    })
})


