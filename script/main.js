const listDocs = document.querySelector('.table-content tbody');

const renderData = (data) => {
    data.forEach(el => {
        listDocs.insertAdjacentHTML('beforeend',`
            <tr class="border-solid border-b-2 border-gray-300 cursor-pointer hover:bg-sky-100 " data-id=${el.id}>
                <td class="py-1 px-4 line-clamp-3">${el.text}</td>
                <td class="py-1 px-4">${el.data}</td>
                <td class="flex flex-row flex-nowrap items-center gap-1 py-1 px-4">${el.size} ${el.includeImg ? '<i class="fa-regular fa-file-image text-gray-600"></i>' : ''}</td>
                <td class="py-1 px-4">${el.author}</td>
            </tr>
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


