'use strict';

var store = [
    { name: "Fruits", description: "Okay, so fruits aren't vegetables. Everyone gets confused sometimes.", count: 0, image: "fruits.jpeg" },
    { name: "Greens", description: "Make a salad bases or add a leafy crunch to sandwiches.", count: 0, image: "greens.jpeg" },
    { name: "Roots & Stems", description: "Sweet and/or savoury, roots add a substance to a dish.", count: 0, image: "radish.jpeg" },
    { name: "Sprouts & Veggie", description: "Garlic, chives, dill... add some depth to dishes.", count: 0, image: "radish.jpeg" },
    { name: "Hummus", description: "Delicious spread to supplement any dishes.", count: 0, image: "hummus.jpeg" },
    { name: "Wines", description: "Enjoy our fine selection of wines produced with our grapes.", count: 0, image: "wine.jpeg" },
    { name: "Juices", description: "Not all fruits come in solid form. Get your daily portion of fruits thanks to our delicious juices.", count: 0, image: "juice.jpeg" },
    { name: "Mixed", description: "Why choose when you can have both?", count: 0, image: "fruits_and_vegetables.jpeg" },
];

var total = 0;

function generateItemElement(item, itemIndex) {
    return `
        <div class="col-md-5 my-2 border-item product-item" data-item-index="${itemIndex}">
            <div class="row p-1">
                <div class="col-3">
                    <img src="images/${item.image}" class="product-thumbnail"/>
                </div>
                <div class="col-9">
                    <div class="list-item-title">${item.name}</div>
                    <div class="list-item-description">${item.description}</div>
                    <div>
                        <span class="product-item-remove"><i class="fas fa-minus-circle"></i></span>
                        <span>${item.count}</span>
                        <span class="product-item-add"><i class="fas fa-plus-circle"></i></span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateProductList(productStore) {
    const items = productStore.map((product, index) => generateItemElement(product, index));
    return items.join("");
}

function renderProductStore() {
    const productStoreHTML = generateProductList(store);
    $('#productList').html(productStoreHTML);
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.product-item')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function updateProgressBar() {
    var percentage = Math.round(((total / 6) * 100));
    document.getElementById("productProgressBar").style.width = percentage.toString() + "%";
    document.getElementById("productProgressBar").innerHTML = `(${total}/6)`;
    document.getElementById("productProgressBar").setAttribute('aria-valuenow',percentage);
}

function updateMessage(text, display) {
    document.getElementById('message').innerHTML = text;
    document.getElementById('message').style.display = display;
}

function handleRemoveProductfromCartClicked() {
    $('#productList').on('click', '.product-item-remove', event => {
        const itemIndex = getItemIndexFromElement(event.currentTarget);
        var product = store[itemIndex]
        if (total > 0 && product.count > 0) {
            store[itemIndex].count = product.count - 1;
            total = total - 1;

            updateProgressBar();
            updateMessage("", "none");
            renderProductStore();
        }       
    });
}

function handleAddProducttoCartClicked() {
    $('#productList').on('click', '.product-item-add', event => {
        const itemIndex = getItemIndexFromElement(event.currentTarget);
        var product = store[itemIndex]
        if (total < 6) {
            store[itemIndex].count = product.count + 1;
            total = total + 1;

            updateProgressBar();
            updateMessage("", "none");
            renderProductStore();
        } else {
            updateMessage("We limit the selection to 6 items.", "inline")
        }    
    });
}

function handleProductList() {
    renderProductStore();
    handleRemoveProductfromCartClicked();
    handleAddProducttoCartClicked();
}

$(handleProductList);