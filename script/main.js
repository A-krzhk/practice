const listDocs = document.querySelector('.table-content tbody');

const renderData = (data) => {
    data.forEach((el, i) => {
        listDocs.insertAdjacentHTML('beforeend',`
            <tr class="cursor-pointer hover:bg-gray-300 " data-id=${el.id}>
                <td class="p-1">${el.name}</td>
                <td class="p-1">${el.data}</td>
                <td class="p-1">${el.size} ${el.includeImg ? '<i class="fa-regular fa-file-image text-gray-600"></i>' : ''}</td>
                <td class="p-1">${el.author}</td>
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