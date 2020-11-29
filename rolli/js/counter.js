window.addEventListener('click', function(event){
    if (event.target.hasAttribute('data-action')){
        // От кнопки по которой кликнули находим обёртку текущего счётчика
        const counterWrapper = event.target.closest('.counter-wrapper');
        // От обёртки счётчика находим див со значением счётчика
        const counter = counterWrapper.querySelector('[data-counter]');

        if(event.target.dataset.action ==="plus"){
            console.log('Plus!!!');
            // Изменяем текст в счётчике увеличивая его на единицу
            counter.innerText = ++counter.innerText;
            if(event.target.closest('.cart-wrapper')){
                // Пересчёт суммы заказа, скрытие/показ блоков в корзине
                toggleCartStatus();
               
            }
        } else if(event.target.dataset.action ==="minus"){
            console.log('Minus!!!');
            

            // Проверка, где находится товар - в каталоге или в корзине

            // Если товар в корзине - тогда уменьшаем до 1 и после удаляем
            if(event.target.closest('.cart-wrapper')){
                   
                if(parseInt(counter.innerText) > 1){
                    // Если кол-во больше 1 - тогда уменьшаем на 1
                    counter.innerText = --counter.innerText;
                    
                } 
                // Иначе, если кол-во равно 1, тогда удаляем товар из корзины
                else{
                    event.target.closest('.cart-item').remove();
                
                }
                // Пересчёт суммы заказа, скрытие/показ блоков в корзине
                toggleCartStatus();
            
                
            } else {
                // Если товар в каталоге, то уменьшаем до 1

                    // Уменьшаем счётчик только до единицы
                if(parseInt(counter.innerText) > 1){
                    // Изменяем текст в счётчике уменьшая его на единицу
                    counter.innerText = --counter.innerText;
                }
            }
        }
    }
});


/*

// Находим кнопку Плюс и Минус
const btnPlus = document.querySelector('[data-action="plus"]');
const btnMinus = document.querySelector('[data-action="minus"]');

// Слушаем клик по кнопке Плюс
btnPlus.addEventListener('click', function(event){
    // От кнопки Плюс находим обёртку текущего счётчика
    const counterWrapper = event.target.closest('.counter-wrapper');
    // От обёртки счётчика находим див со значением счётчика
    const counter = counterWrapper.querySelector('[data-counter]');
    // Изменяем текст в счётчике увеличивая его на единицу
    counter.innerText = ++counter.innerText;
});

// Слушаем клик по кнопке Минус
btnMinus.addEventListener('click', function(event){
    // От кнопки Минус находим обёртку текущего счётчика
    const counterWrapper = event.target.closest('.counter-wrapper');
    // От обёртки счётчика находим див со значением счётчика
    const counter = counterWrapper.querySelector('[data-counter]');
    // Уменьшаем счётчик только до единицы
    if(parseInt(counter.innerText) > 1){
        // Изменяем текст в счётчике уменьшая его на единицу
        counter.innerText = --counter.innerText;
    };

    
});

*/