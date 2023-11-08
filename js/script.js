const pokemonNumber = document.querySelector('.pokemon_numero');
const pokemonName = document.querySelector('.pokemon_nome');
const pokemonType = document.querySelector('.pokemon_tipo');
const pokemonImage = document.querySelector('.pokemon_img');
const form = document.querySelector('.form');
const botaoProximo = document.querySelector('.botao_proximo');
const botaoAnterior = document.querySelector('.botao_anterior');
const input = document.querySelector('.input')

let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {
    const APIResponse =  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    const data = await APIResponse.json();
    return data;
   

}
const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = 'Carregando...';
    pokemonType.innerHTML = 'Carregando...';

    
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonType.innerHTML = data.types[0].type.name + (data.types[1] ? ', ' + data.types[1].type.name : '');
        pokemonImage.src = `https:/raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${Number(data.id)}.gif`;

        input.value = '';
        searchPokemon = data.id;
    

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

botaoProximo.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
    
});

botaoAnterior.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
    
});

renderPokemon('1');