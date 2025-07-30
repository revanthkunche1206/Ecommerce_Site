fetch("https://dummyjson.com/products")
  .then((res) => res.json())
  .then((json) => {
    const productslist = json.products;
    displayProducts(productslist);

    const terminalOutput = document.querySelector('.terminal-output');
    const terminalInput = document.querySelector('input[type="text"]');
    let cart = [];

    function handleInput() {
      const input = terminalInput.value.trim().toLowerCase(); 
      const [command, ...args] = input.split(' ');

      if (command === 'help') {
        viewCommand();
      } else if (command === 'list') {
        listProducts();
      } else if (command === 'details') {
        viewDetails(args[0]);
      } else if (command === 'add') {
        addToCart(args[0]);
      } else if (command === 'remove') {
        removeFromCart(args[0]);
      } else if (command === 'cart') {
        viewCart();
      } else if (command === 'buy') {
        buyItems();
      } else if (command === 'clear') {
        clearScreen();
      } else if (command === 'search') {
        searchProduct(args.join(' '));
      } else if (command === 'sort') {
        sortProducts(args[0]);
      } else {
        terminalOutput.textContent += `Invalid command: ${command}\n`;
      }

      terminalInput.value = ''; 
    }

    function viewCommand() {
      terminalOutput.innerHTML += 
        "Available Commands:\n" +
        "1) help,\n2) list,\n3) details 'product_id',\n4) add 'product_id',\n" +
        "5) remove 'product_id',\n6) cart,\n7) buy,\n8) clear,\n" +
        "9) search 'product_name',\n10) sort 'price/name'\n";
    }

    function listProducts() {
      for (let product of productslist) {
        terminalOutput.innerHTML += `ID: ${product.id}, Name: ${product.title}, Price: $${product.price}\n`;
      }
    }

    function viewDetails(productId) {
      const product = productslist.find(p => p.id == productId);
      if (product) {
        terminalOutput.innerHTML += 
          `ID: ${product.id},\n` +
          `Name: ${product.title},\n` +
          `Price: $${product.price},\n` +
          `Description: ${product.description},\n` +
          `Rating: ${product.rating},\n` +
          `Category: ${product.category},\n` +
          `Brand: ${product.brand},\n` +
          `Stock: ${product.stock},\n` +
          `Warranty: ${product.warrantyInformation},\n` +
          `Shipping: ${product.shippingInformation},\n` +
          `Return Policy: ${product.returnPolicy},\n` +
          `Minimum Order: ${product.minimumOrderQuantity}\n`;

        if (product.reviews && product.reviews.length > 0) {
          terminalOutput.innerHTML += `\nReviews:\n`;
          product.reviews.forEach(r => {
            terminalOutput.innerHTML += `- ${r.reviewerName} (${r.rating}/5): ${r.comment}\n`;
          });
        }
      } else {
        terminalOutput.innerHTML += `Product with ID ${productId} not found.\n`;
      }
    }

    function addToCart(productId) {
      const product = productslist.find(p => p.id == productId);
      if (product) {
        cart.push(product);
        terminalOutput.innerHTML += `Added product with ID ${product.id} to the cart.\n`;
        updateCartPrice();
      } else {
        terminalOutput.innerHTML += `Product with ID ${productId} not found.\n`;
      }
    }

    function removeFromCart(productId) {
      cart = cart.filter(product => product.id != productId);
      terminalOutput.innerHTML += `Removed product with ID ${productId} from the cart.\n`;
      updateCartPrice();
    }

    function viewCart() {
      if (cart.length === 0) {
        terminalOutput.innerHTML += "Your cart is empty.\n";
      } else {
        terminalOutput.innerHTML += "Items in your cart:\n";
        cart.forEach(product => {
          terminalOutput.innerHTML += `ID: ${product.id}, Name: ${product.title}, Price: $${product.price}\n`;
        });
      }
    }

    function buyItems() {
      if (cart.length === 0) {
        terminalOutput.innerHTML += "Your cart is empty. Add items to cart before proceeding to buy.\n";
      } else {
        sessionStorage.setItem('cart', JSON.stringify(cart));
        window.open('buy.html', '_blank');
      }
    }

    function clearScreen() {
      terminalOutput.innerHTML = '';
    }

    function searchProduct(productName) {
      const product = productslist.find(p => 
        p.title.toLowerCase().includes(productName.toLowerCase())
      );
      if (product) {
        terminalOutput.innerHTML += 
          `Found: ID: ${product.id}, Name: ${product.title}, Price: $${product.price}\n`;
      } else {
        terminalOutput.innerHTML += `Product named '${productName}' not found.\n`;
      }
    }

    function sortProducts(criteria) {
      if (criteria === 'price') {
        productslist.sort((a, b) => a.price - b.price);
      } else if (criteria === 'name') {
        productslist.sort((a, b) => a.title.localeCompare(b.title));
      }

      const productsContainer = document.getElementById("products");
      productsContainer.innerHTML = '';
      displayProducts(productslist);

      terminalOutput.innerHTML += `\nProducts sorted by ${criteria}:\n`;
      productslist.forEach(product => {
        terminalOutput.innerHTML += `ID: ${product.id}, Name: ${product.title}, Price: $${product.price}\n`;
      });
    }

    function updateCartPrice() {
      const totalPrice = cart.reduce((sum, p) => sum + p.price, 0);
      const cartPriceElement = document.getElementById('cart-price');
      if (cartPriceElement) {
        cartPriceElement.innerHTML = `$${totalPrice.toFixed(2)}`;
      }
    }

    terminalInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        handleInput();
      }
    });
  });

function displayProducts(products) {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = '';

  for (let product of products) {
    const productElement = document.createElement("div");
    productElement.className = "product";

    const image = document.createElement("img");
    image.src = product.images?.[0] || product.thumbnail || "";
    image.alt = product.title;
    productElement.appendChild(image);

    const titleInfo = document.createElement("div");
    titleInfo.className = "info";

    const productName = document.createElement("p");
    productName.className = "name";
    productName.innerHTML = product.title;
    titleInfo.appendChild(productName);

    productElement.appendChild(titleInfo);

    const actualPriceValue = product.price + 100;

    const heart = document.createElement("i");
    heart.className = "far fa-heart";
    heart.style.float = "left";
    productElement.appendChild(heart);

    const actualPrice = document.createElement("p");
    actualPrice.className = "actualprice";
    actualPrice.innerText = `$${actualPriceValue}`;
    actualPrice.style.color = "red";
    actualPrice.style.textDecoration = "line-through";
    productElement.appendChild(actualPrice);

    const price = document.createElement("p");
    price.className = "price";
    price.innerText = `$${product.price}`;
    productElement.appendChild(price);

    const cartIcon = document.createElement("i");
    cartIcon.className = "fas fa-shopping-cart";
    cartIcon.style.float = "right";
    productElement.appendChild(cartIcon);

    productsContainer.appendChild(productElement);
  }
}
