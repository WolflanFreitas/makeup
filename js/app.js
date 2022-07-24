async function main() {
    const response = await fetch("http://makeup.test/data/products.json");
    const products = await response.json();
    console.log(products);
}

main()