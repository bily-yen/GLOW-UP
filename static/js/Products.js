const product = [
    {
        id: 0,
        image: 'static/image/gg-1.jpg',
        title: 'Z Flip Foldable Mobile',
        price: 120,
    },
    {
        id: 1,
        image: 'static/image/hh-2.jpg',
        title: 'Air Pods Pro',
        price: 60,
    },
    {
        id: 2,
        image: 'static/image/hh-2.jpg',
        title: '0D DSLR Camera',
        price: 230,
    },
    {
        id: 3,
        image: 'static/image/hh-2.jpg',
        title: '250D mera',
        price: 230,
    },
    {
        id: 4,
        image: 'static/image/hh-2.jpg',
        title: '25 Camera',
        price: 230,
    },
    {
        id: 5,
        image: 'static/image/hh-2.jpg',
        title: '25a',
        price: 230,
    },
    {
        id: 6,
        image: 'static/image/hh-2.jpg',
        title: '2Camera',
        price: 230,
    },
    {
        id: 7,
        image: 'static/image/hh-2.jpg',
        title: '2',
        price: 230,
    },
    {
        id: 8,
        image: 'static/image/hh-2.jpg',
        title: 'Head Phones',
        price: 100,
    }
];

const kitchenProducts = [
    {
        id: 9,
        image: 'static/image/kitchen-1.jpg',
        title: 'Blender',
        price: 50,
    },
    {
        id: 10,
        image: 'static/image/kitchen-2.jpg',
        title: 'Toaster',
        price: 30,
    },
    {
        id: 11,
        image: 'static/image/kitchen-3.jpg',
        title: 'Coffee Maker',
        price: 40,
    }
];

function sanitizeInput(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function displayProducts(products, containerId) {
    document.getElementById(containerId).innerHTML = products.map((item, index) => {
        const { id, image, title, price } = item;
        const sanitizedTitle = sanitizeInput(title);
        const sanitizedImage = sanitizeInput(image);
        return `
            <div class='boxer'>
                <div class='img-boxer'>
                    <img class='images' src="${sanitizedImage}"></img>
                </div>
                <div class='bottom'>
                    <p>${sanitizedTitle}</p>
                    <h2>$ ${price}.00</h2>
                    <div>
                        <input type="number" id="quantity${index}" min="1" value="1">
                        <label for="quantity${index}">Add Quantity</label>
                        <button onclick='addtocart(${index})'>Add to cart</button>
                    </div>
                </div>
            </div>`;
    }).join('');
}

// Display products in the main section
displayProducts(product, 'root');

// Display kitchen products in the kitchen section
displayProducts(kitchenProducts, 'kitchenRoot');

const cart = [];

function addtocart(index) {
    const quantity = parseInt(document.getElementById(`quantity${index}`).value);

    if (isNaN(quantity) || quantity <= 0) {
        alert("Please specify a valid quantity for the product!");
        return; 
    }

    let selectedItem = {};
    if (index < product.length + kitchenProducts.length) {
        selectedItem = { ...kitchenProducts[index], quantity };
    } else if (index < product.length + kitchenProducts.length) {
        selectedItem = { ...product[index], quantity };
    } else {
        alert("Invalid product index!");
        return;
    }

    const alreadyInCart = cart.some(item => item.id === selectedItem.id);

    if (alreadyInCart && quantity > 0) {
        alert("This product is already in your cart!");
    } else {
        if (quantity > 0) {
            cart.push(selectedItem);
            displaycart();
            const productName = selectedItem.title;
            alert(`"${productName}" (Quantity: ${quantity}) has been added to your cart!`);
        }
    }
}

function delElement(index) {
    cart.splice(index, 1);
    displaycart();
}

function payTotal() {
    const totalAmount = document.getElementById("total").innerText;
    const amount = parseFloat(totalAmount.replace("$ ", ""));
    alert(`Please proceed to pay $${amount.toFixed(2)}`);
}

function displaycart() {
    let total = 0;
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length === 0) {
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "$ " + total.toFixed(2);
    } else {
        document.getElementById("cartItem").innerHTML = cart.map((item, index) => {
            const { image, title, price, quantity } = item;
            const subtotal = price * quantity;
            total += subtotal;
            document.getElementById("total").innerHTML = "$ " + total.toFixed(2);
            return `
                <div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src=${sanitizeInput(image)}>
                    </div>
                    <p style='font-size:12px;'>${sanitizeInput(title)} - Quantity: ${quantity}</p>
                    <h2 style='font-size: 15px;'>$ ${subtotal.toFixed(2)}</h2>
                    <i class='fa-solid fa-trash' onclick='delElement(${index})'></i>
                </div>`;
        }).join('');
        document.getElementById("payBtn").disabled = cart.length === 0;
    }
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

function searchProducts() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredProducts = product.filter(item => item.title.toLowerCase().includes(searchTerm));
    document.getElementById('root').innerHTML = filteredProducts.map((item, index) => {
        const { id, image, title, price } = item;
        const sanitizedTitle = sanitizeInput(title);
        const sanitizedImage = sanitizeInput(image);
        return `
            <div class='boxer'>
                <div class='img-boxer'>
                    <img class='images' src="${sanitizedImage}"></img>
                </div>
                <div class='bottom'>
                    <p>${sanitizedTitle}</p>
                    <h2>$ ${price}.00</h2>
                    <div>
                        <input type="number" id="quantity${index}" min="1" value="1">
                        <label for="quantity${index}">Add Quantity</label>
                        <button onclick='addtocart(${index})'>Add to cart</button>
                    </div>
                </div>
            </div>`;
    }).join('');
}
