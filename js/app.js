async function main() {
    const response = await fetch("http://makeup.test/data/products.json");
    const products = await response.json();

    for (let product of products) {
        document.getElementById('catalog').append(productItem(product))
    }
}

main()

function alternativeImg() {
    this.onerror = null;
    this.src = '../img/unavailable.png';
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
    spanSectionPrice.append(product.price)

    divSection.appendChild(spanSection);
    divSection.appendChild(spanSectionPrice);

    section.appendChild(header);
    section.appendChild(divSection);

    div.appendChild(figure);
    div.appendChild(section);
    return div;
    const item = `<div class="product" data-name="NYX Mosaic Powder Blush Paradise" data-brand="nyx" data-type="bronzer" tabindex="508">
    <figure class="product-figure">
      <img src="https://d3t32hsnjxo7q6.cloudfront.net/i/deedb7bd74bda43f062a09aab2ee1ec8_ra,w158,h184_pa,w158,h184.png" width="215" height="215" alt="NYX Mosaic Powder Blush Paradise" onerror="javascript:this.src='img/unavailable.png'">
    </figure>
    <section class="product-description">
      <h1 class="product-name">NYX Mosaic Powder Blush Paradise</h1>
      <div class="product-brands"><span class="product-brand background-brand">Nyx</span>
  <span class="product-brand background-price">R$ 57.70</span></div>
    </section>
    // CARREGAR OS DETALHES
  </div>`;
}