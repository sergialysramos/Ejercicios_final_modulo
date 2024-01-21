const initChartBar = (nombresJugadores, vidasJugadores) => {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nombresJugadores,
            datasets: [
                {
                    backgroundColor: "rgb(162, 212, 162)",
                    label: "Vidas de los Jugadores",
                    data: vidasJugadores,
                },
            ],
        },
    });
};

class Jugador {
    constructor(nombre, vidas, damagePorBola) {
        this.nombre = nombre;
        this.vidas = vidas;
        this.damagePorBola = damagePorBola;
    }

    lanzarBola() {
        return this.damagePorBola;
    }
}

class Guerrero extends Jugador {
    constructor(nombre) {
        super(nombre, 3, 1);
    }
}

class Mago extends Jugador {
    constructor(nombre) {
        super(nombre, 2, 2);
    }
}

class Equipo {
    constructor() {
        this.jugadores = [];
    }

    agregarJugador(jugador) {
        this.jugadores.push(jugador);
    }

    haPerdido() {
        return this.jugadores.every((jugador) => jugador.vidas === 0);
    }
}

class Guerra {
    constructor(equipo1, equipo2) {
        this.equipo1 = equipo1;
        this.equipo2 = equipo2;
    }

    seleccionarJugadorAleatorio(equipo) {
        const jugadoresVivos = equipo.jugadores.filter((jugador) => jugador.vidas > 0);
        return jugadoresVivos[Math.floor(Math.random() * jugadoresVivos.length)];
    }

    simular() {
        const intervalo = setInterval(() => {
            if (this.finalizada) {
                console.log('¡La guerra ha terminado!');
                clearInterval(intervalo);
                return;
            }

            const atacante1 = this.seleccionarJugadorAleatorio(this.equipo1);
            const receptor1 = this.seleccionarJugadorAleatorio(this.equipo2);
            const atacante2 = this.seleccionarJugadorAleatorio(this.equipo2);
            const receptor2 = this.seleccionarJugadorAleatorio(this.equipo1);

            if (atacante1 && receptor1) {
                const danio = atacante1.lanzarBola();
                receptor1.vidas = Math.max(0, receptor1.vidas - danio);

                console.log(`${atacante1.nombre} lanza una bola a ${receptor1.nombre}.`);
                console.log(`Vidas restantes de ${receptor1.nombre}: ${receptor1.vidas}\n`);

                if (this.equipo2.haPerdido()) {
                    console.log('¡El equipo 2 ha perdido!');
                    this.finalizada = true;
                    clearInterval(intervalo);
                    return;
                }
            }

            if (atacante2 && receptor2) {
                const damage = atacante2.lanzarBola();
                receptor2.vidas = Math.max(0, receptor2.vidas - damage);

                console.log(`${atacante2.nombre} lanza una bola a ${receptor2.nombre}.`);
                console.log(`Vidas restantes de ${receptor2.nombre}: ${receptor2.vidas}\n`);

                if (this.equipo1.haPerdido()) {
                    console.log('¡El equipo 1 ha perdido!');
                    this.finalizada = true;
                    clearInterval(intervalo);
                }
            }
        }, Math.floor(Math.random() * 3000) + 1000);
    }
}

const equipo1 = new Equipo();
const equipo2 = new Equipo();

equipo1.agregarJugador(new Guerrero('Goku'));
equipo1.agregarJugador(new Mago('Gandalf'));

equipo2.agregarJugador(new Guerrero('Superman'));
equipo2.agregarJugador(new Mago('Harry Potter'));


const guerra = new Guerra(equipo1, equipo2);
guerra.simular();

const nombresJugadores = [];
const vidasJugadores = [];

equipo1.jugadores.forEach((jugador) => {
    nombresJugadores.push(jugador.nombre);
    vidasJugadores.push(jugador.vidas);
});

equipo2.jugadores.forEach((jugador) => {
    nombresJugadores.push(jugador.nombre);
    vidasJugadores.push(jugador.vidas);
});
initChartBar(nombresJugadores, vidasJugadores);

console.log("Equipo 1:", guerra.equipo1);

