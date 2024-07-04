const product = [
    {
        id: 0,
        image: 'image/gg-1.jpg',
        title: 'Z Flip Foldable Mobile',
        price: 120,
    },
    {
        id: 1,
        image: 'image/hh-2.jpg',
        title: 'Air Pods Pro',
        price: 60,
    },
    {
        id: 2,
        image: 'image/ee-3.jpg',
        title: '250D DSLR Camera',
        price: 230,
    },
    {
        id: 3,
        image: 'image/ee-3.jpg',
        title: '250D DSLR Camera',
        price: 230,
    },
    {
        id: 4,
        image: 'image/ee-3.jpg',
        title: '250D DSLR Camera',
        price: 230,
    },
    {
        id: 5,
        image: 'image/ee-3.jpg',
        title: '250D DSLR Camera',
        price: 230,
    },
    {
        id: 6,
        image: 'image/ee-3.jpg',
        title: '250D DSLR Camera',
        price: 230,
    },
    {
        id: 7,
        image: 'image/ee-3.jpg',
        title: '250D DSLR Camera',
        price: 230,
    },
    {
        id: 8,
        image: 'image/aa-1.jpg',
        title: 'Head Phones',
        price: 100,
    }
];

function sanitizeInput(input) {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

document.getElementById('root').innerHTML = product.map((item, index) => {
    const { id, image, title, price } = item;
    const sanitizedTitle = sanitizeInput(title);
    const sanitizedImage = sanitizeInput(image);
    return `
        <div class='box'>
            <div class='img-box'>
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

const cart = [];

function addtocart(index) {
    const quantity = parseInt(document.getElementById(`quantity${index}`).value);

    if (isNaN(quantity) || quantity <= 0) {
        alert("Please specify a valid quantity for the product!");
        return; 
    }

    const selectedItem = { ...product[index], quantity };

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
}
function searchProducts() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredProducts = product.filter(item => item.title.toLowerCase().includes(searchTerm));
    document.getElementById('root').innerHTML = filteredProducts.map((item, index) => {
        const { id, image, title, price } = item;
        const sanitizedTitle = sanitizeInput(title);
        // Ensure image source is properly sanitized as well
        const sanitizedImage = sanitizeInput(image);
        return `
            <div class='box'>
                <div class='img-box'>
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