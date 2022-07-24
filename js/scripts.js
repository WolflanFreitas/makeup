async function teste() {
    const products = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu', {
        method: 'GET'
    });
    const resp = await products.json()
    console.log(resp)
}