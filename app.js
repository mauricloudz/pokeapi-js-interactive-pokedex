console.log('inicio')

$(document).ready(function() {
    console.log('traer pokemones');

    const urlPokemons = 'https://pokeapi.co/api/v2/pokemon/';
    console.log('URL => ' + urlPokemons);

    getPokemons(urlPokemons);

    $("#getMorePokemons").click(function() {
        const urlNext = $(this).attr('data-next');
        getPokemons(urlNext);
    });    
});

const getPhoto = (url, name) => {
    $.ajax({
        url: url,
        method: 'GET',
        success: function (response) {
            console.log('data pokemon', response);
            console.log('foto pokemon => ' + response.sprites.other.dream_world.front_default);
            $(`#img_${name}`).attr('src', response.sprites.other.dream_world.front_default);
        },
        error: function (error) {
            console.log(error);
        },
    });
};

const getPokemons = (url) => {
    console.log('obteniendo pokemones desde ' + url);

    $.ajax({
        url: url,
        method: 'GET',
        success: function (response) {
            const pokemons = response.results;
            const urlMorePokemons = response.next;

            $("#getMorePokemons").attr('data-next', urlMorePokemons);
            
            pokemons.forEach(function (pokemon) {
                showPokemon(pokemon);
            });
            $(".btnGetDataPokemon").click(function() {
                const urlPokemon = $(this).attr('data-url-pokemon');
                getPokemonData(urlPokemon);
            });
        },
        error: function (error) {
            console.log('error');
        },
    });
};

const getPokemonData = (url) => {
    console.log('obteniendo datos de ' + url);

    $.ajax({
        url: url,
        method: 'GET',
        success: function (response) {
            $('#modalPokemonLabel').text(response.name);
            $('#pokemonType').text('');
            $('#pokemonGeneration').text('');
            $('#pokemonAbilities').text('');
            $('#pokemonMoves').text('');

            response.types.forEach(function (type) {
                $('#pokemonType').append(`<li class="">${type.type.name}</li>`);
            });

            for(let i = 0; i < 1; i++) {
                $('#pokemonGeneration').append(`<li class="">${response.game_indices[i].version.name}</li>`);
            };

            response.abilities.forEach(function (ability) {
                $('#pokemonAbilities').append(`<li class="">${ability.ability.name}</li>`);
            });

            for(let i = 0; i < 5; i++) {
                $('#pokemonMoves').append(`<li class="">${response.moves[i].move.name}</li>`);
            };

            $('#modalPokemon').modal('show');
            
        },
        error: function (error) {
            console.log('error');
        },
    });
        
}

const showPokemon = (pokemon) => {
    $('#pokemon').append(`
    <div class="card col-3">
        <div class="card-body">
            <h5 class="card-title">${pokemon.name}</h5>
            <img src="" id="img_${pokemon.name}" class="w-100">
            <button class="btn btn-primary btnGetDataPokemon" data-url-pokemon="${pokemon.url}">Quiero saber mas de este pokemon!</button>     
        </div>
    </div>
    `);
    getPhoto(pokemon.url, pokemon.name);
}

$('#pokedex').css('textTransform', 'capitalize');