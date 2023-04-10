const listDocs = document.querySelector('.list-content');
let dataDB = [];

// Вспомогательная функция по преобразованию даты в милисекунды из чч.мм.гг формата в приемлимый Date() формат гг.мм.чч
const dataFormat = (date) =>  Date.parse(new Date(date.split('.').reverse().join('.')))

// Вспомогательная функция для добавления класса активности 
const activeClass = (cssClass, arrElem, activeEl) => {
    arrElem.forEach(item => {
        item.classList.remove(cssClass)
    })
    activeEl.classList.add(cssClass)
}


// Функция для отрисовки данных из бд
const renderData = (data) => {
    data.forEach(el => {
        listDocs.insertAdjacentHTML('beforeend',`
        <div data-id="${el.id}" data-date="${dataFormat(el.data)}" data-lang="${el.language}" data-author="${el.author}">
            <div class="p-4 flex flex-nowrap justify-between items-start gap-1 h-fit font-sm cursor-pointer text-left text-sm w-full hover:bg-sky-100">
                <p class="min-h-fit break-words w-2/6 text-justify px-4 line-clamp-3">${el.text}</p>
                <span class="break-words px-4 w-1/6">${el.data}</span>
                <span class="break-words w-1/6 flex flex-row flex-nowrap items-center gap-2 px-4">${el.size} ${el.includeImg ? '<i class="text-slate-700 fa-regular fa-file-image"></i>' : ''}</span>
                <span class="break-words px-4 w-1/6">${el.author}</span>
                <span class="break-words px-4 w-1/6">${el.language}</span>
            </div>
            <hr class="">
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
            // Сортировка по умолчанию = сортировка по дате
            data.sort((a, b) => dataFormat(b.data) - dataFormat(a.data));
            // Отрисовка списка
            renderData(data);

            // Вызов функции windowState, которую добавят из dev_Grigoriy
            for(let i = 0; i < listDocs.children.length; i++){
                listDocs.children[i].addEventListener('click', windowState)
            }
            return data;
        })
        .then(data => {
            dataDB = [...data]
            console.log(dataDB)
        })
        .catch((error) => {
            console.error(error.message);
        });
};

getData('../database/dbase.json')

