const listDocs = document.querySelector('.list-content');

const renderData = (data) => {
    data.forEach(el => {
        listDocs.insertAdjacentHTML('beforeend',`
        <div class=" flex flex-nowrap justify-between items-center gap-1 h-fit font-sm cursor-pointer text-left text-sm w-full hover:bg-sky-100">
            <p class="min-h-fit break-words w-2/5 text-justify px-4 line-clamp-3">${el.text}</p>
            <span class="break-words p-4 w-1/5">${el.data}</span>
            <span class="break-words w-1/5 flex flex-row flex-nowrap items-center gap-2 p-4">${el.size} ${el.includeImg ? '<i class="text-sky-700 fa-regular fa-file-image"></i>' : ''}</span>
            <span class="break-words p-4 w-1/5">${el.author}</span>
        </div>
        <hr>
        `);
    });
}

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
        })
        .catch((error) => {
            console.error(error.message);
        });
};

getData('../database/dbase.json')


