async function main() {
    const response = await fetch("http://makeup.test/data/products.json");
    const products = await response.json();

    let catalogo = document.getElementById('catalog')

    for (let product of products) {
        carregarCatalago(catalogo, productItem(product))
    }

    //Retorna somente as marcas sem valores repetidos
    let brands = [...new Set(products.map((x) => x.brand))]
    //Remover elementos null
    brands = brands.filter(n => n)

    //Retorna somente as marcas sem valores repetidos
    let types = [...new Set(products.map((x) => x.product_type))]
    //Remover elementos null
    types = types.filter(n => n)

    for (let brand of brands) {
        let option = document.createElement('option');
        option.setAttribute('value', brand);
        option.append(brand);
        document.getElementById('filter-brand').appendChild(option);
    }

    for (let type of types) {
        let option = document.createElement('option');
        option.setAttribute('value', type);
        option.append(type);
        document.getElementById('filter-type').appendChild(option);
    }

    let filtros = document.querySelector('.catalog-control');

    //Filtrar pela marca
    filtros.addEventListener('change', () => {

        let filtro_nome = document.getElementById('filter-name').value;
        let filtro_marca = document.getElementById('filter-brand').value;
        let filtro_tipo = document.getElementById('filter-type').value;

        let filter = {};

        if (filtro_nome != '')
            filter.name = filtro_nome
        if (filtro_marca != '')
            filter.brand = filtro_marca
        if (filtro_tipo != '')
            filter.product_type = filtro_tipo

        console.log(filter)

        let products_filtered = products.filter(search, filter)

        let filtro_ordenacao = document.getElementById('sort-type');

        switch (filtro_ordenacao.value) {
            case '1':
                products_filtered.sort((a, b) => {
                    if (b.rating > a.rating)
                        return 1;
                    if (b.rating < a.rating)
                        return -1;
                    return 0;
                })
                break;
            case '2':
                products_filtered.sort((a, b) => {
                    if ((a.price * 5.5) > (b.price * 5.5))
                        return 1;
                    if ((a.price * 5.5) < (b.price * 5.5))
                        return -1;
                    return 0;
                })
                break;
            case '3':
                products_filtered.sort((a, b) => {
                    if ((b.price * 5.5) > (a.price * 5.5))
                        return 1;
                    if ((b.price * 5.5) < (a.price * 5.5))
                        return -1;
                    return 0;
                })
                break;
            case '4':
                products_filtered.sort((a, b) => {
                    if (b.name > a.name)
                        return -1;
                    if (b.name < a.name)
                        return 1;
                    return 0;
                })
                break;
            case '5':
                products_filtered.sort((a, b) => {
                    if (a.name > b.name)
                        return -1;
                    if (a.name < b.name)
                        return 1;
                    return 0;
                })
                break;
        }
        let catalogo = document.getElementById('catalog');
        limpar(catalogo)

        for (let product of products_filtered) {
            carregarCatalago(catalogo, productItem(product))
        }
    })
}

function search(item) {
    return Object.keys(this).every((key) => item[key] === this[key]);
}

main()

function limpar(element) {
    element.innerText = ''
}

function carregarCatalago(element, values) {
    element.append(values);
}


function productItem(product) {
    const div = document.createElement('div');
    div.classList.add('product');
    div.setAttribute('data-name', product.name);
    div.setAttribute('data-brand', product.brand);
    div.setAttribute('data-type', product.product_type);
    div.setAttribute('tabindex', product.id);

    const figure = document.createElement('figure');
    figure.classList.add('product-figure');

    const img = document.createElement('img');
    img.setAttribute('src', product.image_link);
    img.setAttribute('width', 215);
    img.setAttribute('height', 215);
    img.setAttribute('alt', product.name);
    img.setAttribute('onerror', "this.src='http://makeup.test/img/unavailable.png'")
    figure.appendChild(img);

    const section = document.createElement('section');
    section.classList.add('product-description');

    const header = document.createElement('h1');
    header.classList.add('product-name');
    header.append(product.name)

    const divSection = document.createElement('div');
    divSection.classList.add('product-brands');

    const spanSection = document.createElement('span');
    spanSection.classList.add('product-brand');
    spanSection.classList.add('background-brand');
    spanSection.append(product.brand);

    const spanSectionPrice = document.createElement('span');
    spanSectionPrice.classList.add('product-brand');
    spanSectionPrice.classList.add('background-price');
    let preco = (product.price * 5.5).toFixed(2);
    spanSectionPrice.append('R$ ' + preco.replace('.', ','))

    divSection.appendChild(spanSection);
    divSection.appendChild(spanSectionPrice);

    section.appendChild(header);
    section.appendChild(divSection);

    div.appendChild(figure);
    div.appendChild(section);

    let detalhes = document.createElement('div');
    detalhes.innerHTML = loadDetails(product)

    div.appendChild(detalhes)
    return div;
}

function loadDetails(product) {
    let preco = (product.price * 5.5).toFixed(2);
    let details = `<section class="product-details"><div class="details-row">
        <div>Brand</div>
        <div class="details-bar">
            <div class="details-bar-bg" style="width= 250">${product.brand}</div>
        </div>
        </div><div class="details-row">
        <div>Price</div>
        <div class="details-bar">
            <div class="details-bar-bg" style="width= 250">R$ ${preco.replace('.',',') || 0}</div>
        </div>
        </div><div class="details-row">
        <div>Rating</div>
        <div class="details-bar">
            <div class="details-bar-bg" style="width= 250">${product.rating || 0}</div>
        </div>
        </div><div class="details-row">
        <div>Category</div>
        <div class="details-bar">
            <div class="details-bar-bg" style="width= 250">${product.category || ""}</div>
        </div>
        </div><div class="details-row">
        <div>Product_type</div>
        <div class="details-bar">
            <div class="details-bar-bg" style="width= 250">${product.product_type || ""}</div>
        </div>
    </div></section>`;

    return details;
}