const fetchPokemon = async () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    if (pokeName === "")
        pokeName = "bulbasaur";
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    const tarjeta = document.getElementById("card");
    const spinner = document.getElementById("spinner");
    const conteError = document.getElementById("error");
    tarjeta.classList.add("desaparecer");
    conteError.classList.add("desaparecer");
    spinner.classList.remove("desaparecer");

    const res = await fetch(url);
    if (res.status != "200") {
        console.log(res);
        pokeImage("./pokemon-sad.gif");
        conteError.classList.remove("desaparecer");
        spinner.classList.add("desaparecer");
    } else {
        const data = await res.json();

        tarjeta.classList.remove("desaparecer");
        spinner.classList.add("desaparecer");

        if (data) {
            console.log(data);
            let pokeImg = data.sprites.other.home.front_default;
            pokeImage(pokeImg);
            pokeNumero(data.id);
            pokeNombre(data.name);
            pokeTipo(data.types);
            pokeEstadisticas(data.stats)
            pokeMovi(data.moves);
            console.log(pokeImg);
        }
    }

}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const pokeNumero = (data) => {
    const pokeNum =document.getElementById("numero-poke");
    pokeNum.innerText = "#"+data;
}

const pokeNombre = (data) => {
    const pokeNum =document.getElementById("nombre-poke");
    pokeNum.innerText = data;
}

const pokeTipo = (data) => {
    let tiposHtml = "";
    data.forEach( (type) => {
        tiposHtml += `<div class="tipo"><img src="img/tipos/${type.type.name}.png" alt="${type.type.name}"></div>`
    });
    const tipos = document.getElementById("tipos");
    tipos.innerHTML=tiposHtml;
}

const pokeMovi = (data) => {
    let moviHtml = "";
    data.forEach( (movi) => {
        moviHtml += `<li class="movi">${movi.move.name}</li>`
    });
    const movimientos = document.getElementById("list-movi");
    movimientos.innerHTML=moviHtml;
}

const pokeEstadisticas = (data) => {
    const psStat = document.getElementById("ps-stat");
    psStat.innerText = data[0].base_stat;

    const ataqueStat = document.getElementById("ataque-stat");
    ataqueStat.innerText = data[1].base_stat;

    const defensaStat = document.getElementById("defensa-stat");
    defensaStat.innerText = data[2].base_stat;

    const ataespStat = document.getElementById("ataesp-stat");
    ataespStat.innerText = data[3].base_stat;

    const defespStat = document.getElementById("defesp-stat");
    defespStat.innerText = data[4].base_stat;

    const velocidadStat = document.getElementById("velocidad-stat");
    velocidadStat.innerText = data[5].base_stat;
}

