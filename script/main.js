const listDocs = document.querySelector('.list-content');

// Вспомогательная функция поставить один хтмл элемент рядом с другим
const insertAfter = (elem, refElem) => refElem.parentNode.insertBefore(elem, refElem.nextSibling)

// Вспомогательная функция по преобразованию даты в милисекунды из чч.мм.гг формата в приемлимый Date() формат гг.мм.чч
const dataFormat = (date) =>  Date.parse(new Date(date.split('.').reverse().join('.')))

// Вспомогательная функция для добавления класса активности 
const activeClass = (cssClass, arrElem, activeEl) => {
    arrElem.forEach(item => {
        item.classList.remove(cssClass)
    })
    activeEl.classList.add(cssClass)
}

// Функция сортировки пузырьком
const dataSort = (wrapperSelector, type) => {
    
    // Реализация смены цвета текста у активной сортировки
    const arrHeaders = document.querySelectorAll('.header-list')
    arrHeaders.forEach(item => {
        if (item.classList.contains(type)) {
            activeClass('text-sky-700', arrHeaders, item)   
        }
    })

    // Реализация самой сортировки
    const wrapper = document.querySelector(wrapperSelector)
    const list = wrapper.children
    for (let i = 0; i < list.length; i++) {
        for (j = i; j < list.length; j++) {
            if (+list[i].getAttribute(type) < +list[j].getAttribute(type)) {
                const replaceNode = wrapper.replaceChild(list[j], list[i])
                insertAfter(replaceNode, list[i])
            }
        }
    }
}

// Функция для отрисовки данных из бд
const renderData = (data) => {
    data.forEach(el => {
        listDocs.insertAdjacentHTML('beforeend',`
        <div data-id="${el.id}" data-date="${dataFormat(el.data)}" data-lang="${el.language}" data-author="${el.author}">
            <div class="px-4 flex flex-nowrap justify-between items-start gap-1 h-fit font-sm cursor-pointer text-left text-sm w-full hover:bg-sky-100">
                <p class="min-h-fit break-words w-2/6 text-justify px-4 line-clamp-3">${el.text}</p>
                <span class="break-words px-4 w-1/6">${el.data}</span>
                <span class="break-words w-1/6 flex flex-row flex-nowrap items-center gap-2 px-4">${el.size} ${el.includeImg ? '<i class="text-slate-700 fa-regular fa-file-image"></i>' : ''}</span>
                <span class="break-words px-4 w-1/6">${el.author}</span>
                <span class="break-words px-4 w-1/6">${el.language}</span>
            </div>
            <hr class="mt-5">
        </div>
        `);
    });
}

// windowState - функция, которую напишет dev_Grigoriy
const windowState = (e) => {console.log(e.target)}

// Функция получения данных из бд
const getData = (url) => {
    fetch(url)
        .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error('Данные были получены с ошибкой!');
            }
        })
        .then((data) => {
            renderData(data);

            // Сортировка по умолчанию = сортировка по дате
            dataSort('.list-content', 'data-date')

            // Вызов функции windowState, которую добавят из dev_Grigoriy
            for(let i = 0; i < listDocs.children.length; i++){
                listDocs.children[i].addEventListener('click', windowState)
            }
        })
        .catch((error) => {
            console.error(error.message);
        });
};

getData('../database/dbase.json')



