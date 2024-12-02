    let balance = 0;
    let cart = [];
    let library = [];
    
    // Пополнение кошелька
    document.getElementById('add-money').addEventListener('click', () => {
        const amount = prompt("Введите сумму пополнения:");
        if (!isNaN(amount) && amount > 0) {
            balance += parseFloat(amount);
            document.getElementById('balance').textContent = `${balance} kzt`;
        } else {
            alert("Некорректная сумма");
        }
    });
    
    // Добавление игры в корзину
    function addToCart(game) {
        cart.push(game);
        updateCart();
    }
    
    // Обновление отображения корзины
    function updateCart() {
        const cartContent = document.querySelector('.cart-content');
        const totalPrice = cart.reduce((sum, game) => sum + game.price, 0);
    
        if (cart.length === 0) {
            cartContent.innerHTML = "<p>Корзина пуста</p>";
        } else {
            cartContent.innerHTML = `
                <ul>
                    ${cart.map(game => `<li>${game.name} - ${game.price} kzt</li>`).join('')}
                </ul>
                <p>Общая стоимость: ${totalPrice} kzt</p>
            `;
        }
    }
    
    // Покупка игр
    document.getElementById('checkout-button').addEventListener('click', () => {
        const total = cart.reduce((sum, game) => sum + game.price, 0);
    
        if (cart.length === 0) {
            alert("Корзина пуста!");
            return;
        }
    
        if (balance >= total) {
            balance -= total;
            library = [...library, ...cart];
            cart = [];
            updateCart();
            updateLibrary();
            document.getElementById('balance').textContent = `${balance} kzt`;
            alert("Покупка успешна!");
        } else {
            alert("Недостаточно средств!");
        }
    });
    
    // Обновление библиотеки игр
    function updateLibrary() {
        const libraryContent = document.querySelector('.library-content');
        libraryContent.innerHTML = library.length > 0 
            ? library.map(game => `<div>${game.name}</div>`).join('') 
            : "<p>В вашей библиотеке пока нет игр</p>";
    }
    
    // Инициализация каталога игр
    const games = [
        { name: "Cyberpunk 2077", price: 1999, image: "images/кмберпанк.jpg" },
        { name: "The Witcher 3", price: 999, image: "images/ведьмак.jpg" },
        { name: "Minecraft", price: 499, image: "images/майнкрафт.jpg" },
        { name: "The Last Of Us", price: 1500, image: "images/зе ласт оф ас.jpg" },
        { name: "Terraria", price: 1500, image: "images/террария.jpg" },
        { name: "Roblox", price: 230, image: "images/роблокс.jpg" },
        { name: "Rock Simulator", price: 100, image: "images/роксим.jpg" },
        { name: "CS GO", price: 0, image: "images/ксго.jpg" },
        { name: "CS 2", price: 0, image: "images/кс2.jpg" },
        { name: "Half life", price: 4000, image: "images/халфлайф.jpg" },
        { name: "The Forest", price: 2000, image: "images/зефорест.jpg" },
        { name: "Friday 13", price: 379, image: "images/пятница13.jpg" },
    ];
    
    const gamesContainer = document.querySelector('.games');
    games.forEach((game) => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <img src="${game.image}" alt="${game.name}" class="game-image">
            <h2>${game.name}</h2>
            <p>${game.price} kzt</p>
            <button onclick='addToCart(${JSON.stringify(game)})'>Добавить в корзину</button>
        `;
        gamesContainer.appendChild(gameCard);
    });    