// Часть 2. Добавляем товар в корзину и проверяем есть ли он там
// если уже есть, то увеличиваем его количество

// Див внутри корзины, в который мы добавляем товары
const cartWrapper = document.querySelector('.cart-wrapper');

// Отслеживаем клик на странице
window.addEventListener('click', function(event){
    // Проверяем, что клик был совершён по кнопке "Добавить в корзину"
    if(event.target.hasAttribute('data-cart')){
        // Находим карточку с товаром, внутри которой был совершён клик
        const card = event.target.closest('.card');

        

        // Собираем данные с этого товара ВАРИАНТ 1
        // let id = card.dataset.id;
        // let imgSrc = card.querySelector('.product-img').getAttribute('src');
        // let title = card.querySelector('.item-title');
        // let itemsInBox = card.querySelector('[data-items-in-box]');
        // let weight = card.querySelector('.price__weight');
        // let price = card.querySelector('.price__currency');
        // let counter = card.querySelector('[data-counter]');

        // Собираем данные с этого товара (ВАРИАНТ 2) и записываем их в единый объект productInfo
        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.product-img').getAttribute('src'),
            title: card.querySelector('.item-title').innerText,
            itemsInBox: card.querySelector('[data-items-in-box]').innerText,
            weight: card.querySelector('.price__weight').innerText,
            price: card.querySelector('.price__currency').innerText,
            counter: card.querySelector('[data-counter]').innerText
        };
        // console.log(productInfo);

        // Проверяем, а есть ли такой товар уже в корзине
        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`)
        if(itemInCart){
            // console.log('ТОВАР УЖЕ ЕСТЬ В КОРЗИНЕ');
            const counterElement = itemInCart.querySelector('[data-counter]');
            counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
        } else{ 
            // console.log('ТОВАРА НЕТ В КОРЗИНЕ');
            // Собранные данные подставим в шаблон для товаров в корзине
            const cartItemHTML =
                `<div class="cart-item" data-id="${productInfo.id}">
                    <div class="cart-item__top">
                        <div class="cart-item__img">
                            <img src="${productInfo.imgSrc}" alt="">
                        </div>
                        <div class="cart-item__desc">
                            <div class="cart-item__title">${productInfo.title}</div>
                            <div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>

                            <!-- cart-item__details -->
                            <div class="cart-item__details">

                                <div class="items items--small counter-wrapper">
                                    <div class="items__control" data-action="minus">-</div>
                                    <div class="items__current" data-counter="">${productInfo.counter}</div>
                                    <div class="items__control" data-action="plus">+</div>
                                </div>

                                <div class="price">
                                    <div class="price__currency">${productInfo.price}</div>
                                </div>

                            </div>
                            <!-- // cart-item__details -->

                        </div>
                    </div>
                </div>`;
        
        
            // Отобразим товар в корзине
            cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
        }
        // Сбрасываем счётчик кол-ва товара, который только что добавили в корзину
        card.querySelector('[data-counter]').innerText = '1';
        
        toggleCartStatus();
    }

});

// Функция показа/скрытия Корзина пуста, пересчёта суммы заказа
function toggleCartStatus(){
    
    const cartEmpty = document.querySelector('[data-cart-empty]');
    const cartTotal = document.querySelector('.cart-total');
    const orderForm = document.querySelector('#order-form');

    // Показываем или скрываем определённые элементы в корзине
    // Проверяем, есть ли в корзине товары (наличие тегов с классом .cart-item)
    
    // Если в корзине ЕСТЬ ТОВАРЫ
    if(cartWrapper.querySelectorAll('.cart-item').length > 0){
        cartEmpty.classList.add('none');
        cartTotal.classList.remove('none');
        orderForm.classList.remove('none');
    }
    // Если корзина ПУСТА
    else {
        cartEmpty.classList.remove('none');
        cartTotal.classList.add('none');
        orderForm.classList.add('none');
    }

    // Пересчитываем стоимость заказа
    let totalPrice = 0;
    cartWrapper.querySelectorAll('.cart-item').forEach(function(item){
        const counter = item.querySelector('[data-counter]').innerText;
        const priceOneItem = item.querySelector('.price__currency').innerText;
        const price = parseInt(counter) * parseInt(priceOneItem);

       
        totalPrice = totalPrice + price; // totalPrice += price;
    });
    console.log(totalPrice);

    cartTotal.querySelector('.total-price').innerText = totalPrice;   

     // Домашка
     if (cartTotal.querySelector(".total-price").innerText < 1000) {
        cartTotal.querySelector(".total-price").innerText =parseInt(cartTotal.querySelector(".total-price").innerText)  + 300;
        cartTotal.querySelector(".delivery-cost").innerText = "300 руб.";
    } else {
        cartTotal.querySelector(".delivery-cost").innerText = "бесплатно";
    }
   
};

